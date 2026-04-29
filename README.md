# UTMCSSA Official Website

多伦多大学密西沙加校区中国学生学者联合会官网重构项目。采用"前后端分离 + Headless CMS"架构，内容 100% 可视化管理，无需改代码即可更新网站内容。

---

## 项目结构

```
CSSA-Web/
├── README.md                          # 本文件（项目总览）
│
├── PRD/                               # 产品需求文档
│   ├── PRD-SUMMARY.md                 # PRD 总纲（架构、技术栈、数据库总览）
│   ├── UTMCSSA官网完整技术文档（客户端+后台）.md
│   ├── 客户端前端PRD.md
│   ├── 后台前端 (Admin Frontend) PRD.md
│   └── 后台后端以及数据库PRD.md
│
├── client/                            # 客户端前端（面向公众用户）
│   ├── README.md                      # 客户端 PRD + 开发文档
│   ├── app/                           # Next.js App Router 页面
│   ├── components/                    # UI 组件库
│   ├── lib/                           # GraphQL 查询、类型定义
│   ├── tailwind.config.ts
│   ├── next.config.ts
│   └── package.json
│
├── admin-frontend/                    # 后台前端（面向社团管理员）
│   ├── README.md                      # 后台前端 PRD + 开发文档
│   ├── app/
│   │   ├── (admin)/                   # Admin SPA 布局
│   │   │   ├── layout.tsx             # Sidebar + Header 布局
│   │   │   ├── page.tsx               # 仪表盘首页
│   │   │   ├── members/               # 成员管理
│   │   │   ├── events/                # 活动管理 + 报名详情
│   │   │   ├── config/                # 全站配置
│   │   │   ├── departments/           # 部门管理
│   │   │   ├── past-events/           # 往期活动图库
│   │   │   └── sponsors/              # 赞助商管理
│   │   └── login/
│   ├── components/
│   ├── lib/
│   └── package.json
│
└── backend/                           # 后台后端（CMS + 微服务 + 数据库）
    ├── README.md                      # 后端 PRD + API 文档 + 数据库 Schema
    ├── strapi/                        # Strapi Headless CMS
    │   ├── src/
    │   │   └── api/
    │   │       ├── site-config/       # 全站配置 (Single Type)
    │   │       ├── department/        # 部门表
    │   │       ├── member/            # 社员表
    │   │       ├── event/             # 活动表
    │   │       ├── past-event/        # 往期活动表
    │   │       └── registration/      # 报名记录表
    │   └── config/
    ├── microservice/                  # NestJS 微服务（防刷/鉴权/队列）
    │   └── src/
    └── docker-compose.yml             # PostgreSQL + Redis 本地环境
```

---

## 子应用说明

### `client/` — 客户端前端

面向公众用户的官网展示层。

- **框架：** Next.js 14+ App Router，ISR 增量静态生成
- **页面：** Home / About / Team / Events / Sponsors / Contact / Join Us
- **数据：** GraphQL 按需拉取 Strapi CMS 数据，内容 100% 配置化
- **部署：** Vercel（CI/CD 自动化）

详见 [client/README.md](./client/README.md)

### `admin-frontend/` — 后台前端

面向社团管理员的内容运营后台（独立部署，不对外公开）。

- **框架：** Next.js + TanStack Query + React Hook Form + Zod
- **功能：** 仪表盘 / 成员管理 / 活动发布 / 报名审核 / 内容配置
- **亮点：** 动态 Schema 构造器（可视化配置报名表单）、报名数据 CSV 导出

详见 [admin-frontend/README.md](./admin-frontend/README.md)

### `backend/` — 后台后端

数据与内容管理中心。

- **CMS：** Strapi —— 自动生成 REST / GraphQL API
- **数据库：** PostgreSQL（6 张核心数据表）
- **微服务：** NestJS —— Rate Limit 防刷、鉴权拦截
- **队列：** BullMQ + Redis —— 高并发报名入库、数据导出、邮件通知

详见 [backend/README.md](./backend/README.md)

---

## 快速开始

### 前置依赖

- Node.js 18+
- Docker & Docker Compose

### 本地启动顺序

```bash
# 1. 启动数据库和 Redis
cd backend
docker-compose up -d

# 2. 启动 Strapi CMS（http://localhost:1337）
cd backend/strapi
npm install && npm run develop

# 3. 启动客户端前端（http://localhost:3000）
cd client
npm install && npm run dev

# 4. 启动后台前端（http://localhost:3001）
cd admin-frontend
npm install && npm run dev
```

---

## 技术栈总览

| 层级 | 技术 |
|------|------|
| 客户端前端 | Next.js · TypeScript · Tailwind CSS · shadcn/ui · Framer Motion |
| 后台前端 | Next.js · TanStack Query · React Hook Form · Zod · TipTap |
| CMS | Strapi · PostgreSQL · GraphQL |
| 微服务 | NestJS · BullMQ · Redis |
| 部署 | Vercel (前端) · Docker (后端) |

---

## 开发规范

- 分支模型：`feature/{模块名}` → Pull Request → Code Review → `main`
- 严禁直推 `main` 分支
- 代码必须通过 ESLint + Prettier（Husky pre-commit 拦截）
- 文案/图片/人员/活动信息 100% 配置化，严禁硬编码

---

## 文档索引

| 文档 | 路径 |
|------|------|
| PRD 总纲 | [PRD/PRD-SUMMARY.md](./PRD/PRD-SUMMARY.md) |
| 客户端前端 PRD + README | [client/README.md](./client/README.md) |
| 后台前端 PRD + README | [admin-frontend/README.md](./admin-frontend/README.md) |
| 后台后端 PRD + README | [backend/README.md](./backend/README.md) |
| 完整技术规范原文 | [PRD/UTMCSSA官网完整技术文档（客户端+后台）.md](./PRD/UTMCSSA官网完整技术文档（客户端+后台）.md) |
