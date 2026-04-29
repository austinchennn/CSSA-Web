/**
 * ============================================================
 * FILE: admin-frontend/lib/schemas/event.schema.ts
 * ============================================================
 *
 * 【作用】
 * 活动表单的 Zod 校验 Schema 定义。
 *
 * 【依赖关系】
 * Imports from:
 *   - zod : z
 *
 * Exported to / Used by:
 *   - components/events/EventForm.tsx : zodResolver(eventSchema)
 *
 * 【Schema 定义】
 * export const eventSchema = z.object({
 *   title: z.string()
 *     .min(5, '活动标题至少需要 5 个字符')
 *     .max(200, '活动标题不能超过 200 个字符'),
 *   startTime: z.date({
 *     required_error: '请选择举办时间',
 *     invalid_type_error: '请输入有效的日期时间',
 *   }).refine((date) => date > new Date(), '举办时间不能早于当前时间'),
 *   endTime: z.date().optional(),
 *   capacity: z.number()
 *     .int('容量必须为整数')
 *     .min(1, '容量至少为 1 人')
 *     .optional()
 *     .nullable(),
 * }).refine(
 *   (data) => !data.endTime || data.endTime > data.startTime,
 *   { message: '结束时间必须晚于开始时间', path: ['endTime'] }
 * )
 *
 * 【导出类型】
 * export type EventFormData = z.infer<typeof eventSchema>
 */

export {}
