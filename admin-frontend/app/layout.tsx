/**
 * ============================================================
 * FILE: admin-frontend/app/layout.tsx
 * ============================================================
 *
 * 【作用】
 * Admin 应用的根 Layout。注入全局字体、全局 CSS 和全站 Provider，
 * 但不包含 Navbar/Sidebar（这些在 (admin)/layout.tsx 中处理）。
 * 登录页 /login 和 admin 路由组共用此根 layout。
 *
 * 【依赖关系】
 * Imports from:
 *   - app/globals.css                   : 后台专属 CSS 变量
 *   - next/font/google                  : 字体加载
 *
 * Exported to / Used by:
 *   - Next.js 框架自动识别，包裹所有 admin-frontend 页面
 *
 * 【组件】
 * export default function RootLayout({ children }): JSX.Element
 *   - 渲染 <html lang="zh"> 根节点
 *   - <body> 仅包裹 {children}（admin layout 的 Sidebar/Header 在路由组 layout 中）
 *   - 挂载 TanStack Query 的 <QueryClientProvider>（全局请求缓存）
 *   - 挂载 Sonner 的 <Toaster>（全局 Toast 消息提示，position="top-right"）
 *
 * 【关键变量】
 * - queryClient: QueryClient — TanStack Query 客户端实例（"use client" 组件中创建）
 */

export {}
