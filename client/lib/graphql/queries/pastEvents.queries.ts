/**
 * ============================================================
 * FILE: client/lib/graphql/queries/pastEvents.queries.ts
 * ============================================================
 *
 * 【作用】
 * 往期活动（Past_Events）相关 GraphQL Query。
 * 提供排序、分页、数量限制的查询接口，供 Events 页面的
 * 精选卡片区域和时间线区域使用。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/graphql/client.ts  : gqlFetch
 *   - lib/types/cms.types.ts : PastEvent 类型
 *
 * Exported to / Used by:
 *   - app/events/page.tsx
 *   - app/page.tsx（首页精选活动）
 *
 * 【GraphQL Query 常量】
 * const PAST_EVENTS_QUERY: string
 *   - 支持 $sort, $limit, $start 变量参数
 *   - 查询字段：id, event_name, introduction, event_date,
 *              photo{url, alternativeText, width, height}
 *   - 默认排序：event_date:desc（最新活动在最前）
 *
 * 【Interface 定义】
 * interface FetchPastEventsOptions
 *   - sort?: string    — 排序字段，默认 'event_date:desc'
 *   - limit?: number   — 返回数量限制，不传则返回全部
 *   - start?: number   — 分页偏移量（用于 infinite scroll 扩展）
 *
 * 【函数】
 * export async function fetchPastEvents(options?: FetchPastEventsOptions): Promise<PastEvent[]>
 *   - 调用 gqlFetch，传入 options 中的 sort, limit, start 变量
 *   - 使用 flattenStrapiData 处理 Strapi 嵌套结构
 *   - revalidate: 60（活动图文更新相对较频繁）
 *   - photo 字段在数据库层强制必填，不需要对空图片做防护
 */

export {}
