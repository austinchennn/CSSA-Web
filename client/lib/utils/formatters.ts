/**
 * ============================================================
 * FILE: client/lib/utils/formatters.ts
 * ============================================================
 *
 * 【作用】
 * 通用数据格式化与转换工具函数。主要处理 Strapi API 返回的
 * 嵌套数据结构展平，以及其他通用数据转换。
 *
 * 【依赖关系】
 * Imported by:
 *   - lib/graphql/queries/*.ts : 所有 Query 函数在处理 Strapi 响应时使用
 *   - lib/types/cms.types.ts   : 使用此处定义的 StrapiRaw 类型
 *
 * 【函数】
 * export function flattenStrapiData<T>(raw: StrapiCollectionResponse<T>): (T & { id: string })[]
 *   - 将 Strapi 返回的 { data: [{ id, attributes: T }] } 结构
 *     展平为 { id, ...attributes } 的数组
 *   - 泛型 T 为 attributes 的类型
 *   - 适用于所有 Collection Type 的 API 响应
 *
 * export function flattenStrapiSingle<T>(raw: StrapiSingleResponse<T>): T & { id: string }
 *   - 处理 Single Type 的 Strapi 响应（如 Site_Configs）
 *   - 将 { data: { id, attributes: T } } 展平
 *
 * export function flattenStrapiMedia(media: StrapiMediaRaw | null): StrapiMedia | null
 *   - 将 Strapi Media 字段的嵌套格式展平为 { url, alternativeText, width, height }
 *   - 处理 media 为 null 的情况（返回 null）
 *   - media.url 若为相对路径，拼接 STRAPI_URL 前缀变为绝对路径
 *
 * export function groupBy<T>(array: T[], keyFn: (item: T) => string): Map<string, T[]>
 *   - 通用分组工具，将数组按 keyFn 返回的 key 分组为 Map
 *   - 用于 Team 页面按部门分组成员
 *
 * export function truncateText(text: string, maxLength: number): string
 *   - 截断文字超过 maxLength 时加 "..." 后缀
 *   - 用于 EventCard 的简介摘要显示
 */

export {}
