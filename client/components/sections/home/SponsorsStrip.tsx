/**
 * ============================================================
 * FILE: client/components/sections/home/SponsorsStrip.tsx
 * ============================================================
 *
 * 【作用】
 * 首页底部的赞助商 Logo 横条区域（Ticker 风格）。
 * 无限滚动展示合作赞助商 Logo，增强可信度与品牌背书。
 * Logo 数据来自 CMS，非硬编码。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/types/cms.types.ts : Sponsor 类型
 *   - next/image             : Logo 渲染（含 alt 属性，无障碍必填）
 *   - framer-motion          : 实现无限滚动动画（animate: {x: [0, -50%]}，repeat: Infinity）
 *
 * Exported to / Used by:
 *   - app/page.tsx
 *
 * 【Props Interface】
 * interface SponsorsStripProps
 *   - sponsors: Sponsor[] — 含 name, logoUrl 的赞助商数组
 *
 * 【组件】
 * export default function SponsorsStrip({ sponsors }: SponsorsStripProps): JSX.Element
 *   - 区域容器：overflow-hidden（隐藏滚动条）
 *   - 将 sponsors 数组复制一份拼接（达到无缝循环效果）
 *   - motion.div 以 x: [0, -totalWidth] 循环平移，duration 根据数量动态计算
 *   - Logo 使用 <Image> 渲染，alt="{sponsor.name} logo"
 *   - 区域顶部显示"合作伙伴"标题（可选，来自 siteConfig）
 *
 * 【关键变量】
 * - duplicatedSponsors: Sponsor[] — sponsors 数组 * 2，实现无缝滚动
 * - animationDuration: number    — 根据 sponsors.length 动态计算（每个 Logo 约 3s）
 */

export {}
