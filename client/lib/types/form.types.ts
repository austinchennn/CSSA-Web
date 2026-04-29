/**
 * ============================================================
 * FILE: client/lib/types/form.types.ts
 * ============================================================
 *
 * 【作用】
 * 定义动态报名表单（form_schema）相关的所有 TypeScript 类型。
 * form_schema 是后端 Events 表中的 JSON 字段，前端需要将其
 * 解析为强类型结构，驱动 <DynamicForm> 组件的渲染逻辑。
 *
 * 【依赖关系】
 * Imported by:
 *   - lib/types/cms.types.ts                   : Event.formSchema 字段类型
 *   - components/sections/join/DynamicForm.tsx : 表单渲染逻辑
 *   - lib/graphql/mutations/registration.mutations.ts : 提交数据结构
 *
 * 【定义的 Type / Interface】
 *
 * type FieldType = 'text' | 'number' | 'email' | 'tel' | 'select' | 'textarea'
 *   - 枚举所有支持的动态表单字段类型
 *   - 前端根据此类型选择渲染 Input / Select / Textarea 组件
 *
 * interface FormField
 *   - field: string         — 字段 key（如 "name", "wechat", "major"）
 *   - label: string         — 字段展示标签（如 "姓名", "微信号", "所在专业"）
 *   - type: FieldType       — 字段类型
 *   - required: boolean     — 是否必填
 *   - placeholder?: string  — 输入框提示文字（可选）
 *   - options?: string[]    — type='select' 时的选项列表（如 ["大一","大二","大三","大四"]）
 *   - validation?: FieldValidation — 额外校验规则（可选）
 *
 * interface FieldValidation
 *   - minLength?: number    — 最小字符数
 *   - maxLength?: number    — 最大字符数
 *   - pattern?: string      — 正则表达式字符串（如手机号格式）
 *   - errorMessage?: string — 校验失败时的自定义错误提示
 *
 * type FormSchema = FormField[]
 *   - form_schema JSON 解析后的顶层类型
 *
 * type FormValues = Record<string, string | number | undefined>
 *   - 表单当前值的存储结构（key 为 FormField.field）
 *
 * type FormErrors = Record<string, string>
 *   - 表单校验错误信息（key 为 FormField.field，value 为错误提示文字）
 *
 * interface SubmitPayload
 *   - eventId: string    — 活动 ID
 *   - userInfo: FormValues — 用户填写的答案
 */

export {}
