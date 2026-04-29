/**
 * ============================================================
 * FILE: admin-frontend/components/ui/StatusBadge.tsx
 * ============================================================
 *
 * 【作用】
 * 状态徽章组件（后台专用）。用于展示活动状态（active/upcoming/closed）
 * 和报名状态（pending/confirmed/cancelled），配有对应颜色和指示灯。
 *
 * 【依赖关系】
 * Imported by:
 *   - components/events/EventList.tsx         : 活动状态列
 *   - components/events/RegistrationsTable.tsx : 报名状态列
 *
 * 【Interface 定义】
 * type EventStatus = 'active' | 'upcoming' | 'closed'
 * type RegistrationStatus = 'pending' | 'confirmed' | 'cancelled'
 * type BadgeStatus = EventStatus | RegistrationStatus
 *
 * interface StatusBadgeProps
 *   - status: BadgeStatus
 *
 * 【组件】
 * export default function StatusBadge({ status }: StatusBadgeProps): JSX.Element
 *   - STATUS_CONFIG: Record<BadgeStatus, { label: string; dotColor: string; bgColor: string; textColor: string }>
 *       active:      🟢 dot + bg-green-50 text-green-700     "进行中"
 *       upcoming:    🟡 dot + bg-yellow-50 text-yellow-700   "即将开始"
 *       closed:      ⚪ dot + bg-gray-100 text-gray-500      "已关闭"
 *       pending:     🟡 dot + bg-yellow-50 text-yellow-700   "待审批"
 *       confirmed:   🟢 dot + bg-green-50 text-green-700     "已确认"
 *       cancelled:   🔴 dot + bg-red-50 text-red-700         "已取消"
 *   - 渲染：inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium
 *   - 左侧：h-1.5 w-1.5 rounded-full（状态指示灯圆点）
 */

export {}
