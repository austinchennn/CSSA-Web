/**
 * ============================================================
 * FILE: admin-frontend/components/layout/AdminSidebar.tsx
 * ============================================================
 *
 * 【作用】
 * 后台左侧导航栏。深色背景，固定在页面左侧，展示所有后台路由入口。
 * 支持折叠（宽度从 w-64 收缩为 w-16，只显示图标）。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/store/ui.store.ts          : isSidebarCollapsed, toggleSidebar
 *   - lib/constants/routes.ts        : ADMIN_NAV_ITEMS（路由配置 + 图标名）
 *   - next/link
 *   - next/navigation (usePathname)  : 高亮当前激活路由
 *   - lucide-react                   : 各菜单项图标 + 折叠箭头图标
 *
 * Exported to / Used by:
 *   - app/(admin)/layout.tsx
 *
 * 【组件】
 * export default function AdminSidebar(): JSX.Element
 *   - 外层容器：
 *       宽度：isSidebarCollapsed ? 'w-16' : 'w-64'，transition-all duration-300
 *       颜色：bg-[hsl(var(--sidebar-bg))] text-[hsl(var(--sidebar-fg))]
 *       固定高度：h-full flex-shrink-0
 *   - 顶部 Logo 区域：
 *       展开时显示 "UTMCSSA Admin" 文字
 *       折叠时只显示 Logo 图标
 *   - 菜单列表（遍历 ADMIN_NAV_ITEMS）：
 *       每项：<Link href={item.href}>
 *         图标（始终显示）+ 文字标签（展开时显示，折叠时隐藏）
 *       当前路径匹配时：bg-sidebar-hover text-sidebar-active-fg（激活态）
 *       hover：bg-sidebar-hover transition-colors
 *   - 底部：折叠/展开切换按钮（ChevronLeft / ChevronRight 图标）
 *
 * 【关键变量】
 * - ADMIN_NAV_ITEMS: AdminNavItem[] — 含 href, label, iconName 的菜单配置
 * - isSidebarCollapsed: boolean
 * - pathname: string
 */

export {}
