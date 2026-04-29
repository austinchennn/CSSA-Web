/**
 * ============================================================
 * FILE: client/app/page.tsx
 * ============================================================
 *
 * 【作用】
 * 官网首页（路由 `/`）的页面组件。作为"组装层"，不包含任何 UI 细节，
 * 仅负责从后端拉取首页所需数据，并将数据作为 props 分发给各首页 Section 组件。
 * 使用 Next.js ISR 渲染策略（revalidate: 60），保证性能同时数据准实时。
 *
 * 【依赖关系】
 * Imports from:
 *   - components/sections/home/HeroSection.tsx    : Hero 大图区域
 *   - components/sections/home/AboutPreview.tsx   : 社团简介预览
 *   - components/sections/home/ServicesSection.tsx: 核心服务说明
 *   - components/sections/home/FeaturedEvents.tsx : 精选活动卡片
 *   - components/sections/home/SponsorsStrip.tsx  : 赞助商 Logo 横条
 *   - lib/graphql/queries/home.queries.ts         : fetchHomeData GraphQL query
 *   - lib/graphql/queries/siteConfig.queries.ts   : fetchSiteConfig query
 *   - lib/types/cms.types.ts                      : HomePageData, SiteConfig 类型
 *
 * Exported to / Used by:
 *   - Next.js 框架自动识别为 `/` 路由页面
 *
 * 【导出 Metadata】
 * export const metadata: Metadata
 *   - title: "Home" → 拼接为 "Home | UTMCSSA"
 *   - description: 覆盖根 layout 默认描述
 *
 * 【函数】
 * export default async function HomePage(): Promise<JSX.Element>
 *   - 并行调用 fetchHomeData() 与 fetchSiteConfig() 获取数据
 *   - 将 heroData、aboutData、servicesData、featuredEvents、
 *     sponsorsData 分别传入对应 Section 组件
 *   - 每个 Section 之间使用 <AnimatedSection> 包裹，实现滚动进场动效
 *   - 页面底部包含 CTA 按钮区域，链接到 /join 和 /contact
 *
 * 【ISR 配置】
 * export const revalidate = 60
 *   - 每 60 秒重新验证缓存，Strapi 内容更新后最多 60 秒生效
 *
 * 【关键变量】
 * - homeData: HomePageData — 包含 hero/about/services/events/sponsors 数据
 * - siteConfig: SiteConfig — 全站配置（如 hero 标题从此读取）
 */

export {}
