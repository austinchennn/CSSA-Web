/**
 * ============================================================
 * FILE: client/components/shared/SEOMeta.tsx
 * ============================================================
 *
 * 【作用】
 * 动态 SEO Meta 标签辅助组件。在需要动态生成 OpenGraph / Twitter Card
 * 等 meta 标签的场景中使用（主要用于活动详情等动态路由，Phase 1 可能较少用到）。
 * 静态页面的 SEO 直接通过 Next.js Metadata API 在 page.tsx 中 export。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/constants/seo.ts : DEFAULT_SEO 默认配置
 *
 * Exported to / Used by:
 *   - 任何需要动态覆盖 SEO meta 的页面
 *
 * 【Interface 定义】
 * interface SEOProps
 *   - title: string              — 页面标题（会自动拼接站点后缀）
 *   - description?: string       — 页面描述，默认使用 DEFAULT_SEO.description
 *   - image?: string             — OG 图片 URL，默认使用站点默认 OG 图
 *   - url?: string               — 页面 canonical URL
 *   - type?: 'website' | 'article' — OG type，默认 'website'
 *
 * 【函数】
 * export function generatePageMetadata(props: SEOProps): Metadata
 *   - 工具函数（非组件），在各 page.tsx 的 generateMetadata 或 metadata export 中调用
 *   - 返回标准 Next.js Metadata 对象
 *   - title 格式："{props.title} | UTMCSSA"
 *   - openGraph.images 使用 props.image 或 DEFAULT_SEO.ogImage
 *   - 设置 robots: 'index, follow'
 *
 * 【关键变量】
 * - DEFAULT_SEO: SEODefaults — 来自 lib/constants/seo.ts 的全局默认值
 */

export {}
