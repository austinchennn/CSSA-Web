/**
 * ============================================================
 * FILE: admin-frontend/app/(admin)/page.tsx
 * ============================================================
 *
 * 【作用】
 * 后台仪表盘首页（路由 `/admin`）。登录后的默认落地页，
 * 提供社团运营的宏观数据概览和快捷操作入口。
 *
 * 【依赖关系】
 * Imports from:
 *   - components/dashboard/StatsCard.tsx   : 统计数据卡片
 *   - components/dashboard/QuickActions.tsx: 快捷操作入口
 *   - lib/api/members.api.ts               : getMembersCount()
 *   - lib/api/events.api.ts                : getActiveEventsCount()
 *   - lib/api/registrations.api.ts         : getMonthlyRegistrationsCount()
 *
 * 【组件】
 * export default function DashboardPage(): JSX.Element
 *   - "use client" 指令（使用 TanStack Query 进行数据请求）
 *   - 使用 useQuery 并行请求三个统计数据：
 *       totalMembers: 社团管理层总人数
 *       monthlyRegistrations: 本月新增报名数
 *       activeEventsCount: 当前进行中活动数
 *   - 加载中：三个 <StatsCard> 显示骨架屏
 *   - 加载完成：渲染真实数据
 *   - 渲染 <QuickActions> 快捷操作区
 *
 * 【关键变量】
 * - statsQueries: UseQueryResult[] — 并行 useQuery 的结果数组
 * - isLoading: boolean             — 任一 query 加载中
 */

export {}
