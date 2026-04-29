# Admin Frontend — UTMCSSA 后台前端

面向社团管理员的内容运营后台，独立部署的 SPA Web App，通过 API 与 Strapi CMS 及微服务交互，提供成员管理、活动发布、报名审核、内容配置等功能。

---

## PRD 产品需求

### 定位

- 独立 Web App，与客户端前端分开部署
- 仅供社团管理员使用，不对外公开
- 核心价值：让非技术运营人员可视化管理网站内容，无需修改代码

### 功能模块

#### 3.1 仪表盘首页 `/admin`

登录后默认落地页，宏观数据概览：
- **统计卡片**：社团总人数、本月新增报名数、进行中活动数量
- **快捷操作**：快速发布活动、审批最新报名 入口

#### 3.2 社团成员管理 `/admin/members`

管理前台"管理层/部门"页面的展示人员：
- **顶部工具栏**：按姓名搜索框、部门筛选 Dropdown、"+ 添加成员"主按钮
- **数据表格**：列包含头像缩略图、姓名、职位、所属部门、排序权重、操作（编辑/删除）
- **添加/编辑 Drawer**（侧边滑出）：
  - 文字录入：姓名、职位
  - 照片上传：拖拽上传区域，限制 `jpg/png`，上传后显示预览图
  - 部门选择：动态拉取 `Departments` 表数据生成 Select 下拉
- **删除**：必须弹出 Modal 二次确认，确认按钮使用 `bg-destructive` 红色警告样式

#### 3.3 活动发布管理 `/admin/events`

管理所有活动，核心功能为配置动态报名表单：
- **列表页**：展示标题、状态指示灯（Active/Upcoming/Closed）、时间、报名人数进度条（`150 / 200`）
- **发布活动表单**：
  - 基础设定：标题、举办时间（Date Range Picker）、容量上限（Number Input）
  - **动态 Schema 构造器（核心功能）**：可视化编辑器，运营人员点击"添加输入项"，选择类型（单行文本/数字/下拉选择），填写字段名（如"微信号"、"所在专业"），勾选"是否必填"，前端组装为 JSON 存入 `form_schema`

#### 3.4 报名详情与数据处理 `/admin/events/[id]`

单一活动的报名数据中心：
- **顶部统计卡片**：超大字号展示"已报名 / 容量上限"；全局 Toggle Switch 一键开启/关闭报名通道
- **动态数据表格**：
  - **动态表头**：解析当前活动 `form_schema` 自动生成列（如"姓名"、"电话"、"年级"）
  - **数据填充**：解析 `Registrations.user_info` JSON，逐条填入对应列
  - **状态审批**：Pending → Confirmed / Cancelled 操作列
- **数据导出**：右上角"Export to CSV"按钮，使用 `papaparse` 将 JSON 转换为 CSV 下载

#### 3.5 基础内容配置模块

| 路由 | 功能 |
|------|------|
| `/admin/config` | 全站配置：首页 Hero 标题、关于我们文案、联系邮箱等 |
| `/admin/departments` | 部门管理：维护部门名称、现任部长姓名 |
| `/admin/past-events` | 往期图库：上传活动图片及总结，集成 TipTap 富文本编辑器 |
| `/admin/sponsors` | 赞助商管理：上传 Logo（校验透明背景）、填写合作文案 |

### UX/UI 规范

**加载状态**
- 表格数据加载时使用骨架屏（Skeleton Screen）占位
- 表单提交时按钮显示 Spinner，进入 `disabled` 状态，防止重复提交

**全局消息提示**
- 接入 `sonner` 或 `react-hot-toast`
- 所有增删改查必须有明确 Toast 反馈，例如："成员信息更新成功" / "提交失败：请检查网络连接"

**表单校验**
- 基于 Zod schema 定义校验规则
- 触发时机：`onBlur`（失去焦点）或 `onSubmit`
- 校验失败：输入框变红（`border-destructive`），下方红色小字提示具体错误

**防误触机制**
- 所有删除、作废、清空操作必须配有 Dialog 弹窗确认，不允许一步完成

---

## 技术栈

| 技术 | 职责 |
|------|------|
| Next.js (App Router) | 框架，支持 CSR/SSR 混合渲染，侧重交互体验 |
| TypeScript (strict) | 类型安全 |
| Tailwind CSS | 原子化样式 |
| shadcn/ui + Radix UI | 无头 UI 组件基建 |
| React Hook Form | 表单状态管理 |
| Zod | 严苛的前端数据校验 |
| TanStack Query (React Query) | 后台接口请求、缓存与数据同步 |
| Zustand | 全局 UI 状态（侧边栏收缩等） |
| TipTap | 富文本编辑器（往期图库模块） |
| papaparse | JSON → CSV 数据导出 |
| sonner | Toast 消息通知 |

---

## 布局架构

经典三栏 SPA 布局：**侧边栏 + 顶部 Header + 内容区**

```
┌──────────────────────────────────────────────┐
│  Sidebar (w-64, 深色)  │  Header (h-16)       │
│  ─ Dashboard           │  面包屑 | 用户菜单    │
│  ─ Members             ├──────────────────────│
│  ─ Events              │                      │
│  ─ Config              │   Main Content       │
│  ─ Departments         │   (overflow-y-auto)  │
│  ─ Past Events         │                      │
│  ─ Sponsors            │   {children}         │
└──────────────────────────────────────────────┘
```

**后台专属 CSS 变量**（深色侧边栏 + 状态指示色）：

| 变量 | 用途 |
|------|------|
| `--sidebar-bg` | 侧边栏深色背景 |
| `--sidebar-fg` | 侧边栏文字色 |
| `--sidebar-hover` | 菜单项 Hover 背景 |
| `--success` | 成功状态（绿） |
| `--warning` | 警告状态（黄） |
| `--destructive` | 删除/危险操作（红） |

---

## 项目结构

```
admin-frontend/
├── app/
│   ├── (admin)/
│   │   ├── layout.tsx              # Admin SPA 布局（Sidebar + Header）
│   │   ├── page.tsx                # 仪表盘首页 /admin
│   │   ├── members/
│   │   │   └── page.tsx
│   │   ├── events/
│   │   │   ├── page.tsx            # 活动列表
│   │   │   └── [id]/
│   │   │       └── page.tsx        # 报名详情
│   │   ├── config/
│   │   │   └── page.tsx
│   │   ├── departments/
│   │   │   └── page.tsx
│   │   ├── past-events/
│   │   │   └── page.tsx
│   │   └── sponsors/
│   │       └── page.tsx
│   ├── login/
│   │   └── page.tsx                # 登录页
│   └── globals.css                 # 后台专属 CSS 变量
├── components/
│   ├── layout/
│   │   ├── AdminSidebar.tsx
│   │   ├── AdminHeader.tsx
│   │   └── Breadcrumbs.tsx
│   ├── ui/                         # shadcn/ui 二次封装
│   ├── members/
│   │   ├── MemberTable.tsx
│   │   ├── MemberDrawer.tsx        # 添加/编辑侧边 Drawer
│   │   └── DeleteConfirmDialog.tsx
│   ├── events/
│   │   ├── EventList.tsx
│   │   ├── CreateEventForm.tsx
│   │   ├── SchemaBuilder.tsx       # 动态 Schema 构造器
│   │   └── RegistrationsTable.tsx  # 动态表头数据表格
│   └── shared/
│       ├── SkeletonTable.tsx
│       └── ExportCSVButton.tsx
├── lib/
│   ├── api/
│   │   └── client.ts               # TanStack Query + API 请求封装
│   ├── schemas/                    # Zod 校验 Schema
│   └── store/
│       └── ui.store.ts             # Zustand 全局 UI 状态
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## 本地运行

```bash
npm install
npm run dev
```

环境变量（`.env.local`）：

```env
NEXT_PUBLIC_API_URL=http://localhost:1337
NEXT_PUBLIC_ADMIN_SECRET=your-admin-token
```

---

## 开发规范

- 分支模型：`feature/{模块名}` → PR → Code Review → merge main
- 所有 API 调用必须通过 TanStack Query 管理，不允许裸写 `fetch` 在组件内
- 所有表单必须使用 React Hook Form + Zod，不允许手动管理表单状态
- 删除类操作必须有 Dialog 二次确认，不得绕过
