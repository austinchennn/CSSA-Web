/**
 * ============================================================
 * FILE: admin-frontend/app/(admin)/events/page.tsx
 * ============================================================
 *
 * 【作用】
 * 活动管理列表页（路由 `/admin/events`）。展示所有活动的概览信息，
 * 提供创建新活动、查看报名详情、修改活动状态的入口。
 *
 * 【依赖关系】
 * Imports from:
 *   - components/events/EventList.tsx   : 活动列表表格/卡片
 *   - lib/hooks/useEvents.ts            : 活动 CRUD hooks
 *   - next/link                         : 跳转"创建活动"和"报名详情"页
 *
 * 【组件】
 * export default function EventsPage(): JSX.Element
 *   - "use client"
 *   - 顶部工具栏：页面标题 + 状态筛选 Tabs（全部/进行中/即将开始/已关闭）+ "+ 发布活动"按钮
 *   - 主体：<EventList events={filteredEvents}>
 *   - 每个活动行右侧操作：
 *       "查看报名" → Link /admin/events/[id]
 *       "编辑"     → 打开编辑表单（可内联或跳转 /admin/events/new?edit=id）
 *       "关闭报名" → 一键修改 status 为 'closed'（需二次确认 Dialog）
 *
 * 【关键变量 / State】
 * - activeTab: 'all' | 'active' | 'upcoming' | 'closed' — 当前筛选 Tab
 * - filteredEvents: Event[] — 根据 activeTab 过滤后的活动列表
 */

export {}
