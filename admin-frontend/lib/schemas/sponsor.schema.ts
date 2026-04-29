/**
 * ============================================================
 * FILE: admin-frontend/lib/schemas/sponsor.schema.ts
 * ============================================================
 *
 * 【作用】
 * 赞助商表单的 Zod 校验 Schema。
 *
 * 【依赖关系】
 * Imports from:
 *   - zod : z
 *
 * Exported to / Used by:
 *   - app/(admin)/sponsors/page.tsx
 *
 * 【Schema 定义】
 * export const sponsorSchema = z.object({
 *   name: z.string()
 *     .min(1, '赞助商名称不能为空')
 *     .max(100),
 *   logoUrl: z.string()
 *     .min(1, '请上传赞助商 Logo'),
 *   tier: z.enum(['gold', 'silver', 'bronze'], {
 *     errorMap: () => ({ message: '请选择赞助档位' }),
 *   }),
 *   websiteUrl: z.string()
 *     .url('请输入有效的网址格式（如 https://...）')
 *     .optional()
 *     .or(z.literal('')),
 *   description: z.string()
 *     .max(300, '合作文案不能超过 300 个字符')
 *     .optional(),
 * })
 *
 * 【导出类型】
 * export type SponsorFormData = z.infer<typeof sponsorSchema>
 */

export {}
