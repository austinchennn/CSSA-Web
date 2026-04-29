/**
 * ============================================================
 * FILE: client/components/sections/join/DynamicForm.tsx
 * ============================================================
 *
 * 【作用】
 * 核心动态表单组件。接收后端下发的 form_schema JSON 数组，
 * 根据每个字段的 type 属性（text/number/select/email/tel）
 * 动态渲染对应的输入控件。表单提交后调用 API 将报名数据写入 Registrations 表。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/types/form.types.ts   : FormSchema, FormField, FormValues 类型
 *   - lib/types/cms.types.ts    : Event 类型
 *   - lib/graphql/mutations/registration.mutations.ts : submitRegistration()
 *   - components/ui/Input.tsx   : 文本/数字/邮件/电话输入框
 *   - components/ui/Select.tsx  : 下拉选择控件
 *   - components/ui/Button.tsx  : 提交按钮（isLoading 状态）
 *
 * Exported to / Used by:
 *   - app/join/page.tsx
 *
 * 【Props Interface】
 * interface DynamicFormProps
 *   - event: Event               — 当前报名活动（含 id 和 form_schema）
 *   - onSuccess?: () => void     — 提交成功回调（显示感谢页或重置表单）
 *
 * 【组件】
 * export default function DynamicForm({ event, onSuccess }: DynamicFormProps): JSX.Element
 *   - 解析 event.form_schema: FormField[] 数组
 *   - 使用 useState 维护 formValues: Record<string, string | number> 对象
 *   - 使用 useState 维护 errors: Record<string, string> 对象（字段 key → 错误信息）
 *   - 遍历 form_schema，根据 field.type 渲染：
 *       'text' | 'email' | 'tel' → <Input type={field.type} />
 *       'number'                  → <Input type="number" />
 *       'select'                  → <Select> 含 field.options 选项
 *   - 每个字段下方条件渲染错误信息（errors[field.field]），红色小字
 *   - handleSubmit(e): void
 *       1. 阻止默认提交
 *       2. validateForm() 校验所有 required 字段
 *       3. 校验通过则调用 submitRegistration({ eventId: event.id, userInfo: formValues })
 *       4. 提交成功：显示成功提示并调用 onSuccess()
 *       5. 提交失败：显示错误 Toast
 *   - 提交按钮：isLoading=true 时显示 Spinner，disabled
 *
 * 【辅助函数】
 * validateForm(schema: FormField[], values: Record<string, unknown>): Record<string, string>
 *   - 遍历所有 required=true 的字段
 *   - 返回 errors 对象（空对象表示校验通过）
 *
 * 【关键变量】
 * - formValues: Record<string, string | number> — 表单当前值
 * - errors: Record<string, string>              — 字段级别错误信息
 * - isSubmitting: boolean                        — 控制提交按钮 loading 状态
 */

export {}
