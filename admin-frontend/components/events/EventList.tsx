/**
 * ============================================================
 * FILE: admin-frontend/components/events/EventList.tsx
 * ============================================================
 *
 * 【作用】
 * 活动列表展示组件。以表格形式展示所有活动的核心信息，
 * 包含状态指示灯、报名进度条和操作入口。
 *
 * 【依赖关系】
 * Imports from:
 *   - components/ui/DataTable.tsx     : DataTable（TanStack Table）
 *   - components/ui/StatusBadge.tsx   : 活动状态徽章
 *   - components/ui/ConfirmDialog.tsx : 关闭活动确认
 *   - lib/hooks/useEvents.ts          : updateEventStatus()
 *   - lib/utils/formatters.ts         : 日期格式化
 *   - next/link                       : 跳转报名详情 /admin/events/[id]
 *
 * Exported to / Used by:
 *   - app/(admin)/events/page.tsx
 *
 * 【Props Interface】
 * interface EventListProps
 *   - events: Event[]
 *   - isLoading: boolean
 *
 * 【列定义（ColumnDef<Event>[]）】
 *   1. 活动标题列
 *   2. 状态列：<StatusBadge status={event.status}>
 *   3. 举办时间列：格式化日期
 *   4. 报名进度列：
 *       文字："150 / 200"（无容量上限时显示"150 人"）
 *       进度条：<Progress value={...}>（可选视觉增强）
 *   5. 操作列：
 *       "查看报名" → Link /admin/events/{event.id}
 *       "编辑" → Link /admin/events/new?edit={event.id}
 *       "关闭报名" → 触发 ConfirmDialog（仅 active/upcoming 状态显示）
 */

export {}
