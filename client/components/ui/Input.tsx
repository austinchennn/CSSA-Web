/**
 * ============================================================
 * FILE: client/components/ui/Input.tsx
 * ============================================================
 *
 * 【作用】
 * 全站统一文本输入框组件。在 DynamicForm 中根据 form_schema 动态渲染，
 * 也用于联系表单等静态表单场景。支持错误状态视觉反馈。
 *
 * 【依赖关系】
 * Imports from:
 *   - @/lib/utils/cn.ts
 *
 * Exported to / Used by:
 *   - components/sections/join/DynamicForm.tsx  : 动态表单字段渲染
 *   - app/contact/page.tsx                      : 联系表单（如启用）
 *
 * 【Interface 定义】
 * interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>
 *   - hasError?: boolean — 是否处于校验失败状态
 *       true 时：border-destructive focus-visible:ring-destructive
 *
 * 【组件】
 * export const Input = React.forwardRef<HTMLInputElement, InputProps>()
 *   - 基础样式：flex h-10 w-full rounded-md border border-input bg-card
 *               px-3 py-2 text-sm ring-offset-background
 *               placeholder:text-muted-foreground
 *               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
 *               disabled:cursor-not-allowed disabled:opacity-50
 *   - hasError=true 时追加 border-destructive 覆盖默认边框色
 *   - 支持所有原生 input 属性（type="text/email/number/tel" 等）
 */

export {}
