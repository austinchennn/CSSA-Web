/**
 * ============================================================
 * FILE: client/hooks/useScrollAnimation.ts
 * ============================================================
 *
 * 【作用】
 * 封装 Intersection Observer 逻辑，检测 DOM 元素是否进入视口，
 * 供 Timeline、AnimatedSection 等需要滚动触发动效的组件使用。
 *
 * 【依赖关系】
 * Imports from:
 *   - react (useRef, useState, useEffect)
 *
 * Exported to / Used by:
 *   - components/sections/events/TimelineItem.tsx : 进场动效触发
 *   - components/shared/AnimatedSection.tsx       : 滚动进场（可选，也可用 Framer Motion whileInView）
 *
 * 【Interface 定义】
 * interface UseScrollAnimationOptions
 *   - threshold?: number        — 可见比例阈值，默认 0.1（10% 进入视口即触发）
 *   - rootMargin?: string       — IntersectionObserver rootMargin，默认 '-50px'
 *   - once?: boolean            — 是否只触发一次，默认 true
 *
 * interface UseScrollAnimationReturn
 *   - ref: React.RefObject<HTMLElement>  — 绑定到目标 DOM 元素
 *   - isInView: boolean                  — 是否已进入视口
 *
 * 【Hook】
 * export function useScrollAnimation(options?: UseScrollAnimationOptions): UseScrollAnimationReturn
 *   - 创建 ref = useRef<HTMLElement>(null)
 *   - 创建 isInView = useState<boolean>(false)
 *   - useEffect：创建 IntersectionObserver
 *       - 当 entry.isIntersecting = true 时，设 isInView = true
 *       - once=true 时触发后立即 disconnect（节省性能）
 *       - once=false 时支持重复触发（元素离开再进入视口时重置）
 *   - 清理函数：disconnect observer
 *   - 返回 { ref, isInView }
 */

export {}
