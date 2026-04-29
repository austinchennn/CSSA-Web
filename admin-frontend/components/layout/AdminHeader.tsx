/**
 * ============================================================
 * FILE: admin-frontend/components/layout/AdminHeader.tsx
 * ============================================================
 *
 * 【作用】
 * 后台顶部状态栏。固定高度 h-16，白色背景，展示当前页面的
 * 动态面包屑导航和右侧管理员用户菜单（登出/设置）。
 *
 * 【依赖关系】
 * Imports from:
 *   - components/layout/Breadcrumbs.tsx          : 动态面包屑组件
 *   - components/layout/UserProfileDropdown.tsx  : 用户菜单下拉
 *
 * Exported to / Used by:
 *   - app/(admin)/layout.tsx
 *
 * 【组件】
 * export default function AdminHeader(): JSX.Element
 *   - 容器：h-16 flex items-center justify-between px-6
 *           bg-card border-b border-border z-10
 *   - 左侧：<Breadcrumbs>（动态面包屑，跟随路由变化）
 *   - 右侧：<UserProfileDropdown>（管理员名称 + 头像 + 下拉）
 */

export {}
