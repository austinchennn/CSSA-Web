/**
 * ============================================================
 * FILE: client/components/ui/Badge.tsx
 * ============================================================
 *
 * 【作用】
 * 标签徽章组件，用于展示活动状态（upcoming/active/closed）、
 * 部门标签、赞助档位等小型标记信息。
 *
 * 【依赖关系】
 * Imports from:
 *   - @/lib/utils/cn.ts
 *   - class-variance-authority (cva)
 *
 * Exported to / Used by:
 *   - components/sections/events/EventCard.tsx  : 展示活动状态标签
 *   - components/sections/team/MemberCard.tsx   : 展示部门标签
 *   - components/sections/sponsors/TierSection.tsx
 *
 * 【Interface 定义】
 * interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>
 *   - variant?: 'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline'
 *       default:     bg-primary text-primary-foreground（品牌主色）
 *       secondary:   bg-secondary text-secondary-foreground（淡紫背景）
 *       success:     bg-green-100 text-green-800（活动 active 状态）
 *       warning:     bg-yellow-100 text-yellow-800（活动 upcoming 状态）
 *       destructive: bg-red-100 text-red-800（已关闭/错误状态）
 *       outline:     border border-border text-foreground（轮廓版）
 *
 * 【组件】
 * export function Badge({ variant, className, ...props }: BadgeProps): JSX.Element
 *   - 基础样式：inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold
 *   - 不可交互（不是按钮），仅展示用途
 */

export {}
