/**
 * ============================================================
 * FILE: admin-frontend/components/dashboard/StatsCard.tsx
 * ============================================================
 *
 * 【作用】
 * 仪表盘统计数据卡片。展示单个关键运营指标（如总人数、本月报名数）。
 * 支持加载态骨架屏和正常数据态两种渲染模式。
 *
 * 【依赖关系】
 * Imports from:
 *   - components/ui/Card.tsx    : Card 容器
 *   - lucide-react              : 卡片图标（Users / CalendarCheck / Activity 等）
 *
 * Exported to / Used by:
 *   - app/(admin)/page.tsx
 *
 * 【Props Interface】
 * interface StatsCardProps
 *   - title: string            — 指标名称（如"社团总人数"）
 *   - value: number | string   — 指标数值（如 42 或 "42 人"）
 *   - icon: LucideIcon         — 卡片右上角图标（lucide 图标组件）
 *   - trend?: { value: number; label: string } — 趋势信息（如 "+5 较上月"）
 *   - isLoading?: boolean      — 是否显示骨架屏
 *
 * 【组件】
 * export default function StatsCard({ title, value, icon: Icon, trend, isLoading }: StatsCardProps): JSX.Element
 *   - isLoading=true：Card 内渲染 2-3 个 Skeleton 块
 *   - 正常态 Card 布局：
 *       顶部行：指标名称（text-sm text-muted-foreground）+ 图标（右侧，品牌主色）
 *       数值：text-3xl font-bold text-foreground（大字号，核心数据突出显示）
 *       trend（可选）：text-sm text-muted-foreground，正增长绿色，负增长红色
 */

export {}
