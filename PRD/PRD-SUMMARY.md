# UTMCSSA 官网重构项目 — PRD 总纲

**项目名称：** UTMCSSA Official Website (Rebuild)  
**状态：** 内部技术规范定稿  
**日期：** 2026-04

---

## 一、项目概述

UTMCSSA（多伦多大学密西沙加校区中国学生学者联合会）官网重构项目，采用"前后端分离 + Headless CMS"架构，目标是构建一套高性能、内容 100% 可视化管理、无需改代码即可更新的现代化官网体系。

项目分为三个独立子应用：

| 子应用 | 目录 | 定位 |
|--------|------|------|
| 客户端前端 | `client/` | 面向公众用户的官网展示层 |
| 后台前端 | `admin-frontend/` | 面向管理员的内容运营后台 |
| 后台后端 | `backend/` | 数据 API、CMS、微服务、任务队列 |

---

## 二、第一阶段交付范围 (Phase 1 MVP)

### 纳入范围

| 页面/功能 | 说明 |
|-----------|------|
| 首页 (Home) | Hero、社团简介、服务说明、精选活动、赞助商、CTA |
| 关于我们 (About) | 组织定位、使命、价值观、服务对象 |
| 管理层/部门 (Team) | 按部门分组展示成员，CMS 动态渲染 |
| 活动展示 (Events) | 精选卡片 + 竖向 Timeline，滚动触发更新 |
| 赞助合作 (Sponsors) | 合作价值、案例、档位、CMS 动态 Logo |
| 联系我们 (Contact) | 邮箱、社交媒体，表单接真实后端 |
| 加入我们 (Join Us) | 招新信息、动态报名表单（form_schema 驱动） |
| 全站响应式 | Desktop + Mobile 完整适配 |
| 后台管理系统 | 成员/活动/报名/内容配置完整管理 |

### 不纳入范围

- 用户登录/注册模块
- 面向普通成员的权限系统
- 活动支付系统
- 完整多语言切换（i18n）

---

## 三、整体架构

```
┌─────────────────────────────────────────────────────────────┐
│                     用户 / 管理员                            │
└──────────────┬──────────────────────────┬───────────────────┘
               │                          │
    ┌──────────▼──────────┐   ┌───────────▼────────────┐
    │   客户端前端         │   │   后台前端              │
    │   client/           │   │   admin-frontend/       │
    │   Next.js + ISR     │   │   Next.js + TanStack    │
    │   面向公众用户       │   │   面向社团管理员         │
    └──────────┬──────────┘   └───────────┬────────────┘
               │                          │
               │         GraphQL / REST   │
               └──────────────┬───────────┘
                              │
              ┌───────────────▼────────────────┐
              │         后台后端 backend/        │
              │                                 │
              │  ┌─────────┐  ┌──────────────┐ │
              │  │ Strapi  │  │ NestJS 微服务 │ │
              │  │ CMS     │  │ 防刷/鉴权     │ │
              │  └────┬────┘  └──────┬───────┘ │
              │       │              │          │
              │  ┌────▼─────────────▼────────┐ │
              │  │      PostgreSQL            │ │
              │  └───────────────────────────┘ │
              │  ┌────────────────────────────┐ │
              │  │   Redis（Rate Limit 限流）  │ │
              │  └────────────────────────────┘ │
              └─────────────────────────────────┘
```

---

## 四、数据库模型总览

| 表名 | 类型 | 核心用途 |
|------|------|---------|
| `Site_Configs` | Single Type | 全站可配置文案（Hero 标题、联系邮箱等） |
| `Departments` | Collection | 部门信息，成员管理的数据池 |
| `Members` | Collection | 管理层成员，关联部门，前台 Team 页渲染 |
| `Events` | Collection | 当前/报名活动，含动态 form_schema |
| `Past_Events` | Collection | 往期活动回顾，Timeline 倒序渲染 |
| `Registrations` | Collection | 活动报名记录，user_info 存动态表单答案 |

---

## 五、技术栈总览

### 客户端前端 (`client/`)

| 技术 | 职责 |
|------|------|
| Next.js 14+ (App Router) | ISR 渲染、SEO、路由 |
| TypeScript (strict) | 强类型，强制定义 API Interface |
| Tailwind CSS | 原子化样式，遵守 Design Token |
| shadcn/ui | Headless UI 组件 |
| GraphQL + Fetch | 按需拉取 CMS 数据 |
| Zustand | 局部交互状态 |
| Framer Motion | 动效（视差、Timeline 滚动） |
| Vercel | CI/CD 部署 |

### 后台前端 (`admin-frontend/`)

| 技术 | 职责 |
|------|------|
| Next.js (App Router) | 框架 |
| shadcn/ui + Radix UI | UI 组件 |
| React Hook Form + Zod | 表单管理与严苛校验 |
| TanStack Query | 接口请求、缓存、数据同步 |
| Zustand | 全局 UI 状态 |
| TipTap | 富文本编辑器 |
| papaparse | JSON → CSV 数据导出 |
| sonner | Toast 通知 |

### 后台后端 (`backend/`)

| 技术 | 职责 |
|------|------|
| Strapi | Headless CMS，自动生成 REST/GraphQL API |
| PostgreSQL | 核心数据库 |
| TypeScript | 服务端类型安全 |
| NestJS / Fastify | 微服务：Rate Limit、报名写入、CSV 导出 |
| Redis | 限流缓存（ioredis 直连） |

---

## 六、设计规范 (Design Tokens)

| 颜色角色 | Hex | CSS Variable |
|---------|-----|--------------|
| 主背景色 | `#FAF8F5` | `--background` |
| 卡片背景 | `#FFFFFF` | `--card` |
| 品牌主色 | `#BA1C21` | `--primary` |
| 主色悬浮 | `#9E151A` | `--primary-hover` |
| 次要背景 | `#F5EEF8` | `--secondary` |
| 主文本色 | `#2A2424` | `--foreground` |
| 次文本色 | `#736B6B` | `--muted-foreground` |

---

## 七、工程协作规范

- **分支模型**：`feature/{模块名}` → Pull Request → Code Review（至少 1 次）→ merge `main`
- **严禁直推** `main` 分支
- **代码质量**：必须通过 ESLint + Prettier，Husky pre-commit Hook 自动拦截
- **硬编码禁令**：文案、图片、人员、活动信息 100% 配置化/API 化

---

## 八、交付物清单

| 交付物 | 说明 |
|--------|------|
| Staging 测试环境链接 | 部署后提供 |
| Production 生产环境 | Vercel 部署 |
| GitHub 仓库完整代码 | 含所有三个子应用 |
| `README.md` | 含本地运行、构建、部署说明 |
| Sitemap | 全站路由结构图 |
| CMS 维护交接文档 | Strapi 内容管理操作指南 |

---

## 九、各子模块 PRD 文档索引

| 模块 | 文档位置 |
|------|---------|
| 客户端前端 PRD | `client/README.md` |
| 后台前端 PRD | `admin-frontend/README.md` |
| 后台后端与数据库 PRD | `backend/README.md` |
| 完整技术规范原文 | `PRD/UTMCSSA官网完整技术文档（客户端+后台）.md` |
