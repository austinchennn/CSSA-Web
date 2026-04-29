/**
 * ============================================================
 * FILE: admin-frontend/components/events/EventForm.tsx
 * ============================================================
 *
 * 【作用】
 * 活动基础信息表单组件。管理活动标题、举办时间和容量上限等基础字段，
 * 与 SchemaBuilder（报名表单配置器）并排显示于创建/编辑活动页面。
 *
 * 【依赖关系】
 * Imports from:
 *   - react-hook-form              : useForm, Controller
 *   - lib/schemas/event.schema.ts  : eventSchema (Zod)
 *   - @hookform/resolvers/zod      : zodResolver
 *   - components/ui/Input.tsx      : 标题/容量输入
 *   - @radix-ui/react-popover + react-day-picker : DatePicker 日历组件
 *   - components/ui/Button.tsx
 *
 * Exported to / Used by:
 *   - app/(admin)/events/new/page.tsx
 *
 * 【Props Interface】
 * interface EventFormProps
 *   - defaultValues?: Partial<EventFormData> — 编辑模式的预填值
 *   - onValuesChange: (values: EventFormData) => void — 实时回调父组件（页面统一 submit）
 *
 * 【表单字段与 Zod 校验规则】
 * eventSchema:
 *   - title: string, 必填，最少 5 字符
 *   - startTime: Date, 必填，不能为过去时间
 *   - endTime?: Date, 可选，必须晚于 startTime
 *   - capacity?: number, 可选，最小值 1
 *
 * 【表单 UI】
 * - 活动标题（<Input>，宽输入框）
 * - 举办时间（DatePicker：Date Range Picker 或独立日期+时间 picker）
 * - 容量上限（<Input type="number"，placeholder="不填则不限人数"）
 * - 不包含 Submit 按钮（由父页面的统一"发布"按钮处理提交）
 */

export {}
