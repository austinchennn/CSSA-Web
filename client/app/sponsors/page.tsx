/**
 * ============================================================
 * FILE: client/app/sponsors/page.tsx
 * ============================================================
 *
 * 【作用】
 * 赞助合作页面（路由 `/sponsors`）。向潜在赞助商展示合作价值、
 * 校园触达数据、往期合作案例、赞助档位权益，并提供联系渠道。
 * 赞助商 Logo 与合作信息通过 CMS 动态管理，无硬编码。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/graphql/queries/sponsors.queries.ts    : fetchSponsors()
 *   - lib/graphql/queries/siteConfig.queries.ts  : fetchSponsorsPageContent()
 *   - lib/types/cms.types.ts                     : Sponsor, SponsorsPageContent 类型
 *   - components/sections/sponsors/SponsorCard.tsx  : 单个赞助商卡片
 *   - components/sections/sponsors/TierSection.tsx  : 赞助档位权益说明区域
 *   - components/shared/SectionHeader.tsx
 *   - components/shared/AnimatedSection.tsx
 *
 * 【导出 Metadata】
 * export const metadata: Metadata
 *   - title: "Sponsors & Partnership"
 *
 * 【函数】
 * export default async function SponsorsPage(): Promise<JSX.Element>
 *   - 并行调用 fetchSponsors() 和 fetchSponsorsPageContent()
 *   - 渲染区域（从上到下）：
 *       1. Hero Banner：合作价值标题 + 副文案
 *       2. 校园触达数据面板：学生人数、覆盖渠道数、年度活动数等统计指标
 *       3. 现有赞助商 Logo 展示（<SponsorCard> Grid）
 *       4. 赞助档位权益表格（<TierSection>）
 *       5. 联系 CTA：邮件按钮 + WeChat 二维码（如有）
 *   - 按 sponsor.tier 字段（gold/silver/bronze）将赞助商分组展示
 *
 * 【ISR 配置】
 * export const revalidate = 300
 *
 * 【关键变量】
 * - sponsors: Sponsor[]              — 所有赞助商数据
 * - pageContent: SponsorsPageContent — 页面文案、统计数字等配置
 */

export {}
