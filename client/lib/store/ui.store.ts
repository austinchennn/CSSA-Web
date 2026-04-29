/**
 * ============================================================
 * FILE: client/lib/store/ui.store.ts
 * ============================================================
 *
 * 【作用】
 * 基于 Zustand 的全局 UI 状态管理。存储与 UI 交互相关的状态，
 * 例如移动端菜单的开关状态。不存储业务数据（业务数据由 GraphQL 管理）。
 *
 * 【依赖关系】
 * Imports from:
 *   - zustand : create
 *
 * Exported to / Used by:
 *   - components/layout/Navbar.tsx    : isMobileMenuOpen, toggleMobileMenu
 *   - components/layout/MobileMenu.tsx : isMobileMenuOpen, closeMobileMenu
 *
 * 【Interface 定义】
 * interface UIState
 *   - isMobileMenuOpen: boolean — 移动端抽屉菜单开关状态
 *   - openMobileMenu: () => void
 *   - closeMobileMenu: () => void
 *   - toggleMobileMenu: () => void
 *
 * 【Store 定义】
 * export const useUIStore = create<UIState>((set) => ({
 *   isMobileMenuOpen: false,
 *   openMobileMenu: () => set({ isMobileMenuOpen: true }),
 *   closeMobileMenu: () => set({ isMobileMenuOpen: false }),
 *   toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
 * }))
 *
 * 【使用方式】
 * const { isMobileMenuOpen, toggleMobileMenu } = useUIStore()
 *   - 仅在 Client Component 中使用（"use client" 指令）
 *   - 页面路由切换时应调用 closeMobileMenu 重置状态
 */

export {}
