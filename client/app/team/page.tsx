/**
 * ============================================================
 * FILE: client/app/team/page.tsx
 * ============================================================
 *
 * 【作用】
 * 管理层/部门介绍页面（路由 `/team`）。从 Strapi GraphQL 拉取所有
 * 成员数据（含关联的部门信息），在客户端按部门分组渲染成员卡片网格。
 * 严禁任何硬编码成员信息——数据完全来自 CMS。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/graphql/queries/team.queries.ts      : fetchAllMembers() — 含 populate=department
 *   - lib/types/cms.types.ts                   : Member, Department 类型
 *   - components/sections/team/DepartmentGroup.tsx : 部门分组渲染组件
 *   - components/shared/SectionHeader.tsx       : 页面标题
 *   - components/shared/AnimatedSection.tsx     : 滚动进场动效
 *
 * 【导出 Metadata】
 * export const metadata: Metadata
 *   - title: "Our Team"
 *
 * 【函数】
 * export default async function TeamPage(): Promise<JSX.Element>
 *   - 调用 fetchAllMembers()，返回扁平化的 Member[] 数组（每个成员携带 dept 信息）
 *   - 调用 groupMembersByDepartment(members) 将扁平数组转为按部门分组的 Map
 *   - 优先渲染主席团（Executive/President's Office），其余部门按名称排序渲染
 *   - 为每个部门渲染一个 <DepartmentGroup> 组件
 *   - 当 CMS 删除某成员后，members 数组长度减少，对应 <MemberCard> 自动 unmount
 *
 * 【辅助函数】
 * groupMembersByDepartment(members: Member[]): Map<string, Member[]>
 *   - 将 Member[] 按 member.department.name 分组为 Map
 *   - 每组内部按 member.order 字段倒序排列（order 越大越靠前）
 *
 * 【ISR 配置】
 * export const revalidate = 120
 *
 * 【关键变量】
 * - members: Member[] — 从 GraphQL 获取的完整成员列表
 * - groupedMembers: Map<string, Member[]> — 按部门分组后的结构
 */

export {}
