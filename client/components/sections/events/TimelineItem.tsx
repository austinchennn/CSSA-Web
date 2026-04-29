/**
 * ============================================================
 * FILE: client/components/sections/events/TimelineItem.tsx
 * ============================================================
 *
 * 【作用】
 * 时间线中的单个活动条目。包含中轴节点圆点、日期标签、
 * 活动封面图、活动名称和简介摘要。支持滚动进场动效。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/types/cms.types.ts   : PastEvent 类型
 *   - lib/utils/formatDate.ts  : formatEventDate()
 *   - hooks/useScrollAnimation.ts : { ref, isInView } — 检测是否进入视口
 *   - framer-motion            : motion.div — 进场动效
 *   - next/image               : 活动封面图
 *
 * Exported to / Used by:
 *   - components/sections/events/Timeline.tsx
 *
 * 【Props Interface】
 * interface TimelineItemProps
 *   - event: PastEvent — 单个往期活动数据
 *   - index: number    — 条目序号（决定左右位置）
 *   - isActive: boolean — 是否为当前激活（中轴节点变色）
 *
 * 【组件】
 * export default function TimelineItem({ event, index, isActive }: TimelineItemProps): JSX.Element
 *   - 使用 useScrollAnimation() 获取 { ref, isInView }，绑定到条目根元素
 *   - Framer Motion 动效：isInView=true 时从 opacity:0,x:±40 → opacity:1,x:0
 *       左侧条目从 x:-40 进场，右侧从 x:40 进场
 *   - 中轴节点：圆形，isActive 时 bg-primary，非激活时 bg-muted
 *   - 内容卡片：活动日期（小字）+ 活动名称（粗体）+ 封面图（aspect-video）+ 摘要文字
 *   - 富文本 introduction 使用 line-clamp-3 截断
 *
 * 【关键变量】
 * - isLeftSide: boolean — index % 2 === 0（桌面端左侧布局）
 */

export {}
