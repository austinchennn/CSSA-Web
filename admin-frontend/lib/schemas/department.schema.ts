/**
 * ============================================================
 * FILE: admin-frontend/lib/schemas/department.schema.ts
 * ============================================================
 *
 * 【作用】
 * 部门表单的 Zod 校验 Schema。
 *
 * 【依赖关系】
 * Imports from:
 *   - zod : z
 *
 * Exported to / Used by:
 *   - app/(admin)/departments/page.tsx
 *
 * 【Schema 定义】
 * export const departmentSchema = z.object({
 *   name: z.string()
 *     .min(2, '部门名称至少需要 2 个字符')
 *     .max(100, '部门名称不能超过 100 个字符'),
 *   leaderName: z.string()
 *     .min(2, '负责人姓名至少需要 2 个字符')
 *     .max(50, '负责人姓名不能超过 50 个字符'),
 *   introduction: z.string()
 *     .max(500, '部门简介不能超过 500 个字符')
 *     .optional(),
 * })
 *
 * 【导出类型】
 * export type DepartmentFormData = z.infer<typeof departmentSchema>
 */

export {}
