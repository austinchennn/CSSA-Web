/**
 * ============================================================
 * FILE: client/components/ui/Card.tsx
 * ============================================================
 *
 * 【作用】
 * 全站统一卡片容器组件集合，基于 shadcn/ui Card 封装。
 * 提供 Card / CardHeader / CardTitle / CardDescription / CardContent / CardFooter
 * 六个子组件，通过组合使用构建各类内容卡片（成员卡、活动卡、统计卡等）。
 *
 * 【依赖关系】
 * Imports from:
 *   - @/lib/utils/cn.ts : className 合并工具
 *
 * Exported to / Used by:
 *   - components/sections/home/FeaturedEvents.tsx
 *   - components/sections/team/MemberCard.tsx
 *   - components/sections/events/EventCard.tsx
 *   - components/sections/sponsors/SponsorCard.tsx
 *   - 所有需要卡片容器的组件
 *
 * 【组件定义】
 *
 * export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>()
 *   - 基础样式：rounded-lg border border-border bg-card text-card-foreground shadow-sm
 *   - 支持 hover 状态（shadow-md transition）由使用方通过 className 传入
 *
 * export const CardHeader = React.forwardRef<HTMLDivElement, ...>()
 *   - 样式：flex flex-col space-y-1.5 p-6
 *
 * export const CardTitle = React.forwardRef<HTMLParagraphElement, ...>()
 *   - 样式：text-2xl font-semibold leading-none tracking-tight
 *
 * export const CardDescription = React.forwardRef<HTMLParagraphElement, ...>()
 *   - 样式：text-sm text-muted-foreground
 *
 * export const CardContent = React.forwardRef<HTMLDivElement, ...>()
 *   - 样式：p-6 pt-0
 *
 * export const CardFooter = React.forwardRef<HTMLDivElement, ...>()
 *   - 样式：flex items-center p-6 pt-0
 */

export {}
