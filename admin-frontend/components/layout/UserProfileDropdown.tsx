/**
 * ============================================================
 * FILE: admin-frontend/components/layout/UserProfileDropdown.tsx
 * ============================================================
 *
 * 【作用】
 * 顶部导航栏右侧的管理员用户菜单。显示当前登录用户名和头像，
 * 点击展开下拉菜单，提供登出操作。
 *
 * 【依赖关系】
 * Imports from:
 *   - @radix-ui/react-dropdown-menu  : 无障碍下拉菜单
 *   - next/navigation (useRouter)    : 登出后跳转 /login
 *   - lib/api/client.ts              : logout()（清除 cookie + 本地 token）
 *
 * Exported to / Used by:
 *   - components/layout/AdminHeader.tsx
 *
 * 【组件】
 * export default function UserProfileDropdown(): JSX.Element
 *   - 触发器（Trigger）：管理员头像（用户名首字母的 Avatar 圆）+ 姓名文字
 *   - 下拉内容（Content）：
 *       菜单项："设置"（预留入口，Phase 1 可 disabled）
 *       分割线
 *       菜单项："退出登录"（红色文字，点击触发 handleLogout）
 *   - handleLogout(): void
 *       调用 logout() 清除认证状态
 *       router.push('/login')
 *       显示 Toast："已退出登录"
 *
 * 【关键变量】
 * - adminUser: AdminUser — 当前登录用户信息（从 cookie/store 中读取）
 *   interface AdminUser { username: string; email: string; avatarInitials: string }
 */

export {}
