/**
 * ============================================================
 * FILE: admin-frontend/app/(admin)/layout.tsx
 * ============================================================
 *
 * 【作用】
 * Admin 路由组的 SPA 布局容器。实现"侧边栏 + 顶部 Header + 内容区"
 * 的三区布局，是所有后台管理页面的共享 Shell。
 * 同时负责鉴权守卫：若用户未登录（无 token），重定向至 /login。
 *
 * 【依赖关系】
 * Imports from:
 *   - components/layout/AdminSidebar.tsx    : 左侧导航栏
 *   - components/layout/AdminHeader.tsx     : 顶部状态栏
 *   - lib/store/ui.store.ts                 : isSidebarCollapsed 状态
 *
 * Exported to / Used by:
 *   - 所有 app/(admin)/**  页面自动应用此 layout
 *
 * 【鉴权逻辑】
 * - 在 Server Component 中检查 cookies 中的 admin_token
 * - 若不存在或已过期，调用 redirect('/login')
 * - 若存在，正常渲染 layout
 *
 * 【组件】
 * export default function AdminLayout({ children }): JSX.Element
 *   - 外层：flex h-screen w-full bg-background overflow-hidden
 *   - 左侧：<AdminSidebar>（固定宽度 w-64，支持折叠为 w-16）
 *   - 右侧：flex flex-col，包含：
 *       <AdminHeader>（固定高度 h-16）
 *       <main className="flex-1 p-6 overflow-y-auto">
 *         {children}（各管理页面内容）
 *       </main>
 *   - isSidebarCollapsed=true 时，侧边栏宽度 w-16，主内容区自动扩展
 *
 * 【关键变量】
 * - isSidebarCollapsed: boolean — 来自 Zustand ui.store
 */

export {}
