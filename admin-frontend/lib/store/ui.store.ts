/**
 * ============================================================
 * FILE: admin-frontend/lib/store/ui.store.ts
 * ============================================================
 *
 * 【作用】
 * 后台全局 UI 状态管理（Zustand）。管理侧边栏折叠状态等
 * 全局 UI 交互状态，不存储业务数据（业务数据由 TanStack Query 管理）。
 *
 * 【依赖关系】
 * Imports from:
 *   - zustand : create, persist（持久化插件）
 *
 * Exported to / Used by:
 *   - app/(admin)/layout.tsx           : isSidebarCollapsed
 *   - components/layout/AdminSidebar.tsx : isSidebarCollapsed, toggleSidebar
 *
 * 【Interface 定义】
 * interface AdminUIState
 *   - isSidebarCollapsed: boolean — 侧边栏是否折叠（持久化至 localStorage）
 *   - toggleSidebar: () => void
 *   - collapseSidebar: () => void
 *   - expandSidebar: () => void
 *
 * 【Store 定义】
 * export const useAdminUIStore = create<AdminUIState>()(
 *   persist(
 *     (set) => ({
 *       isSidebarCollapsed: false,
 *       toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
 *       collapseSidebar: () => set({ isSidebarCollapsed: true }),
 *       expandSidebar: () => set({ isSidebarCollapsed: false }),
 *     }),
 *     { name: 'admin-ui-store' }  // localStorage key
 *   )
 * )
 *
 * 【注意】
 * - 使用 zustand/middleware 的 persist 插件，用户的侧边栏折叠偏好在刷新后保留
 * - 此 store 仅在 Client Component 中使用（"use client"）
 */

export {}
