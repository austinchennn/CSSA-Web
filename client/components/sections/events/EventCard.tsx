/**
 * ============================================================
 * FILE: client/components/sections/events/EventCard.tsx
 * ============================================================
 *
 * 【作用】
 * 活动展示卡片（精选卡片区域使用）。展示单个往期活动的封面图、
 * 活动名称、举办日期。同时被首页 FeaturedEvents 区域复用。
 * 由于数据库层强制 photo 字段必填，此组件无需处理图片缺失情况。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/types/cms.types.ts  : PastEvent 类型
 *   - lib/utils/formatDate.ts : formatEventDate() 日期格式化
 *   - components/ui/Card.tsx  : Card 容器
 *   - next/image              : 活动封面图（必含 alt）
 *
 * Exported to / Used by:
 *   - components/sections/home/FeaturedEvents.tsx
 *   - app/events/page.tsx（精选区域）
 *
 * 【Props Interface】
 * interface EventCardProps
 *   - event: PastEvent — 含 id, event_name, photo, event_date, introduction
 *   - priority?: boolean — 是否设置 Image priority（首屏卡片设为 true）
 *
 * 【组件】
 * export default function EventCard({ event, priority }: EventCardProps): JSX.Element
 *   - 卡片容器：rounded-lg overflow-hidden，hover:shadow-lg transition
 *   - 封面图区域：aspect-[4/3]，relative，overflow-hidden
 *       <Image src={event.photo.url} alt={event.event_name} fill objectFit="cover" />
 *       hover 时图片轻微 scale-105
 *   - 卡片底部 padding 区域：
 *       活动名称：font-semibold text-foreground，line-clamp-2
 *       举办日期：text-sm text-muted-foreground，使用 formatEventDate() 格式化
 *
 * 【关键变量】
 * - formattedDate: string — formatEventDate(event.event_date) 的返回值
 */

export {}
