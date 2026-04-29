/**
 * ============================================================
 * FILE: admin-frontend/components/ui/DataTable.tsx
 * ============================================================
 *
 * 【作用】
 * 后台通用数据表格组件（静态表头版本）。提供统一的表格样式、
 * 排序、分页能力，用于成员表格等表头固定的场景。
 * 动态表头的报名数据表格使用 RegistrationsTable（专用组件）。
 *
 * 【依赖关系】
 * Imports from:
 *   - @tanstack/react-table : useReactTable, flexRender（Table 引擎）
 *   - components/ui/SkeletonTable.tsx : 加载骨架屏
 *
 * Exported to / Used by:
 *   - components/members/MemberTable.tsx : 成员列表
 *   - components/events/EventList.tsx    : 活动列表
 *
 * 【Interface 定义】
 * interface DataTableProps<TData>
 *   - columns: ColumnDef<TData>[]  — TanStack Table 列定义数组
 *   - data: TData[]                — 表格数据
 *   - isLoading?: boolean          — 加载中时渲染骨架屏
 *   - pageSize?: number            — 每页条数，默认 20
 *   - onRowClick?: (row: TData) => void — 行点击回调（可选）
 *
 * 【组件】
 * export function DataTable<TData>({ columns, data, isLoading, pageSize, onRowClick }: DataTableProps<TData>): JSX.Element
 *   - isLoading=true：渲染 <SkeletonTable>
 *   - 使用 useReactTable 创建表格实例，开启 getPaginationRowModel
 *   - 渲染 <table> 标准 HTML 结构：
 *       <thead>：列标题行（支持点击排序，显示排序方向箭头）
 *       <tbody>：数据行，空数据时显示"暂无数据"居中提示
 *       分页控件：上一页/下一页按钮 + 当前页码/总页数显示
 *   - 行 hover：bg-muted/50
 *   - 奇偶行：不需要斑马纹（统一白色背景即可）
 */

export {}
