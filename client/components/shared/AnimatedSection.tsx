/**
 * ============================================================
 * FILE: client/components/shared/AnimatedSection.tsx
 * ============================================================
 *
 * 【作用】
 * 通用的滚动进场动效包裹组件。使用 Framer Motion 的 whileInView
 * 功能，当组件进入视口时触发 opacity + y 位移的进场动画。
 * 全站所有 Section 的外层包裹均使用此组件，统一进场体验。
 *
 * 【依赖关系】
 * Imports from:
 *   - framer-motion : motion.section, useInView
 *
 * Exported to / Used by:
 *   - 所有 app/ 页面文件中的 Section 级别组件
 *
 * 【Props Interface】
 * interface AnimatedSectionProps
 *   - children: React.ReactNode — 内部内容
 *   - className?: string        — 外部追加 className（用于 padding/margin 控制）
 *   - delay?: number            — 进场动画延迟（秒），默认 0
 *   - id?: string               — 锚点 ID，用于页内导航
 *
 * 【组件】
 * export default function AnimatedSection({ children, className, delay, id }: AnimatedSectionProps): JSX.Element
 *   - 渲染为 <motion.section>
 *   - 初始状态：opacity: 0, y: 30
 *   - whileInView：opacity: 1, y: 0
 *   - transition：duration: 0.6, delay, ease: "easeOut"
 *   - viewport：{ once: true, margin: "-100px" }（触发一次，提前 100px 激活）
 *   - 每个页面所有 Section 可通过 delay 实现错落进场
 *
 * 【关键变量】
 * - variants: Variants — opacity/y 动画参数对象
 */

export {}
