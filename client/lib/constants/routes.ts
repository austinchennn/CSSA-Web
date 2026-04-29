/**
 * ============================================================
 * FILE: client/lib/constants/routes.ts
 * ============================================================
 *
 * 【作用】
 * 全站路由与导航链接的唯一真相来源（Single Source of Truth）。
 * 所有 Navbar、Footer、面包屑等导航相关组件从此文件读取链接配置，
 * 禁止在组件内硬编码路由字符串。
 *
 * 【依赖关系】
 * Imported by:
 *   - components/layout/Navbar.tsx      : NAV_LINKS
 *   - components/layout/Footer.tsx      : NAV_LINKS, SOCIAL_LINKS
 *   - components/layout/MobileMenu.tsx  : NAV_LINKS
 *
 * 【定义的常量】
 * export const ROUTES: Record<string, string>
 *   - HOME: '/'
 *   - ABOUT: '/about'
 *   - TEAM: '/team'
 *   - EVENTS: '/events'
 *   - SPONSORS: '/sponsors'
 *   - CONTACT: '/contact'
 *   - JOIN: '/join'
 *
 * export const NAV_LINKS: NavLink[]
 *   - 顺序定义导航栏链接数组（顺序影响 Navbar 展示顺序）
 *   - 每项：{ label: '首页', href: ROUTES.HOME }
 *   - 完整列表：首页 / 关于我们 / 管理层 / 活动 / 赞助合作 / 联系我们 / 加入我们
 *
 * export const SOCIAL_LINKS: SocialLink[]
 *   - 社交媒体链接配置
 *   - 每项：{ platform: 'Instagram', href: 'https://...', iconName: 'instagram' }
 *   - 包含：Instagram, WeChat (QR code 路径), LinkedIn（按实际运营账号填写）
 *   - 注意：社交媒体 URL 也应尽量从 Site_Configs 读取，此处仅作备用 fallback
 *
 * export const ADMIN_ROUTES: Record<string, string>
 *   - 后台路由映射（前台不直接使用，但统一在此维护）
 *   - DASHBOARD: '/admin'
 *   - MEMBERS: '/admin/members'
 *   - EVENTS: '/admin/events'
 *   - CONFIG: '/admin/config'
 *   - DEPARTMENTS: '/admin/departments'
 *   - PAST_EVENTS: '/admin/past-events'
 *   - SPONSORS: '/admin/sponsors'
 */

export {}
