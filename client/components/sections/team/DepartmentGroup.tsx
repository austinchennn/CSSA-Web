/**
 * ============================================================
 * FILE: client/components/sections/team/DepartmentGroup.tsx
 * ============================================================
 *
 * 【作用】
 * 渲染单个部门的成员展示区块。包含部门标题、部门描述（可选），
 * 以及该部门所有成员的 <MemberCard> 网格。
 * 由 TeamPage 遍历 groupedMembers Map 依次渲染。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/types/cms.types.ts                    : Member, Department 类型
 *   - components/sections/team/MemberCard.tsx   : 单成员卡片
 *   - components/shared/AnimatedSection.tsx     : 滚动进场
 *
 * Exported to / Used by:
 *   - app/team/page.tsx
 *
 * 【Props Interface】
 * interface DepartmentGroupProps
 *   - departmentName: string   — 部门名称（用作区块标题）
 *   - members: Member[]        — 该部门所有成员数组（已按 order 倒序排好）
 *   - description?: string     — 部门职能描述（可选，来自 Departments 表）
 *
 * 【组件】
 * export default function DepartmentGroup({ departmentName, members, description }: DepartmentGroupProps): JSX.Element
 *   - 区块顶部：部门名称（h2 标题）+ 可选的部门描述段落
 *   - 成员网格：lg:grid-cols-4, md:grid-cols-3, sm:grid-cols-2，gap-6
 *   - 遍历 members 数组，每个成员渲染 <MemberCard key={member.id} member={member} />
 *   - 当 members 为空时（极端情况），渲染"暂无成员信息"友好提示
 *   - 区块之间有 border-b 分割线（最后一个部门除外）
 */

export {}
