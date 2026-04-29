/**
 * ============================================================
 * FILE: admin-frontend/app/(admin)/events/[id]/page.tsx
 * ============================================================
 *
 * 【作用】
 * 单个活动的报名数据详情页（路由 `/admin/events/[id]`）。
 * 展示该活动的完整报名记录，支持审批操作和一键导出 CSV。
 * 是后台最复杂的页面之一，涉及动态表头生成。
 *
 * 【依赖关系】
 * Imports from:
 *   - components/events/RegistrationsTable.tsx : 动态表头数据表格
 *   - components/shared/ExportCSVButton.tsx     : CSV 导出按钮
 *   - lib/hooks/useRegistrations.ts             : 报名数据 hooks
 *   - lib/hooks/useEvents.ts                    : 活动详情 + 状态修改
 *   - next/navigation (useParams)               : 获取路由 [id] 参数
 *
 * 【组件】
 * export default function EventDetailPage(): JSX.Element
 *   - "use client"
 *   - 使用 useParams() 获取 id
 *   - 并行请求：fetchEventById(id) 和 fetchRegistrationsByEvent(id)
 *
 *   - 顶部统计面板：
 *       超大字号显示 "已报名人数 / 容量上限"（如 "150 / 200"）
 *       进度条（bg-primary 填充，宽度 = 报名人数/容量 * 100%）
 *       Toggle Switch：开启/关闭报名通道（修改 Event.status = 'active' / 'closed'）
 *
 *   - 主体：<RegistrationsTable event={event} registrations={registrations}>
 *       动态表头来自 event.formSchema 解析
 *       每行数据来自 registration.userInfo JSON
 *
 *   - 右上角：<ExportCSVButton data={registrations} event={event}>
 *
 * 【关键变量 / State】
 * - event: Event                        — 当前活动详情
 * - registrations: Registration[]       — 报名记录列表
 * - isRegistrationOpen: boolean          — 报名通道是否开启（event.status === 'active'）
 */

export {}
