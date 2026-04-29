/**
 * ============================================================
 * FILE: client/components/sections/events/Timeline.tsx
 * ============================================================
 *
 * 【作用】
 * 活动竖向时间线容器组件。管理所有 <TimelineItem> 的渲染和滚动交互。
 * 使用 Intersection Observer API（或 Framer Motion useScroll）监听每个
 * TimelineItem 进入视口的时机，触发进场动效和激活状态高亮。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/types/cms.types.ts                        : PastEvent 类型
 *   - components/sections/events/TimelineItem.tsx   : 单个时间线条目
 *   - hooks/useScrollAnimation.ts                   : 提供 ref 和 inView 布尔值
 *
 * Exported to / Used by:
 *   - app/events/page.tsx
 *
 * 【Props Interface】
 * interface TimelineProps
 *   - events: PastEvent[] — 已按 event_date:desc 排序的所有往期活动
 *
 * 【组件】
 * export default function Timeline({ events }: TimelineProps): JSX.Element
 *   - 外层容器：relative（供中轴线定位）
 *   - 中轴线：absolute 垂直线，left: 50%（桌面），left: 20px（移动）
 *   - 遍历 events，每个渲染 <TimelineItem event={event} index={index} />
 *   - 奇数 index 的条目在时间线左侧，偶数在右侧（桌面端）
 *   - 移动端所有条目统一在右侧
 *
 * 【关键变量】
 * - activeIndex: number — 当前视口中央的条目 index（用于高亮中轴线节点）
 */

export {}
