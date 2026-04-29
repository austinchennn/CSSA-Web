/**
 * ============================================================
 * FILE: client/components/sections/home/ServicesSection.tsx
 * ============================================================
 *
 * 【作用】
 * 首页"核心服务"区域。用图标卡片网格展示 UTMCSSA 提供的四大核心服务：
 * 新生支持 / 学术支持 / 活动组织 / 资源整合。内容来自 CMS 配置。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/types/cms.types.ts   : ServiceItem 类型
 *   - components/ui/Card.tsx   : Card 容器
 *   - components/shared/SectionHeader.tsx : 区域标题
 *   - components/shared/AnimatedSection.tsx
 *
 * Exported to / Used by:
 *   - app/page.tsx
 *
 * 【Props Interface】
 * interface ServicesSectionProps
 *   - services: ServiceItem[] — 每项含 icon（SVG 名称或 emoji）, title, description
 *
 * 【组件】
 * export default function ServicesSection({ services }: ServicesSectionProps): JSX.Element
 *   - 区域标题（居中）
 *   - 四列（lg）→ 两列（md）→ 单列（sm）响应式 Grid
 *   - 每个服务项：图标（大号，品牌主色）+ 标题 + 描述文字
 *   - Framer Motion staggerChildren：卡片依次以 y:20→0, opacity:0→1 进场
 *
 * 【关键变量】
 * - cardVariants: Variants — 每张卡片的进场动画配置
 */

export {}
