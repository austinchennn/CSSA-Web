/**
 * ============================================================
 * FILE: client/lib/graphql/queries/events.queries.ts
 * ============================================================
 *
 * 【作用】
 * 当前/报名活动（Events 表）相关 GraphQL Query。
 * 主要用于 Join Us 页面获取当前开放报名的活动及其 form_schema。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/graphql/client.ts  : gqlFetch
 *   - lib/types/cms.types.ts : Event 类型
 *   - lib/types/form.types.ts : FormSchema 类型
 *
 * Exported to / Used by:
 *   - app/join/page.tsx : 获取 active 活动及报名表单 Schema
 *
 * 【GraphQL Query 常量】
 * const ACTIVE_EVENTS_QUERY: string
 *   - 过滤条件：status: { eq: "active" }
 *   - 查询字段：id, title, start_time, capacity, form_schema, status
 *
 * const EVENT_BY_ID_QUERY: string
 *   - 根据活动 ID 查询单个活动详情
 *   - 用于报名前的活动信息确认
 *
 * 【函数】
 * export async function fetchActiveEvents(): Promise<Event[]>
 *   - 获取所有 status='active' 的活动
 *   - revalidate: 30（报名活动状态变更频繁）
 *   - 返回值包含 form_schema（JSON），类型断言为 FormSchema
 *
 * export async function fetchEventById(id: string): Promise<Event | null>
 *   - 获取单个活动，未找到时返回 null
 *   - revalidate: 30
 */

export {}
