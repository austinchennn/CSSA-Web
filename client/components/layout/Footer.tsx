/**
 * ============================================================
 * FILE: client/components/layout/Footer.tsx
 * ============================================================
 *
 * 【作用】
 * 全站底部版权栏。包含 CSSA Logo、快速导航链接分组、
 * 社交媒体图标入口、版权声明文字。纯静态组件，无数据请求。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/constants/routes.ts  : NAV_LINKS, SOCIAL_LINKS 常量
 *   - next/link                : 路由跳转
 *   - next/image               : Logo 渲染
 *
 * Exported to / Used by:
 *   - app/layout.tsx : 挂载于根 Layout 底部
 *
 * 【组件】
 * export default function Footer(): JSX.Element
 *   - 顶部区域（三列 Grid）：
 *       左列：CSSA Logo + 社团一句话介绍
 *       中列：快速导航链接（来自 NAV_LINKS）
 *       右列：社交媒体图标（来自 SOCIAL_LINKS，含平台名和 href）
 *   - 底部分割线 + 版权声明：
 *       "© {currentYear} UTMCSSA. All rights reserved."
 *
 * 【关键变量】
 * - currentYear: number — new Date().getFullYear()，动态年份
 * - NAV_LINKS: NavLink[] — 同 Navbar 复用
 * - SOCIAL_LINKS: SocialLink[] — 含 { platform, href, icon } 的社交媒体配置
 */

export {}
