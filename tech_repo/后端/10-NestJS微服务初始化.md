# Commit 10 — NestJS 微服务初始化 + Docker 本地环境

**对应文件：**
- `backend/docker-compose.yml`（新增）
- `backend/microservice/package.json`（新增）
- `backend/microservice/tsconfig.json`（新增）
- `backend/microservice/nest-cli.json`（新增）
- `backend/microservice/src/main.ts`（实现）
- `backend/microservice/src/app.module.ts`（实现）
- `backend/microservice/src/registration/registration.module.ts`（新增）
- `backend/microservice/src/registration/registration.controller.ts`（实现）
- `backend/microservice/src/registration/registration.service.ts`（实现）
- `backend/microservice/src/registration/dto/create-registration.dto.ts`（实现）
- `backend/microservice/src/common/guards/rate-limit.guard.ts`（实现）

**Commit message：** `feat(microservice): 初始化 NestJS 项目，实现报名接口与速率限制`

---

## 做了什么

与 Task 1（Strapi）情况相同：Austin 的微服务代码全是 `export {}` 占位符，无 `package.json`。本次 commit 完成：

1. **Docker 环境补全**：创建缺失的 `backend/docker-compose.yml`（启动 PostgreSQL + Redis）
2. **项目脚手架**：`package.json` + `tsconfig.json` + `nest-cli.json`
3. **完整业务实现**：报名流程链路全部跑通（Controller → Guard → Service → Strapi）

---

## docker-compose.yml — 为什么现在才加

Austin 的 `01-Docker本地环境.md` 文档说对应文件是 `backend/docker-compose.yml`，但实际文件不存在。发现此问题后顺手补齐，不影响微服务初始化的主线任务。

```bash
# 在 backend/ 目录启动
cd backend
docker-compose up -d

# 验证 STATUS 应为 healthy
docker-compose ps
```

---

## 依赖选型

主要运行时依赖：

| 包 | 版本 | 用途 |
|----|------|------|
| `@nestjs/common` | `^10.0.0` | NestJS 核心 |
| `@nestjs/axios` | `^3.0.0` | HTTP 客户端（调用 Strapi REST API）|
| `ioredis` | `^5.0.0` | Redis 直连（Rate Limit Guard 使用）|
| `class-validator` | `^0.14.0` | DTO 校验 |

---

## Rate Limit 实现原理

```typescript
const key = `rate_limit:registration:${ip}`
const count = await redis.incr(key)      // 原子递增
if (count === 1) redis.expire(key, 60)   // 首次设置 TTL
if (count > 5) throw 429                 // 超限拒绝
```

**为什么用 Redis INCR 而不是内存计数：**
内存计数在重启后归零，且多实例部署时每个进程各算各的。
Redis INCR 是原子操作，跨重启和跨实例共享状态，是生产级限流的标准做法。

**IP 获取策略：**
```typescript
const ip = request.headers['x-forwarded-for']?.split(',')[0] || request.ip
```
生产环境流量经过 Nginx/Vercel 反向代理，`request.ip` 会是代理 IP 而非用户 IP。
`X-Forwarded-For` 的第一个 IP 才是真实客户端 IP。

---

## RegistrationService 架构决策

微服务和 Strapi Controller 都有活动状态校验，是有意的双层防御：

| 层 | 职责 |
|----|------|
| NestJS 微服务 | 速率限制（防刷单）+ 快速预校验（减少打到 Strapi 的无效请求） |
| Strapi Controller | 最终业务校验（活动状态、容量）+ 写入数据库 |

如果只在 Strapi 校验，刷单请求会穿过微服务直打数据库，失去 Rate Limit 的保护意义。

---

## Task 3 手动操作提醒（API 权限配置）

Task 3 无法自动化，需要启动 Strapi 后在 Admin UI 手动完成：

```bash
cd backend
docker-compose up -d           # 启动 PostgreSQL + Redis

cd strapi
nvm use 20                     # Strapi 4.25 需要 Node ≤20
npm run develop                # 启动 Strapi（首次需注册管理员账户）
```

打开 `http://localhost:1337/admin`：

**Settings → Users & Permissions → Roles → Public，勾选：**

| Content Type | Public 勾选 |
|---|---|
| Site-config | find |
| Department | find, findOne |
| Member | find, findOne |
| Event | find, findOne |
| Past-event | find, findOne |
| Sponsor | find, findOne |
| Registration | **create**（只勾 create！） |

---

## 验证成功的标志

```bash
# 启动微服务
cd backend/microservice
npm run start:dev
# 终端应出现：微服务已启动，端口：3002

# 测试速率限制（连发 6 次，第 6 次应返回 429）
for i in $(seq 1 6); do
  curl -s -o /dev/null -w "%{http_code}\n" \
    -X POST http://localhost:3002/api/v1/registrations \
    -H "Content-Type: application/json" \
    -d '{"eventId":"1","userInfo":{"name":"test"}}'
done
# 预期输出：201 201 201 201 201 429
```
