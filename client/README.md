# Client Frontend — UTMCSSA 客户端前端

面向公众用户的官网展示层，基于 Next.js App Router + ISR 实现高性能 SEO 友好的静态渲染，内容 100% 由 CMS 驱动，严禁硬编码。

---

## PRD 产品需求

### 页面范围 (Phase 1 MVP)

| 路由 | 页面 | 核心内容 |
|------|------|---------|
| `/` | 首页 (Home) | Hero、社团简介、核心服务、精选活动、赞助商展示、CTA |
| `/about` | 关于我们 (About) | 组织定位、使命、服务对象（新生/学术/活动/资源） |
| `/team` | 管理层/部门 (Team) | 主席团 + 各部门成员卡片，按部门分组渲染 |
| `/events` | 活动展示 (Events) | 精选活动卡片 + 竖向时间线 Timeline，滚动触发更新 |
| `/sponsors` | 赞助合作 (Sponsors) | 价值说明、校园触达数据、案例、档位权益、联系渠道 |
| `/contact` | 联系我们 (Contact) | 官方邮箱、社交媒体矩阵，表单须接真实后端 |
| `/join` | 加入我们 (Join Us) | 招新时间、部门简介、动态报名表单（由 form_schema 驱动） |

**Phase 1 范围外（不做）：** 用户登录/注册、权限系统、支付系统、多语言 i18n。

### 功能需求细节

**首页 (Home)**
- Hero 区域文案由 `Site_Configs` CMS 字段驱动
- 精选活动卡片读取 `Past_Events` API，按 `event_date:desc` 排序

**管理层 (Team)**
- 前端请求 `Members` GraphQL API，利用关联字段按 `dept_id` 分类渲染
- CMS 删除成员后，前端 Array 长度自动变化，组件自动 unmount，无需额外逻辑

**活动展示 (Events)**
- 竖向 Timeline 支持根据鼠标滚动触发内容更新（Intersection Observer 或 Framer Motion scroll）
- `Past_Events.photo` 字段数据库层强制必填，前端 `<EventCard />` 可跳过图片有效性校验

**联系/加入 (Contact / Join Us)**
- 若启用联系表单，严禁纯前端静态处理，必须调用后端真实 API
- 报名表单基于后端下发的 `Events.form_schema` JSON 动态渲染，通用 `<DynamicForm />` 组件处理

### 非功能需求

- 全站 100% 响应式，兼容主流 Desktop + Mobile 分辨率
- 文案、图片、人员、活动信息 100% 配置化/API 化，严禁硬编码
- 图片强制使用 `next/image`，控制产物体积
- 所有图片含完整 `alt` 属性（可访问性）
- 通过 ESLint + Prettier 格式化检查（Husky pre-commit 拦截）

---

## 技术栈

| 技术 | 版本 | 职责 |
|------|------|------|
| Next.js (App Router) | 14+ | 路由、ISR 渲染、SEO |
| TypeScript (strict) | 5+ | 强类型，强制定义 API Interface |
| Tailwind CSS | 3+ | 原子化样式，遵守 Design Token |
| shadcn/ui | latest | Headless UI 组件基建 |
| GraphQL + Fetch | — | 按需拉取 CMS 字段，结合 Next.js 缓存 |
| Zustand | 4+ | 局部复杂交互状态（表单进度、侧边栏等） |
| Framer Motion | 11+ | 页面切换、视差滚动、组件进出场动效 |
| Husky + ESLint | — | pre-commit hook，拦截不合规提交 |
| Vercel | — | CI/CD，生产部署 + 多分支 Preview |

---

## 设计规范 (Design Tokens)

禁止在业务组件中使用 Hex 硬编码色值，一律使用 CSS Variable：

| 颜色角色 | Hex | CSS Variable | 适用场景 |
|---------|-----|--------------|---------|
| 主背景色 | `#FAF8F5` | `--background` | 全局 body 背景（米白） |
| 卡片背景 | `#FFFFFF` | `--card` | 内容容器、弹窗背景 |
| 品牌主色 | `#BA1C21` | `--primary` | CTA 按钮、导航 Active 态 |
| 主色悬浮 | `#9E151A` | `--primary-hover` | Button Hover 反馈 |
| 次要背景 | `#F5EEF8` | `--secondary` | 标签背景、次级区块 |
| 主文本色 | `#2A2424` | `--foreground` | 标题、正文 |
| 次文本色 | `#736B6B` | `--muted-foreground` | 日期、说明性副文本 |

---

## 项目结构

```
client/
├── app/
│   ├── layout.tsx              # 根 Layout（含 Navbar、Footer、SEO Meta）
│   ├── globals.css             # 全局 Design Token CSS 变量
│   ├── page.tsx                # 首页 (/)
│   ├── about/
│   │   └── page.tsx
│   ├── team/
│   │   └── page.tsx
│   ├── events/
│   │   └── page.tsx
│   ├── sponsors/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   └── join/
│       └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── ui/                     # shadcn/ui 二次封装的基础组件
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Section.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── FeaturedEvents.tsx
│   │   └── SponsorsStrip.tsx
│   ├── team/
│   │   ├── MemberCard.tsx
│   │   └── DepartmentGroup.tsx
│   ├── events/
│   │   ├── EventCard.tsx
│   │   └── Timeline.tsx
│   └── shared/
│       └── DynamicForm.tsx     # 通用动态表单组件
├── lib/
│   ├── graphql/
│   │   ├── queries.ts          # 所有 GraphQL Query 定义
│   │   └── client.ts           # GraphQL 请求封装
│   └── types/
│       └── index.ts            # 全局 TypeScript Interface 定义
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── .eslintrc.json
└── package.json
```

---

## 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器（需后端 Strapi 已运行）
npm run dev

# 类型检查
npm run type-check

# lint 检查
npm run lint

# 生产构建
npm run build
```

环境变量（`.env.local`）：

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:1337/graphql
```

---

## 开发规范

- 分支模型：`feature/{模块名}` → PR → Code Review (至少 1 次) → merge main
- 严禁直推 `main` 分支
- 组件分层：公共基础设施 → 通用 UI → 业务页面 → 接口对接层，严格解耦
- 渲染策略：内容页使用 ISR（`revalidate: 60`），动态表单页使用 SSR/CSR
