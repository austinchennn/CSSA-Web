/**
 * ============================================================
 * FILE: client/components/sections/home/HeroSection.tsx
 * ============================================================
 *
 * 【作用】
 * 首页最顶部的全宽 Hero 区域。展示社团品牌名称、核心 Slogan、
 * 背景图片（或渐变色），以及两个 CTA 按钮（了解更多 / 加入我们）。
 * 是进入官网的第一视觉焦点，须有强烈的品牌识别感。
 *
 * 【依赖关系】
 * Imports from:
 *   - components/ui/Button.tsx     : CTA 按钮
 *   - lib/types/cms.types.ts       : HeroData 类型
 *   - framer-motion                : 标题与副标题分词进场动效
 *   - next/image                   : Hero 背景图（若使用图片）
 *
 * Exported to / Used by:
 *   - app/page.tsx : 首页第一个 Section
 *
 * 【Props Interface】
 * interface HeroSectionProps
 *   - data: HeroData — 含 title, subtitle, ctaPrimary, ctaSecondary, backgroundImage
 *
 * 【组件】
 * export default function HeroSection({ data }: HeroSectionProps): JSX.Element
 *   - 全宽容器：min-h-[90vh] flex items-center justify-center（桌面端）
 *   - 背景：若 data.backgroundImage 存在用 <Image>，否则用 CSS 渐变
 *   - 使用 Framer Motion staggerChildren 实现标题逐词进场（延迟 0.1s/词）
 *   - 标题：text-4xl md:text-6xl font-bold text-foreground
 *   - 副标题：text-lg md:text-xl text-muted-foreground mt-4
 *   - CTA 按钮行：mt-8 flex gap-4 justify-center
 *       主按钮：variant="default"（品牌红），跳转 /join
 *       次按钮：variant="outline"，跳转 /about
 *
 * 【关键变量】
 * - containerVariants: Variants — Framer Motion 容器动画配置
 * - itemVariants: Variants      — Framer Motion 子元素动画配置
 */

export {}
