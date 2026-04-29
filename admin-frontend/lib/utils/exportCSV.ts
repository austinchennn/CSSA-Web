/**
 * ============================================================
 * FILE: admin-frontend/lib/utils/exportCSV.ts
 * ============================================================
 *
 * 【作用】
 * CSV 导出工具函数库。封装 papaparse 的调用和浏览器文件下载逻辑，
 * 供 ExportCSVButton 组件调用，也可被其他需要 CSV 导出的场景复用。
 *
 * 【依赖关系】
 * Imports from:
 *   - papaparse               : Papa.unparse()
 *   - lib/types/admin.types.ts : Registration 类型
 *   - lib/types/form.types.ts  : FormField 类型
 *
 * Exported to / Used by:
 *   - components/shared/ExportCSVButton.tsx
 *
 * 【函数】
 * export function buildRegistrationsCSV(
 *   registrations: Registration[],
 *   formSchema: FormField[]
 * ): string
 *   - 从 formSchema 提取列头 labels 数组
 *   - 追加固定列：['提交状态', '提交时间']
 *   - 将每条 Registration 的 userInfo JSON 按 formSchema 字段顺序展开为行
 *   - 调用 Papa.unparse({ fields: headers, data: rows })
 *   - 返回 CSV 字符串
 *
 * export function downloadCSV(csvString: string, filename: string): void
 *   - 在 csvString 前加 BOM('\ufeff')，确保 Excel 正确识别 UTF-8 中文
 *   - 创建 Blob(text/csv;charset=utf-8)
 *   - 创建临时 <a> 标签触发下载
 *   - 调用 URL.revokeObjectURL 清理内存
 *
 * export function exportRegistrationsToCSV(
 *   registrations: Registration[],
 *   formSchema: FormField[],
 *   eventTitle: string
 * ): void
 *   - 组合 buildRegistrationsCSV + downloadCSV 的便捷函数
 *   - filename 格式："{eventTitle}_报名数据_{YYYY-MM-DD}.csv"
 */

export {}
