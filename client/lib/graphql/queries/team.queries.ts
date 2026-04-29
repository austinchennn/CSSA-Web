/**
 * ============================================================
 * FILE: client/lib/graphql/queries/team.queries.ts
 * ============================================================
 *
 * 【作用】
 * 团队成员（Members）和部门（Departments）相关 GraphQL Query。
 * 获取所有成员数据（含关联部门），供 Team 页面渲染使用。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/graphql/client.ts  : gqlFetch
 *   - lib/types/cms.types.ts : Member, Department 类型
 *
 * Exported to / Used by:
 *   - app/team/page.tsx
 *
 * 【GraphQL Query 常量】
 * const ALL_MEMBERS_QUERY: string
 *   - 查询所有成员，populate department 关联字段
 *   - 排序：order:desc（按 order 权重倒序，权重高的排前）
 *   - 查询字段：id, name, title, photo{url, alternativeText}, order,
 *              department{id, name, introduction, leader_name}
 *
 * const DEPARTMENTS_QUERY: string
 *   - 仅查询部门列表（不含成员详情）
 *   - 用于部门筛选下拉列表
 *   - 查询字段：id, name, leader_name, introduction
 *
 * 【函数】
 * export async function fetchAllMembers(): Promise<Member[]>
 *   - 调用 gqlFetch<{ members: { data: MemberRaw[] } }>(ALL_MEMBERS_QUERY)
 *   - 将 Strapi 返回的 { data: { id, attributes: {...} }[] } 格式
 *     转换为扁平化的 Member[] 格式（flattenStrapiData 工具函数处理）
 *   - revalidate: 120
 *
 * export async function fetchDepartments(): Promise<Department[]>
 *   - revalidate: 300
 *
 * 【辅助函数】
 * function flattenStrapiData<T>(raw: StrapiCollectionRaw<T>): T[]
 *   - 处理 Strapi 的 { data: { id, attributes: T }[] } 嵌套结构
 *   - 将每条记录展平为 { id, ...attributes } 的扁平对象
 *   - 此函数在 lib/utils/formatters.ts 中定义，此处仅调用
 */

export {}
