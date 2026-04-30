# Commit 06 — Rate Limit 守卫 + BullMQ 队列模块

**对应文件：**
- `backend/microservice/src/common/guards/rate-limit.guard.ts`
- `backend/microservice/src/queue/queue.module.ts`
- `backend/microservice/src/queue/email.processor.ts`
- `backend/microservice/src/queue/export.processor.ts`

**Commit message：** `feat(microservice): 实现 Rate Limit 守卫和 BullMQ 队列模块`

---

## 做了什么

实现了两个防护机制：
1. **Rate Limit Guard**：防止同一 IP 刷量提交报名
2. **BullMQ 队列**：把耗时任务（发邮件、导出 CSV）移到后台异步处理

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
如果用 JS 的 `Map` 存计数，当微服务重启后数据就丢失了，  
而且如果未来扩展到多个实例，每个实例的内存是独立的，限流就失效了。  
Redis 是独立的存储，所有实例共享同一个计数。

**为什么从 X-Forwarded-For 获取 IP：**  
生产环境通常在 Nginx 反向代理后面，直接用 `request.ip` 会得到 Nginx 的 IP，  
所有人都会被当成同一个 IP，限流完全失效。  
`X-Forwarded-For` 头由 Nginx 注入，包含真实客户端 IP。

---

## queue.module.ts — BullMQ 队列模块

### 什么是 BullMQ

BullMQ 是一个基于 Redis 的任务队列库：
- 你把任务「加入队列」（add to queue）
- BullMQ 在后台找 Worker 来「处理任务」（process）
- 任务失败可以自动重试

### 为什么需要队列

```
没有队列（同步）：
  用户提交报名 → 等待发邮件（1-3 秒）→ 等待写数据库 → 返回结果
  用户感受：按了提交，转圈 3 秒

有队列（异步）：
  用户提交报名 → 写数据库 → 立刻返回「报名成功」
                           ↓（同时，在后台）
                           BullMQ Worker 处理邮件任务 → 发送邮件
  用户感受：按了提交，立刻看到成功页面
```

### 两个队列

```typescript
BullModule.registerQueue(
  { name: 'email' },    // 发送确认邮件
  { name: 'export' },   // 导出 CSV（人数多时耗时较长）
)
```

---

## email.processor.ts 详解

Processor = 队列任务的处理器：

```typescript
@Processor('email')
export class EmailProcessor {
  @Process('registration_confirmed')
  async handleRegistrationConfirmed(job: Job<EmailJobData>) {
    const { userEmail, eventTitle } = job.data

    // Phase 1：只打日志，邮件服务后续接入
    // Phase 2 替换为：
    // await transporter.sendMail({
    //   to: userEmail,
    //   subject: `${eventTitle} 报名成功`,
    //   html: emailTemplate(job.data),
    // })
    this.logger.log(`邮件待发送 → ${userEmail}`)
  }
}
```

**`@Process('registration_confirmed')` 是什么：**  
只处理 name 为 `'registration_confirmed'` 的任务，  
RegistrationService 里 `emailQueue.add('registration_confirmed', data)` 的第一个参数必须对应。

---

## export.processor.ts 详解

Phase 1 只打日志，功能留给 Mike 在 Phase 2 实现：

```typescript
@Processor('export')
export class ExportProcessor {
  @Process()
  async handleExport(job: Job<ExportJobData>) {
    // Phase 2 实现：
    // 1. 分页拉取所有 Registrations（每页 100 条，可能几百条）
    // 2. 用 papaparse 生成 CSV 字符串
    // 3. 上传到云存储，获取下载 URL
    // 4. 通过 emailQueue 发送「导出完成」通知
    this.logger.log(`导出任务收到，活动 ID：${job.data.eventId}`)
  }
}
```

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
