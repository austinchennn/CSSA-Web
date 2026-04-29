/**
 * ============================================================
 * FILE: admin-frontend/components/ui/SkeletonTable.tsx
 * ============================================================
 *
 * 【作用】
 * 表格骨架屏占位组件。在数据加载期间替代真实表格，
 * 保持布局稳定，防止内容闪烁。PRD 强制要求所有表格加载时使用骨架屏。
 *
 * 【依赖关系】
 * Imported by:
 *   - components/ui/DataTable.tsx           : isLoading=true 时渲染
 *   - components/events/RegistrationsTable.tsx
 *
 * 【Props Interface】
 * interface SkeletonTableProps
 *   - rows?: number    — 骨架行数，默认 5
 *   - columns?: number — 骨架列数，默认 4
 *
 * 【组件】
 * export default function SkeletonTable({ rows = 5, columns = 4 }: SkeletonTableProps): JSX.Element
 *   - 渲染标准 <table> 结构：
 *       <thead>：columns 个 <th>，每个含 animate-pulse 的灰色圆角块
 *       <tbody>：rows 行 × columns 列，每个 <td> 含宽度随机的 Skeleton 块
 *   - 宽度随机（如 w-1/2, w-3/4, w-full 交替），使骨架更自然
 *   - 行高与真实数据行保持一致（h-10 per row）
 */

export {}
