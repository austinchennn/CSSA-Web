/**
 * ============================================================
 * FILE: client/components/ui/Skeleton.tsx
 * ============================================================
 *
 * 【作用】
 * 骨架屏占位组件。在数据加载期间渲染灰色动画占位块，
 * 防止布局抖动（CLS），提升感知性能。
 * 客户端前台在 Suspense 边界内使用，admin 也有独立版本。
 *
 * 【依赖关系】
 * Imports from:
 *   - @/lib/utils/cn.ts
 *
 * Exported to / Used by:
 *   - 任何需要加载占位的组件（配合 React Suspense 使用）
 *
 * 【组件】
 * export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>)
 *   - 基础样式：animate-pulse rounded-md bg-muted
 *   - 使用方通过传入 className 设置具体宽高，例如：
 *       <Skeleton className="h-12 w-full" />    — 文字占位
 *       <Skeleton className="h-48 w-full" />    — 图片占位
 *       <Skeleton className="h-10 w-10 rounded-full" /> — 头像占位
 *
 * 【使用模式】
 * function MemberCardSkeleton()
 *   - 渲染一组 Skeleton 块，模拟真实 MemberCard 的形状
 *   - 头像圆形 + 两行文字 + 一个小标签的布局
 *   - 作为 MemberCard 的加载态替代，在 Suspense fallback 中使用
 */

export {}
