/**
 * ============================================================
 * FILE: client/components/sections/home/FeaturedEvents.tsx
 * ============================================================
 *
 * 【作用】
 * 首页"精选活动"展示区域。横向卡片列表，展示最近 3-4 个往期活动的缩略图、
 * 活动名称和日期，作为活动页的入口预览。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/types/cms.types.ts                    : PastEvent 类型
 *   - components/sections/events/EventCard.tsx  : 复用活动卡片
 *   - components/shared/SectionHeader.tsx
 *   - components/shared/AnimatedSection.tsx
 *   - components/ui/Button.tsx                  : "查看全部活动" 跳转按钮
 *   - next/link
 *
 * Exported to / Used by:
 *   - app/page.tsx
 *
 * 【Props Interface】
 * interface FeaturedEventsProps
 *   - events: PastEvent[] — 最多 4 个精选往期活动数据
 *
 * 【组件】
 * export default function FeaturedEvents({ events }: FeaturedEventsProps): JSX.Element
 *   - 区域标题（左对齐）+ 右侧"查看全部"链接
 *   - 横向 Grid（lg:grid-cols-4, md:grid-cols-2, sm:grid-cols-1）
 *   - 每个活动渲染 <EventCard> 组件
 *   - 区域底部居中"查看全部活动"按钮，跳转 /events
 */

export {}
