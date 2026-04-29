/**
 * ============================================================
 * FILE: admin-frontend/lib/schemas/member.schema.ts
 * ============================================================
 *
 * 【作用】
 * 成员表单的 Zod 校验 Schema 定义。被 React Hook Form 通过
 * zodResolver 集成，实现严苛的前端数据校验。
 *
 * 【依赖关系】
 * Imports from:
 *   - zod : z
 *
 * Exported to / Used by:
 *   - components/members/MemberForm.tsx : zodResolver(memberSchema)
 *
 * 【Schema 定义】
 * export const memberSchema = z.object({
 *   name: z.string()
 *     .min(2, '姓名至少需要 2 个字符')
 *     .max(50, '姓名不能超过 50 个字符'),
 *   title: z.string()
 *     .min(2, '职位名称至少需要 2 个字符')
 *     .max(100, '职位名称不能超过 100 个字符'),
 *   deptId: z.string()
 *     .min(1, '请选择所属部门'),
 *   order: z.number()
 *     .int('排序权重必须为整数')
 *     .min(0, '排序权重不能为负数')
 *     .default(0),
 *   photoUrl: z.string()
 *     .min(1, '请上传成员照片'),
 * })
 *
 * 【导出类型】
 * export type MemberFormData = z.infer<typeof memberSchema>
 *   - 用于 React Hook Form 的泛型参数 useForm<MemberFormData>
 */

export {}
