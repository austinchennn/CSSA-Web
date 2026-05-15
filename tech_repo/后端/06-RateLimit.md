# Commit 06 — Rate Limit 守卫

**对应文件：**
- `backend/microservice/src/common/guards/rate-limit.guard.ts`

**Commit message：** `feat(microservice): 实现 Rate Limit 守卫（ioredis 直连）`

---

## 做了什么

实现 **Rate Limit Guard**：防止同一 IP 刷量提交报名。  
使用 ioredis 直连 Redis，通过 INCR + EXPIRE 实现滑动窗口限流，无需 BullMQ 等队列中间层。

---

## rate-limit.guard.ts 详解

### 什么是 Guard

Guard 是 NestJS 的守卫，在 Controller 方法执行前运行。  
返回 `true` → 放行请求  
返回 `false` 或抛出异常 → 拦截请求

### 限流原理（Redis INCR）

```typescript
async canActivate(context: ExecutionContext): Promise<boolean> {
  const ip = request.headers['x-forwarded-for'] ?? request.ip

  // Redis key 格式：rate_limit:registration:127.0.0.1
  const key = `rate_limit:registration:${ip}`

  // INCR 是原子操作：加 1 并返回新值
  // 原子 = 并发时不会有两个请求同时读到相同的旧值
  const count = await this.redis.incr(key)

  if (count === 1) {
    // 第一次请求：设置 60 秒过期（时间窗口）
    await this.redis.expire(key, 60)
  }

  if (count > 5) {
    throw new HttpException('提交过于频繁，请 60 秒后再试', 429)
  }

  return true
}
```

**为什么用 Redis 而不是内存：**  
如果用 JS 的 `Map` 存计数，当微服务重启后数据就丢失了。  
Redis 是独立的存储，所有实例共享同一个计数，重启后仍然有效。

**为什么从 X-Forwarded-For 获取 IP：**  
生产环境通常在 Nginx 反向代理后面，直接用 `request.ip` 会得到 Nginx 的 IP，  
所有人都会被当成同一个 IP，限流完全失效。  
`X-Forwarded-For` 头由 Nginx 注入，包含真实客户端 IP。

---

## 验证成功的标志

```bash
# 快速连续发 6 次请求（第 6 次应该被 429 拦截）
for i in {1..6}; do
  curl -s -o /dev/null -w "%{http_code}\n" \
    -X POST http://localhost:3002/api/v1/registrations \
    -H "Content-Type: application/json" \
    -d '{"eventId":"1","userInfo":{"name":"test"}}'
done
# 输出应该是：201 201 201 201 201 429
```
