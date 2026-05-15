# UTMCSSA 官网重构项目技术需求与架构规范 (PRD & Technical Spec)

**项目名称：** UTMCSSA Official Website (Rebuild)

**状态：** 内部技术规范定稿

---

## 一、 项目范围与交付目标 (Scope & Deliverables)

### 1.1 第一阶段核心范围 (Phase 1 MVP)

本期需完成以下核心页面与功能的开发及生产环境部署：

- 首页 (Home)
    
- 关于我们 (About)
    
- 管理层 / 部门介绍 (Team / Executive)
    
- 活动展示 (Events / Gallery)
    
- 赞助合作 (Sponsors / Partnership)
    
- 联系我们 (Contact)
    
- 加入我们 / 招新页面 (Join Us)
    
- 全站响应式适配 (Desktop + Mobile)
    
- 基础开发与交接文档
    

### 1.2 暂不列入第一阶段范围 (Out of Scope for Phase 1)

- 用户登录 / 注册模块
    
- 面向普通成员的权限系统
    
- 活动支付系统
    
- 完整多语言切换系统 (i18n)
    

### 1.3 交付物要求

- **产品交付：** Staging 测试环境链接、Production 生产环境部署。
    
- **代码交付：** 完整 GitHub 仓库代码。
    
- **文档交付：** `README.md`（含本地运行、构建、部署说明）、Sitemap、CMS 维护交接文档。
    

---

## 二、 功能需求 (Functional Requirements)

### 2.1 首页 (Home)

- **核心模块：** Hero区域、社团简介、核心服务说明、代表性活动/精选展示、学术/学生服务亮点、合作/赞助商展示、CTA (Call to Action) 按钮。
    
- **布局与状态：** 结构清晰，信息层级分明，主入口显眼。
    

### 2.2 关于我们 (About)

- **核心内容：** 组织定位、服务对象、核心使命、长期价值观。
    
- **展示维度：** 新生支持、学术支持、活动组织、资源整合等。
    

### 2.3 管理层 / 部门介绍 (Team / Executive)

- **功能要求：** 分组展示主席团及各部门结构。展示成员姓名、职位及统一风格照片。
    
- **数据约束：** 数据由 CMS 动态渲染，严禁前端硬编码（Hardcode）占位文案或人员信息。
    

### 2.4 活动展示 (Events)

- **展示方式（组合支持）：** 精选活动卡片 (Featured Events) + 竖向时间线式展示 (Timeline)。
    
- **数据联动：** 支持根据鼠标滚动触发 Timeline 更新；后台新增往期活动 (Past Events) 数据后，前端自动更新图文。
    

### 2.5 赞助合作 (Sponsors / Partnership)

- **核心内容：** 合作价值说明、校园触达数据、过往案例、赞助档位/权益、联系渠道。
    
- **维护要求：** Logo 与合作信息需支持 CMS 动态替换。
    

### 2.6 联系我们 (Contact)

- **核心内容：** 官方邮箱、社交媒体矩阵入口。
    
- **表单要求：** 若启用联系表单，必须接入后端真实处理逻辑，禁止纯前端静态表单。
    

### 2.7 加入我们 (Join Us)

- **核心内容：** 招新时间/方式、部门简介、报名表下载/跳转链接。
    

---

## 三、 非功能需求 (Non-Functional Requirements)

- **代码质量：** 命名规范，组件拆分合理，复用度高。必须通过 ESLint 与 Prettier 格式化检查。
    
- **可维护性：** 文案、图片、人员与活动信息必须 100% 配置化/API化。
    
- **响应式适配：** 兼容主流 Desktop 与 Mobile 分辨率，无布局错乱或文字溢出。
    
- **性能优化：** 图片资源需经过压缩与优化（如使用 Next.js `next/image`），控制产物体积。
    
- **可访问性：** 遵循基本 Web 语义化 HTML，图片包含完整 `alt` 属性。
    
- **可部署性：** 支持标准 CI/CD 流程自动化构建与稳定部署。
    

---

## 四、 架构与技术栈选型 (Architecture & Tech Stack)

采用 **“前后端分离 + Headless** **CMS****”** 架构。

### 4.1 前端技术栈 (用户交互与展示层)

|   |   |   |
|---|---|---|
|技术选型|模块定位|核心技术职责|
|Next.js (App Router)|前端核心框架|路由引擎、渲染引擎。基于 ISR（增量静态生成）实现页面数据秒级刷新与 SEO 优化。|
|TypeScript (Strict)|开发语言|强类型约束，强制定义 API 数据 Interface。|
|Tailwind CSS|样式引擎|原子化 CSS，利用统一 Design Token 约束全站视觉一致性。|
|shadcn/ui|组件库|提供底层无样式 (Headless) UI 组件，支持高度自定义。|
|GraphQL + Fetch|数据请求层|规避数据冗余，按需拉取 CMS 字段。结合 Next.js fetch 缓存优化性能。|
|Zustand|状态管理|管理局部复杂交互状态（如表单进度、侧边栏状态）。|
|Framer Motion|动画引擎|实现页面切换、视差滚动、组件进出场等核心交互动效。|
|Husky + ESLint|代码基建|配置 pre-commit Hook，拦截不合规代码提交。|
|Vercel|CI/CD|生产环境自动化部署与多分支 Preview 环境托管。|

### 4.2 后端技术栈 (数据与内容管理中心)

|   |   |   |
|---|---|---|
|技术选型|模块定位|核心技术职责|
|Strapi|Headless CMS|提供数据建模与可视化后台；自动生成 RESTful/GraphQL API 接口。|
|PostgreSQL|核心数据库|存储全站结构化数据与表单 JSON Schema。|
|TypeScript|开发语言|保证服务端扩展逻辑的类型安全。|

|NestJS / Fastify|逻辑微服务|承载复杂后置业务（防刷限流、报名写入、CSV 同步导出）。|
|Redis|限流缓存|Rate Limit Guard 通过 ioredis 直连，INCR + EXPIRE 实现滑动窗口限流。|

---

## 五、 数据库设计 (Database Schema)

在 Strapi 中构建以下实体模型，并开启 Draft/Publish 机制。

### 5.1 `Site_Configs` (全站配置表 - Single Type)

|   |   |   |   |
|---|---|---|---|
|字段名称|数据类型|约束条件|业务作用|
|key|String|Unique, Required|配置键值（如 home_hero_title）|
|value|JSON / Text|Required|存储具体文本或 JSON 结构数据|
|description|String|Optional|字段配置说明|

### 5.2 `Departments` (部门表 - Collection Type)

|   |   |   |   |
|---|---|---|---|
|字段名称|数据类型|约束条件|业务作用|
|id|UUID/Int|Primary Key|部门唯一标识|
|name|String|Required, Unique|部门名称|
|leader_name|String|Required|现任负责人姓名|
|introduction|Text|Optional|部门职能描述|

### 5.3 `Members` (社员表 - Collection Type)

|   |   |   |   |
|---|---|---|---|
|字段名称|数据类型|约束条件|业务作用|
|id|UUID/Int|Primary Key|成员唯一标识|
|name|String|Required|姓名|
|title|String|Required|职位 Title|
|photo_url|Media|Required (Image)|成员展示图片|
|dept_id|Relation|Required|关联 Departments 表|
|order|Integer|Default: 0|排序权重（倒序排列显示）|

### 5.4 `Events` (当前/报名活动表 - Collection Type)

|   |   |   |   |
|---|---|---|---|
|字段名称|数据类型|约束条件|业务作用|
|id|UUID/Int|Primary Key|活动唯一标识|
|title|String|Required|活动标题|
|start_time|DateTime|Required|举办时间|
|capacity|Integer|Optional|容量上限|
|form_schema|JSON|Required|动态表单渲染结构|
|status|Enum|Default: upcoming|状态控制 (upcoming, active, closed)|

### 5.5 `Past_Events` (往期活动回顾表 - Collection Type)

|   |   |   |   |
|---|---|---|---|
|字段名称|数据类型|约束条件|业务作用|
|id|UUID/Int|Primary Key|唯一标识|
|event_name|String|Required|往期活动名称|
|introduction|Rich Text|Required|活动介绍/总结|
|photo|Media|Required (Image)|精选活动封面（强制单图）|
|event_date|Date|Required|举办日期（用于 Timeline 倒序渲染）|

### 5.6 `Registrations` (活动报名记录表 - Collection Type)

|   |   |   |   |
|---|---|---|---|
|字段名称|数据类型|约束条件|业务作用|
|id|UUID/Int|Primary Key|流水号|
|event_id|Relation|Required|关联 Events 表|
|user_info|JSON|Required|动态表单提交的数据载体|
|status|Enum|Default: pending|状态 (pending, confirmed, cancelled)|

---

## 六、 核心业务数据流与实现逻辑

- **A. 静态内容管理 (全局配置)：** 基于 Strapi 的 `Site_Configs`。前端基于 Next.js `getStaticProps` / App Router Fetch API 配合 ISR 实现定时/触发式重建，保证访问性能。
    
- **B. 团队成员渲染：** 前端请求 `Members` GraphQL API。利用关联字段按部门分类渲染。删除操作在 CMS 触发后，前端数据列表 Array 长度改变，组件自动解除挂载。
    
- **C. 动态活动表单与统计：** 发布方在 CMS 配置 `Events.form_schema` (JSON)，前端通用 Form 组件基于该 Schema 动态渲染输入项。提交数据入库 `Registrations` 表，支持后台通过 SQL COUNT/聚合函数生成 Dashboard。
    
- **D. 往期图文自动排版：** 请求 `Past_Events` 数据流，强制应用 GraphQL `sort: "event_date:desc"`。依赖 `photo` 必填约束，前端 `<EventCard />` 渲染时跳过图片有效性校验，直接渲染 UI 组件。
    

---

# 客户端前端

## 七、客户端 CSS 样式规范与工程化配置

### 7.1 全局色彩规范 (Design Tokens)

|   |   |   |   |
|---|---|---|---|
|颜色角色|Hex 色值|CSS Variable 名|适用组件|
|主背景色|#FAF8F5|--background|全局 body 级背景（米白）|
|卡片背景|#FFFFFF|--card|内容容器、弹窗背景|
|品牌主色|#BA1C21|--primary|核心 CTA 按钮、导航 Active 态、强调色|
|主色悬浮|#9E151A|--primary-hover|Button Hover 交互反馈|
|次要背景|#F5EEF8|--secondary|标签背景、次级区块隔离背景|
|主文本色|#2A2424|--foreground|标题、核心正文文字|
|次文本色|#736B6B|--muted-foreground|日期、说明性副文本|

### 7.2 全局样式配置 (`app/globals.css`)

CSS

```Plain
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 36 25% 97%;
    --foreground: 0 8% 15%;
    
    --card: 0 0% 100%;
    --card-foreground: 0 8% 15%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 8% 15%;

    --primary: 358 74% 42%;
    --primary-foreground: 0 0% 100%;

    --secondary: 288 33% 95%;
    --secondary-foreground: 358 74% 42%;

    --muted: 36 20% 92%;
    --muted-foreground: 0 4% 44%;

    --accent: 358 74% 94%;
    --accent-foreground: 358 74% 42%;
    
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;

    --border: 36 15% 88%;
    --input: 36 15% 88%;
    --ring: 358 74% 42%;

    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
```

### 7.3 Tailwind 框架配置 (`tailwind.config.ts`)

TypeScript

```Plain
import type { Config } from "tailwindcss"const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "#9E151A", 
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
```

---

## 八、 工程协作工作流 (Workflow Requirements)

### 8.1 版本与分支管理

- 基于 GitHub 进行代码托管。
    
- `main` 分支作为唯一的生产级代码来源。
    
- 特性开发严格采用 `feature/{模块名称}` 或 `feature-姓名-模块` 的分支模型。

- **文档更新机制：** 所有和文档相关的修改必须统一提交到 `docs` 分支（基于 `main`）。

### 8.2 Git Commit 与 Pull Request 规范

- 严禁本地直推 (Direct Push) `main` 或 `dev` 分支。
    
- 必须通过 Pull Request (PR) 合并代码。
    
- 核心业务模块合并前必须触发至少 1 次 Code Review，验证代码规范与构建状态。

- **Commit Message 规范：** 建议参照 Conventional Commits 规范，采用 `<type>: <short summary>` 的格式。
  - `type` 为英文，如：`feat` (新功能), `fix` (修bug), `refactor` (重构), `docs` (文档), `test` (测试), `chore` (杂项), `style` (格式)。
  - `short summary` **必须使用中文**简短描述内容（如：`feat: 完成首页轮播图组件`）。

- **Pull Request 规范：** 必须使用中文，描述区必须清晰写明**背景目的**、**修改内容**和**测试情况**。
    

### 8.3 模块化开发拆分原则

按以下层级解耦开发任务：

1. **公共基础设施：** Navbar, Footer, Layout, SEO/Meta。
    
2. **通用** **UI** **组件：** Button, Card, Section（基于 shadcn/ui 二次封装）。
    
3. **业务页面层：** 分别独立开发 Home, About, Team, Events, Sponsors, Contact。
    
4. **接口对接层：** GraphQL Query 封装与数据模型联调。
    

  

# 后台前端

## 一、 后台前端定位与技术架构 (Architecture & Tech Stack)

本后台应用作为独立的 Web App 部署，通过 API 与后端的 Strapi 及微服务交互。

- **前端框架：** Next.js (App Router) - 采用纯客户端渲染 (CSR) 或服务端渲染 (SSR) 均可，侧重交互体验。
    
- **UI** **组件库：** shadcn/ui + Radix UI (无头组件基建)。
    
- **表单与校验：** React Hook Form + Zod (严苛的前端数据校验)。
    
- **状态与数据拉取：** TanStack Query (React Query) 用于管理后台繁重的接口请求、缓存与数据同步；Zustand 用于全局 UI 状态（如侧边栏收缩状态）。
    

---

## 二、 后台前端全局布局与样式规范 (Global Layout & Styling)

### 2.1 页面基础架构 (Layout Shell)

采用经典的 **侧边栏 (Sidebar) + 顶部导航 (Header) + 内容区 (****Main** **Content)** 的 SPA 布局。

**代码级架构约束 (****`app/(admin)/layout.tsx`****)：**

TypeScript

```Plain
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* 左侧边界栏 (固定宽度，支持折叠) */}
      <aside className="w-64 flex-shrink-0 bg-sidebar-bg text-sidebar-fg flex flex-col transition-all duration-300">
        <div className="h-16 flex items-center px-6 border-b border-sidebar-hover font-bold text-lg">
          UTMCSSA Admin
        </div>
        <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
          {/* 导航菜单项 */}
        </nav>
      </aside>

      {/* 右侧主内容区 */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* 顶部状态栏 */}
        <header className="h-16 flex items-center justify-between px-6 bg-card border-b border-border z-10">
          <Breadcrumbs /> {/* 动态面包屑 */}
          <UserProfileDropdown /> {/* 管理员登出/设置 */}
        </header>
        {/* 核心视图挂载点，支持内部滚动 */}
        <div className="flex-1 p-6 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
```

### 2.2 后台专属 CSS 变量配置 (`admin/globals.css`)

后台需要更冷峻的背景色以突显数据表格，同时必须引入强烈的状态指示色。

CSS

```Plain
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* 基础背景色：浅灰白 */
    --background: 210 40% 98%; 
    --foreground: 222.2 84% 4.9%;

    /* 左侧边界栏专属颜色 (深色沉稳风格) */
    --sidebar-bg: 222.2 84% 4.9%;
    --sidebar-fg: 210 40% 98%;
    --sidebar-hover: 217.2 32.6% 17.5%;
    --sidebar-active: 210 40% 98%;
    --sidebar-active-fg: 222.2 84% 4.9%;

    /* 数据表格与卡片区域 */
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --border: 214.3 31.8% 91.4%;

    /* 主题色 (与前台保持一致，用于主按钮) */
    --primary: 358 74% 42%;
    --primary-foreground: 210 40% 98%;
    
    /* 状态指示色 (后台必备：成功、警告、危险) */
    --success: 142.1 76.2% 36.3%;
    --success-foreground: 355.7 100% 97.3%;
    --warning: 38 92% 50%;
    --warning-foreground: 48 96% 89%;
    --destructive: 0 84.2% 60.2%; /* 删除/警告操作 */
    --destructive-foreground: 210 40% 98%;

    --radius: 0.5rem;
  }
}
```

---

## 三、 核心路由与业务功能模块 (Core Modules)

### 3.1 仪表盘首页 (Dashboard Home)

- **路由**：`/admin`
    
- **功能描述**：登录后的默认落地页，提供社团运营的宏观数据概览。
    
- **UI** **细节**：
    
    - **欢迎卡片**：展示“社团总人数”、“本月新增活动报名数”、“正在进行中的活动数量”。
        
    - **快捷操作区**：提供“快速发布活动”、“审批最新报名”的快捷入口。
        

### 3.2 社团成员管理 (Member Management)

- **路由**：`/admin/members`
    
- **功能描述**：管理前台“管理层/部门”页面的展示人员。
    
- **UI** **细节**：
    
    - **页面顶部**：搜索框（按姓名）、部门筛选 Dropdown、“+ 添加成员”主按钮。
        
    - **数据表格 (Data Table)**：包含列：头像缩略图 (Avatar)、姓名、职位 (Title)、所属部门 (Relation)、排序权重、操作列（编辑/删除）。
        
    - **添加/编辑表单 (侧边滑出 Drawer)**：
        
        - **文字录入**：姓名、职位。
            
        - **照片上传**：提供拖拽上传区域，要求限制格式为 `jpg/png`。上传成功后展示预览图。
            
        - **部门选择**：动态拉取 `Departments` 表数据生成 Select 下拉选项。
            
    - **删除交互**：点击“删除”必须弹出 Modal 进行二次确认（红色 `bg-destructive` 按钮警告）。
        

### 3.3 活动发布管理 (Events Management)

- **路由**：`/admin/events`
    
- **功能描述**：管理所有活动信息，最核心的功能是配置供前台渲染的动态报名表单。
    
- **UI** **细节**：
    
    - **列表页**：展示活动标题、状态指示灯（🟢 Active, 🟡 Upcoming, ⚪ Closed）、时间、报名人数进度条（如：`150 / 200`）。
        
    - **发布活动表单 (Create Event)**：
        
        - **基础设定**：标题、举办时间 (Date Range Picker)、容量上限 (Number Input)。
            
        - **动态 Schema 构造器 (核心亮点)**：提供一个可视化编辑器。运营人员点击“添加输入项”，选择类型（如“单行文本”、“数字”、“下拉选择”），输入字段名（如“微信号”、“所在专业”），勾选“是否必填”。前端将此组装为 JSON 结构存入 `form_schema` 字段，前台将完全按此渲染。
            

### 3.4 报名详情与数据处理 (Registrations Tracker)

- **路由**：`/admin/events/[id]`
    
- **功能描述**：针对单一活动的报名数据收集中心。
    
- **UI** **细节**：
    
    - **顶部统计卡片**：超大字号展示“已报名人数 / 容量上限”。提供一个全局 Toggle Switch，用于一键开启/关闭报名通道（手动修改 Event `status`）。
        
    - **动态数据****表格 (Dynamic DataGrid)**：
        
        - **动态表头**：前端请求当前活动的 `form_schema`，自动解析出表头（如：解析出“姓名”、“电话”、“年级”列）。
            
        - **数据填充**：解析 `Registrations` 表中每一条数据的 `user_info` JSON，对号入座填入表格。
            
        - **状态列**：提供审批操作（Pending -> Confirmed / Cancelled）。
            
    - **数据导出**：页面右上角提供“Export to CSV”按钮，前端利用 `papaparse` 库，一键将当前表格展示的 JSON 数据转换为 Excel/CSV 文件下载至本地。
        

### 3.5 基础内容配置模块 (Content CMS)

- **全站配置 (****`/admin/config`****)**：表单维护前台首页 Hero 标题、关于我们文案、联系邮箱等。
    
- **部门管理 (****`/admin/departments`****)**：维护部门名称、现任部长姓名（为成员管理的下拉菜单提供数据池）。
    
- **往期图库 (****`/admin/past-events`****)**：上传往期活动高清大图及总结。需集成富文本编辑器（如 TipTap），支持加粗、列表、换行等基础排版。
    
- **赞助商管理 (****`/admin/sponsors`****)**：上传赞助商 Logo（校验背景透明图），填写合作文案。
    

---

## 四、 交互与用户体验规范 (UX/UI Rules)

为了打造企业级的后台体验，必须遵守以下规范：

1. **加载与占位 (Loading States)**：
    
    1. 作为 SPA，页面切换和 API 请求必须快。
        
    2. 表格数据加载时，必须使用 **骨架屏 (Skeleton Screen)** 占位。
        
    3. 按钮在提交数据时，必须显示 Spinner 图标，且进入 `disabled` 状态，防止表单重复提交。
        
2. **全局消息提示 (Toast Notifications)**：
    
    1. 接入 `sonner` 或 `react-hot-toast` 库。
        
    2. 所有增删改查操作必须有明确的右上角/底部 Toast 反馈。例如：“✅ 成员信息更新成功”或“❌ 提交失败：请检查网络连接”。
        
3. **表单严苛校验 (Form** **Validation****)**：
    
    1. 所有录入表单基于 Zod schema 定义规则。
        
    2. 触发时机为 `onBlur` (失去焦点) 或 `onSubmit` (提交时)。
        
    3. 校验失败时，输入框边框变红（`border-destructive`），并在下方用红色极小字体提示具体错误（如：“请输入正确的手机号格式”、“此字段不能为空”）。
        
4. **防误触机制**：
    
    1. 任何涉及“删除”、“作废”、“清空”的操作，绝不允许一步完成，必须配有 Dialog 弹窗要求用户点击“确认删除”。