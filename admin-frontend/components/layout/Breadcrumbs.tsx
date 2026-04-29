/**
 * ============================================================
 * FILE: admin-frontend/components/layout/Breadcrumbs.tsx
 * ============================================================
 *
 * 【作用】
 * 动态面包屑导航组件。根据当前路由自动生成多级路径导航，
 * 帮助管理员明确当前所在位置，支持点击跳转上级路径。
 *
 * 【依赖关系】
 * Imports from:
 *   - next/navigation (usePathname)  : 获取当前路径
 *   - next/link                      : 可点击导航项
 *   - lib/constants/routes.ts        : ADMIN_ROUTE_LABELS（路径 → 中文名 映射）
 *
 * Exported to / Used by:
 *   - components/layout/AdminHeader.tsx
 *
 * 【组件】
 * export default function Breadcrumbs(): JSX.Element
 *   - 使用 usePathname() 获取当前路径（如 "/admin/events/123"）
 *   - generateBreadcrumbs(pathname): BreadcrumbItem[] 解析路径为面包屑数组
 *       "/admin" → [{ label: "仪表盘", href: "/admin" }]
 *       "/admin/members" → [{ label: "仪表盘", href: "/admin" }, { label: "成员管理", href: "/admin/members" }]
 *   - 渲染面包屑：用 "/" 分隔符连接，最后一项不可点击（当前页面）
 *   - 动态 ID 路径（如 [id]）显示为 "详情" 或通过 API 获取实际名称
 *
 * 【辅助函数】
 * function generateBreadcrumbs(pathname: string): BreadcrumbItem[]
 *   - 分割 pathname，逐段构建面包屑数组
 *   - 通过 ADMIN_ROUTE_LABELS 将路径段转为中文标签
 *
 * 【Interface 定义】
 * interface BreadcrumbItem
 *   - label: string
 *   - href: string
 *   - isActive: boolean — 最后一项为 true，不渲染 Link
 */

export {}
