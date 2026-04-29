/**
 * ============================================================
 * FILE: client/lib/graphql/queries/sponsors.queries.ts
 * ============================================================
 *
 * 【作用】
 * 赞助商（Sponsors）相关 GraphQL Query。
 * 获取所有赞助商的 Logo、名称、官网链接和赞助档位，
 * 供赞助商页面和首页 SponsorsStrip 使用。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/graphql/client.ts  : gqlFetch
 *   - lib/types/cms.types.ts : Sponsor 类型
 *
 * Exported to / Used by:
 *   - app/sponsors/page.tsx
 *   - app/page.tsx（首页横条）
 *
 * 【GraphQL Query 常量】
 * const SPONSORS_QUERY: string
 *   - 查询字段：id, name, logoUrl{url, alternativeText}, websiteUrl, tier, description
 *   - 排序：tier asc（gold 档在前），然后 name asc
 *
 * 【函数】
 * export async function fetchSponsors(): Promise<Sponsor[]>
 *   - revalidate: 300（赞助商信息变更频率低）
 *   - 返回按 tier 排序的赞助商数组
 *   - 使用 flattenStrapiData 处理嵌套结构
 */

export {}
