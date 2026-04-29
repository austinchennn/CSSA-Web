/**
 * ============================================================
 * FILE: client/components/layout/MobileMenu.tsx
 * ============================================================
 *
 * 【作用】
 * 移动端全屏导航抽屉菜单。当 Hamburger 被点击后从顶部或侧边滑入，
 * 覆盖全屏展示导航链接列表，使用 Framer Motion 实现进出场动效。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/constants/routes.ts  : NAV_LINKS
 *   - lib/store/ui.store.ts    : useUIStore — isMobileMenuOpen, closeMobileMenu
 *   - framer-motion            : motion.div, AnimatePresence
 *   - next/link                : 路由跳转（点击后自动关闭菜单）
 *   - next/navigation          : usePathname — 高亮当前路由
 *
 * Exported to / Used by:
 *   - components/layout/Navbar.tsx : 在 Navbar 内条件渲染
 *
 * 【组件】
 * export default function MobileMenu(): JSX.Element
 *   - 用 AnimatePresence 包裹，isMobileMenuOpen 为 true 时挂载
 *   - 动效：从 y: -20, opacity: 0 → y: 0, opacity: 1，duration: 0.25s
 *   - 全屏半透明遮罩（z-40），点击遮罩调用 closeMobileMenu()
 *   - 内容面板（z-50）：垂直排列 NAV_LINKS，每个链接点击后调用 closeMobileMenu()
 *   - 底部展示社交媒体图标
 *
 * 【关键变量】
 * - isMobileMenuOpen: boolean   — 来自 Zustand
 * - closeMobileMenu: () => void — 来自 Zustand
 * - pathname: string            — 当前路由，用于高亮
 */

export {}
