## 一、 定位与技术架构 (Architecture & Tech Stack)

本后台应用作为独立的 Web App 部署，通过 API 与后端的 Strapi 及微服务交互。

- **前端框架：** Next.js (App Router) - 采用纯客户端渲染 (CSR) 或服务端渲染 (SSR) 均可，侧重交互体验。
    
- **UI** **组件库：** shadcn/ui + Radix UI (无头组件基建)。
    
- **表单与校验：** React Hook Form + Zod (严苛的前端数据校验)。
    
- **状态与数据拉取：** TanStack Query (React Query) 用于管理后台繁重的接口请求、缓存与数据同步；Zustand 用于全局 UI 状态（如侧边栏收缩状态）。
    

---

## 二、 全局布局与样式规范 (Global Layout & Styling)

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