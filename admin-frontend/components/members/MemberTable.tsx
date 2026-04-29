/**
 * ============================================================
 * FILE: admin-frontend/components/members/MemberTable.tsx
 * ============================================================
 *
 * 【作用】
 * 成员数据表格组件。使用 <DataTable> 封装，定义成员专用的列配置，
 * 包含搜索过滤、部门筛选、排序和编辑/删除操作列。
 *
 * 【依赖关系】
 * Imports from:
 *   - components/ui/DataTable.tsx      : DataTable（TanStack Table 封装）
 *   - components/ui/ConfirmDialog.tsx  : 删除确认弹窗
 *   - components/ui/StatusBadge.tsx    : 部门标签
 *   - lib/hooks/useMembers.ts          : deleteMember(), invalidateMembers()
 *   - lib/types/admin.types.ts         : Member 类型
 *   - next/image                       : 头像缩略图
 *
 * Exported to / Used by:
 *   - app/(admin)/members/page.tsx
 *
 * 【Props Interface】
 * interface MemberTableProps
 *   - members: Member[]                  — 过滤后的成员列表
 *   - isLoading: boolean
 *   - onEdit: (member: Member) => void   — 点击编辑触发父组件打开 Drawer
 *
 * 【列定义（ColumnDef<Member>[]）】
 * columns:
 *   1. 头像列：<Image> 圆形缩略图（40x40）
 *   2. 姓名列：可排序，点击列标题排序
 *   3. 职位列：text-muted-foreground
 *   4. 所属部门列：部门名称文字
 *   5. 排序权重列：数字，可排序
 *   6. 操作列：
 *       "编辑"按钮（variant="ghost"，调用 onEdit(member)）
 *       "删除"按钮（variant="ghost"，text-destructive，触发 ConfirmDialog）
 *
 * 【关键变量 / State】
 * - deletingMemberId: string | null — 控制 ConfirmDialog 的开关和目标
 */

export {}
