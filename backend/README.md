# Backend — UTMCSSA 后台后端与数据库

数据与内容管理中心，负责 API 接口生成、业务逻辑拦截、高并发处理及异步任务队列，为客户端前端和后台前端提供稳定的数据服务。

---

## 快速开始

### 系统依赖（首次配置，只做一次）

**1. 安装 Docker Desktop**

下载地址：https://www.docker.com/products/docker-desktop/

下载 Windows 版安装包 → 安装 → **重启电脑** → 打开 Docker Desktop 等左下角变绿。

**2. 安装 nvm-windows + Node 20**

打开 PowerShell（管理员），执行：

```powershell
winget install CoreyButler.NVMforWindows
```

安装完后**重新打开终端**，执行：

```powershell
nvm install 20
nvm use 20
node -v   # 应显示 v20.x.x
```

> ⚠️ Strapi 4 只支持 Node 18/20，Node 22+ 会启动报错。每次打开新终端都要执行 `nvm use 20`。

**3. 安装依赖**

```bash
cd backend/strapi && npm install
cd backend/microservice && npm install
```

**4. 配置环境变量**

在 `backend/strapi/` 新建 `.env`：

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=pJPKWqMaIvcWQGGgaMeOIHP3GsfzURBa7dP7Y07U81M=,hTzwehMvYQ+Iiwt2KAE/OKs5xNf0Yndd7dxbnlq/CXU=
API_TOKEN_SALT=weute6ZHMP1OIwk+PIbPPWjDV5jSJF6qjhRoauO5Vu8=
ADMIN_JWT_SECRET=U0VDLUK14J09BUN3Jk95n/r8QRDQIbbilV/thRvcojs=
TRANSFER_TOKEN_SALT=eUIaScwbE25ToIgzaCSGeoxAZ1XR23ImLlqPkhy2fRU=
JWT_SECRET=5ejzOyxR6FP1rAOmkN4PIh6J22SQS7+QyKhDe+vUI80=
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=cssa_web_dev
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_SSL=false
```

在 `backend/microservice/` 新建 `.env`：

```env
PORT=3002
NODE_ENV=development
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=（启动 Strapi 后从 Admin → Settings → API Tokens 获取）
REDIS_HOST=localhost
REDIS_PORT=6379
CLIENT_URL=http://localhost:3000
ADMIN_FRONTEND_URL=http://localhost:3001
```

---

### 日常启动（每次开发，开三个终端）

**终端 1 — 数据库**

```bash
cd backend
docker-compose up -d
docker-compose ps   # 两个容器都显示 healthy 才继续
```

**终端 2 — Strapi CMS**

```bash
nvm use 20
cd backend/strapi
npm run develop
# 等出现 Server started at http://localhost:1337
```

首次启动需在 `http://localhost:1337/admin` 创建管理员账号，然后参考 `tech_repo/后端/Austin后续任务SOP.md` 完成权限配置和种子数据录入。

**终端 3 — NestJS 微服务**

```bash
cd backend/microservice
npm run start:dev
# 等出现：微服务已启动，端口：3002
```

### 端口一览

| 服务 | 地址 |
|------|------|
| Strapi Admin UI | http://localhost:1337/admin |
| Strapi REST API | http://localhost:1337/api |
| Strapi GraphQL | http://localhost:1337/graphql |
| NestJS 微服务 | http://localhost:3002 |
| PostgreSQL | localhost:5432 |
| Redis | localhost:6379 |

### 常见问题

| 问题 | 解决方法 |
|------|----------|
| `node: command not found` 或版本不对 | 执行 `nvm use 20` |
| Strapi 报数据库连接失败 | 先跑 `docker-compose up -d`，等 healthy |
| 5432 端口被占用 | 打开服务管理器（services.msc），停止本地 PostgreSQL 服务 |
| `docker-compose` 找不到命令 | 打开 Docker Desktop 等变绿再试 |
| 微服务报 401 Unauthorized | `STRAPI_API_TOKEN` 填错或未填，重新从 Strapi Admin 获取 |

---

## PRD 产品需求

### 定位

- **核心 CMS**：Strapi（Node.js）—— 提供数据建模与可视化后台，自动生成 RESTful / GraphQL API
- **逻辑微服务**：NestJS / Fastify —— 承载复杂后置业务（防刷、鉴权拦截等）
- **异步任务队列**：BullMQ + Redis —— 处理招新高峰期大批量报名入库、数据导出、邮件通知等耗时任务
- **数据统计引擎**：基于 `Registrations` 表，通过 SQL COUNT/聚合函数为管理层生成数据看板

### 业务数据流

**A. 静态内容管理**
- 基于 `Site_Configs` Single Type
- 前端通过 Next.js ISR + App Router Fetch 定时/触发式重建，保证访问性能

**B. 团队成员渲染**
- 前端请求 `Members` GraphQL API，按 `dept_id` 关联分类渲染
- 成员被删除后，前端 Array 长度变化，组件自动 unmount

**C. 动态活动表单**
- 发布方在 CMS 配置 `Events.form_schema` (JSON)
- 前端通用 Form 组件基于此 Schema 动态渲染输入项
- 提交数据入库 `Registrations` 表，后台支持 COUNT/聚合生成 Dashboard

**D. 往期图文自动排版**
- 请求 `Past_Events`，强制 `sort: "event_date:desc"`
- `photo` 字段数据库层强制必填，前端跳过图片有效性校验

---

## 数据库设计 (PostgreSQL Schema)

所有实体模型需在 Strapi 中构建，并开启 Draft/Publish 机制。

### 5.1 全站配置表 `Site_Configs` — Single Type

| 字段 | 类型 | 约束 | 业务作用 |
|------|------|------|---------|
| key | String | Unique, Required | 配置键值（如 `home_hero_title`） |
| value | JSON / Text | Required | 具体文案或 JSON 结构数据 |
| description | String | Optional | 字段说明，供后台编辑人员查看 |

### 5.2 部门表 `Departments` — Collection Type

| 字段 | 类型 | 约束 | 业务作用 |
|------|------|------|---------|
| id | UUID/Int | Primary Key | 部门唯一标识 |
| name | String | Required, Unique | 部门名称 |
| leader_name | String | Required | 现任负责人姓名 |
| introduction | Text | Optional | 部门职能描述 |

### 5.3 社员表 `Members` — Collection Type

| 字段 | 类型 | 约束 | 业务作用 |
|------|------|------|---------|
| id | UUID/Int | Primary Key | 成员唯一标识 |
| name | String | Required | 姓名 |
| title | String | Required | 职位 Title |
| photo_url | Media | Required (Image) | 成员展示图片 |
| dept_id | Relation | Required | 外键，关联 `Departments` |
| order | Integer | Default: 0 | 排序权重，前端列表倒序排列 |

### 5.4 活动表 `Events` — Collection Type

动态表单渲染的核心数据源：

| 字段 | 类型 | 约束 | 业务作用 |
|------|------|------|---------|
| id | UUID/Int | Primary Key | 活动唯一标识 |
| title | String | Required | 活动标题 |
| start_time | DateTime | Required | 举办时间 |
| capacity | Integer | Optional | 报名人数容量上限 |
| form_schema | JSON | Required | 动态表单渲染结构（定义收集哪些信息） |
| status | Enum | Default: `upcoming` | 状态：`upcoming` / `active` / `closed` |

`form_schema` 示例结构：
```json
[
  { "field": "name", "label": "姓名", "type": "text", "required": true },
  { "field": "wechat", "label": "微信号", "type": "text", "required": true },
  { "field": "major", "label": "所在专业", "type": "text", "required": false },
  { "field": "grade", "label": "年级", "type": "select", "options": ["大一","大二","大三","大四"], "required": true }
]
```

### 5.5 往期活动回顾表 `Past_Events` — Collection Type

| 字段 | 类型 | 约束 | 业务作用 |
|------|------|------|---------|
| id | UUID/Int | Primary Key | 唯一标识 |
| event_name | String | Required | 往期活动名称 |
| introduction | Rich Text | Required | 活动介绍与总结（富文本） |
| photo | Media | Required (Image) | 精选封面，**强制单图** |
| event_date | Date | Required | 举办日期，为 Timeline 倒序渲染提供依据 |

### 5.6 活动报名记录表 `Registrations` — Collection Type

| 字段 | 类型 | 约束 | 业务作用 |
|------|------|------|---------|
| id | UUID/Int | Primary Key | 报名流水号 |
| event_id | Relation | Required | 外键，关联 `Events` |
| user_info | JSON | Required | 动态表单提交的数据（根据 form_schema 的答案） |
| status | Enum | Default: `pending` | 处理状态：`pending` / `confirmed` / `cancelled` |

`user_info` 示例结构（对应 `form_schema` 字段）：
```json
{
  "name": "张三",
  "wechat": "zhangsan123",
  "major": "Computer Science",
  "grade": "大二"
}
```

---

## 技术栈

| 技术 | 版本 | 职责 |
|------|------|------|
| Strapi | 4+ | Headless CMS，数据建模，自动生成 REST/GraphQL API |
| PostgreSQL | 15+ | 核心数据库，存储所有结构化数据 |
| TypeScript | 5+ | 服务端扩展逻辑类型安全 |
| NestJS / Fastify | — | 逻辑微服务：Rate Limit、鉴权拦截等 |
| BullMQ | — | 异步任务队列 |
| Redis | 7+ | BullMQ 消息中间件 |

---

## 项目结构

```
backend/
├── strapi/                         # Strapi CMS 核心
│   ├── src/
│   │   ├── api/
│   │   │   ├── site-config/        # Site_Configs 内容类型
│   │   │   ├── department/         # Departments 内容类型
│   │   │   ├── member/             # Members 内容类型
│   │   │   ├── event/              # Events 内容类型
│   │   │   ├── past-event/         # Past_Events 内容类型
│   │   │   └── registration/       # Registrations 内容类型
│   │   ├── extensions/             # Strapi 自定义扩展
│   │   └── middlewares/
│   ├── config/
│   │   ├── database.ts             # PostgreSQL 连接配置
│   │   ├── server.ts
│   │   └── plugins.ts
│   └── package.json
├── microservice/                   # NestJS 逻辑微服务
│   ├── src/
│   │   ├── registration/
│   │   │   ├── registration.controller.ts
│   │   │   ├── registration.service.ts
│   │   │   └── rate-limit.guard.ts  # 表单防刷守卫
│   │   ├── auth/
│   │   │   └── auth.guard.ts        # 鉴权拦截
│   │   └── queue/
│   │       ├── queue.module.ts      # BullMQ 队列模块
│   │       └── export.processor.ts  # CSV 导出异步处理器
│   └── package.json
└── docker-compose.yml               # PostgreSQL + Redis 本地环境
```

---

## 本地运行

### 前置依赖

- Node.js 18+
- Docker & Docker Compose（用于 PostgreSQL + Redis）

### 启动步骤

```bash
# 1. 启动数据库和 Redis
docker-compose up -d

# 2. 启动 Strapi CMS
cd strapi
npm install
npm run develop
# Strapi 默认运行在 http://localhost:1337
# 首次运行会引导创建管理员账户

# 3. 启动微服务（可选，仅报名提交需要）
cd ../microservice
npm install
npm run start:dev
# 微服务默认运行在 http://localhost:3001
```

### 环境变量（`strapi/.env`）

```env
HOST=0.0.0.0
PORT=1337

APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
JWT_SECRET=your-jwt-secret

DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=cssa_web
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your-password

REDIS_HOST=localhost
REDIS_PORT=6379
```

---

## API 接口概览

Strapi 自动生成以下端点（通过 GraphQL Playground 可查看完整 Schema）：

| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/site-configs` | GET | 获取全站配置 |
| `/api/departments` | GET | 获取部门列表 |
| `/api/members` | GET | 获取成员列表（支持 populate=department） |
| `/api/events` | GET | 获取活动列表 |
| `/api/past-events?sort=event_date:desc` | GET | 获取往期活动（倒序） |
| `/api/registrations` | POST | 提交活动报名（经微服务防刷） |
| `/graphql` | POST | GraphQL 统一端点 |

---

## 开发规范

- Strapi 内容类型字段修改需同步更新 TypeScript Interface（在 `client/lib/types/index.ts` 中）
- `form_schema` 字段变更需通知前端同步更新 `<DynamicForm />` 组件支持的类型
- 所有敏感 API 端点（写操作）必须配置 Strapi Roles & Permissions，或由微服务鉴权拦截
