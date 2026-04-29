/**
 * ============================================================
 * FILE: admin-frontend/components/events/RegistrationsTable.tsx
 * ============================================================
 *
 * 【作用】
 * 动态表头的报名记录数据表格（核心复杂组件）。
 * 与普通 DataTable 不同，此组件的列结构在运行时根据
 * event.formSchema 动态生成，每个活动的表头不同。
 * 同时提供审批操作（Pending → Confirmed/Cancelled）。
 *
 * 【依赖关系】
 * Imports from:
 *   - @tanstack/react-table          : useReactTable（手动构建列定义）
 *   - components/ui/StatusBadge.tsx  : 报名状态展示
 *   - components/ui/SkeletonTable.tsx : 加载骨架屏
 *   - lib/hooks/useRegistrations.ts  : updateRegistrationStatus()
 *   - lib/types/admin.types.ts       : Registration, Event 类型
 *   - lib/types/form.types.ts        : FormField 类型
 *
 * Exported to / Used by:
 *   - app/(admin)/events/[id]/page.tsx
 *
 * 【Props Interface】
 * interface RegistrationsTableProps
 *   - event: Event               — 含 formSchema 的活动数据
 *   - registrations: Registration[]
 *   - isLoading: boolean
 *
 * 【组件】
 * export default function RegistrationsTable({ event, registrations, isLoading }: RegistrationsTableProps): JSX.Element
 *   - isLoading 时渲染 <SkeletonTable>
 *   - 动态列定义构建：
 *       buildColumns(formSchema: FormField[]): ColumnDef<Registration>[]
 *         - 将 formSchema 每个 field 转为一列
 *         - 每列的 accessorFn: (row) => row.userInfo[field.field]（安全读取 JSON）
 *         - 列 header: field.label
 *       固定列追加：
 *         - 提交时间列（createdAt，格式化日期）
 *         - 状态列（<StatusBadge status={reg.status}>）
 *         - 操作列：
 *             "确认" 按钮（status='pending' 时显示，variant="outline"，点击 updateRegistrationStatus(id, 'confirmed')）
 *             "取消" 按钮（status='pending' 时显示，variant="ghost" text-destructive）
 *   - 渲染标准 <table>，空数据时显示"暂无报名记录"
 *
 * 【辅助函数】
 * function buildColumns(formSchema: FormField[]): ColumnDef<Registration>[]
 *   - 核心逻辑：动态生成列定义数组
 */

export {}
