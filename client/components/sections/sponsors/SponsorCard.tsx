/**
 * ============================================================
 * FILE: client/components/sections/sponsors/SponsorCard.tsx
 * ============================================================
 *
 * 【作用】
 * 单个赞助商展示卡片。展示赞助商 Logo（透明背景图）和名称。
 * 点击跳转到赞助商官网（若有 website_url）。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/types/cms.types.ts : Sponsor 类型
 *   - next/image             : Logo 渲染（alt 必填："{name} logo"）
 *   - next/link              : 可选跳转赞助商官网
 *
 * Exported to / Used by:
 *   - app/sponsors/page.tsx
 *   - components/sections/home/SponsorsStrip.tsx（简化版）
 *
 * 【Props Interface】
 * interface SponsorCardProps
 *   - sponsor: Sponsor — 含 name, logoUrl, websiteUrl, tier, description
 *   - showName?: boolean — 是否在 Logo 下方显示文字名称（默认 false）
 *
 * 【组件】
 * export default function SponsorCard({ sponsor, showName }: SponsorCardProps): JSX.Element
 *   - 容器：p-6 bg-card border border-border rounded-lg
 *          flex items-center justify-center
 *          hover:shadow-md transition-shadow
 *   - Logo 区域：固定高度（h-16 或 h-24），使用 next/image contain 模式
 *   - showName=true 时在图片下方显示 sponsor.name 文字（text-sm text-muted-foreground）
 *   - 若 websiteUrl 存在，整个卡片包裹 <Link href={websiteUrl} target="_blank">
 */

export {}
