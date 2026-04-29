/**
 * ============================================================
 * FILE: client/app/events/page.tsx
 * ============================================================
 *
 * 【作用】
 * 活动展示页面（路由 `/events`）。分为两个展示区域：
 * 1. 精选活动卡片（Featured Events）—— 展示最近 3-4 个往期活动
 * 2. 竖向时间线（Timeline）—— 按时间倒序展示所有往期活动，
 *    支持鼠标滚动触发 Timeline 条目的进场动效
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/graphql/queries/pastEvents.queries.ts  : fetchPastEvents(sort, limit)
 *   - lib/types/cms.types.ts                     : PastEvent 类型
 *   - components/sections/events/EventCard.tsx    : 精选活动卡片组件
 *   - components/sections/events/Timeline.tsx     : 时间线容器组件
 *   - components/shared/SectionHeader.tsx
 *
 * 【导出 Metadata】
 * export const metadata: Metadata
 *   - title: "Events"
 *
 * 【函数】
 * export default async function EventsPage(): Promise<JSX.Element>
 *   - 并行调用：
 *       fetchPastEvents({ sort: 'event_date:desc', limit: 4 }) → featuredEvents
 *       fetchPastEvents({ sort: 'event_date:desc' })           → allEvents（用于 Timeline）
 *   - 渲染精选活动卡片区域（水平 Grid 布局，最多 4 个）
 *   - 渲染 <Timeline events={allEvents} /> 时间线区域
 *   - 由于 photo 在数据库层强制必填，此处无需对图片做防空处理
 *
 * 【ISR 配置】
 * export const revalidate = 60
 *
 * 【关键变量】
 * - featuredEvents: PastEvent[] — 精选卡片数据（limit 4）
 * - allEvents: PastEvent[]     — 完整时间线数据
 */

export {}
