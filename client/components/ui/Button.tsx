/**
 * ============================================================
 * FILE: client/components/ui/Button.tsx
 * ============================================================
 *
 * 【作用】
 * 全站统一的按钮组件，基于 shadcn/ui Button 二次封装。
 * 定义 variant（主色/线框/幽灵/危险）和 size（sm/md/lg）变体，
 * 所有业务页面使用此组件，禁止直接使用原生 <button> 元素。
 *
 * 【依赖关系】
 * Imports from:
 *   - @/lib/utils/cn.ts : cn() 工具函数，合并 className
 *   - class-variance-authority (cva) : 管理变体 className
 *   - @radix-ui/react-slot : asChild 透传属性
 *
 * Exported to / Used by:
 *   - 全站所有需要按钮的组件
 *
 * 【Interface 定义】
 * interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>
 *   - variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'link'
 *       default: bg-primary text-primary-foreground hover:bg-primary/90
 *       outline: border border-primary text-primary hover:bg-accent
 *       ghost: 无背景无边框，hover:bg-accent
 *       destructive: bg-destructive text-destructive-foreground
 *       link: 纯文字+下划线
 *   - size?: 'sm' | 'default' | 'lg' | 'icon'
 *       sm: h-9 px-3 text-sm
 *       default: h-10 px-4 py-2
 *       lg: h-11 px-8 text-base
 *       icon: h-10 w-10（正方形，用于图标按钮）
 *   - isLoading?: boolean — 显示 Spinner 并进入 disabled 状态
 *   - asChild?: boolean   — 透传 Radix Slot，渲染为子元素（如 <a>）
 *
 * 【组件】
 * export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>()
 *   - isLoading=true 时：插入 Spinner SVG 图标，设 disabled=true，防重复提交
 *   - 所有 variant/size 通过 cva() 定义 className 变体，通过 cn() 合并外部 className
 *   - focus-visible 时显示 ring（使用 --ring CSS 变量颜色）
 *   - transition-colors duration-150 smooth hover
 *
 * 【关键变量】
 * - buttonVariants: CVA 实例 — 管理所有变体 className
 */

export {}
