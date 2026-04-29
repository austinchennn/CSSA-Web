/**
 * ============================================================
 * FILE: client/lib/constants/seo.ts
 * ============================================================
 *
 * 【作用】
 * 全站 SEO 默认配置常量。在 app/layout.tsx 的 metadata export 中使用，
 * 同时被 components/shared/SEOMeta.tsx 的 generatePageMetadata() 引用。
 *
 * 【依赖关系】
 * Imported by:
 *   - app/layout.tsx               : 根 metadata 配置
 *   - components/shared/SEOMeta.tsx : generatePageMetadata 默认值
 *
 * 【定义的常量】
 * export const SITE_NAME: string
 *   - "UTMCSSA"
 *
 * export const SITE_FULL_NAME: string
 *   - "多伦多大学密西沙加中国学生学者联合会"
 *
 * export const DEFAULT_SEO: SEODefaults
 *   interface SEODefaults
 *     - title: string           — 默认首页标题
 *     - titleTemplate: string   — "%s | UTMCSSA" 子页面拼接模板
 *     - description: string     — 全站默认 meta description（约 150 字符内）
 *     - ogImage: string         — 默认 OG 图片路径（/images/og-default.jpg）
 *     - twitterCard: string     — 'summary_large_image'
 *     - locale: string          — 'zh-CN'
 *     - siteUrl: string         — 生产环境域名（process.env.NEXT_PUBLIC_SITE_URL）
 *
 * export const PAGE_TITLES: Record<string, string>
 *   - HOME: "Home"
 *   - ABOUT: "About Us"
 *   - TEAM: "Our Team"
 *   - EVENTS: "Events"
 *   - SPONSORS: "Sponsors & Partnership"
 *   - CONTACT: "Contact Us"
 *   - JOIN: "Join Us"
 */

export {}
