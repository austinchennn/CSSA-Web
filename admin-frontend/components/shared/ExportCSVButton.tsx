/**
 * ============================================================
 * FILE: admin-frontend/components/shared/ExportCSVButton.tsx
 * ============================================================
 *
 * 【作用】
 * 报名数据 CSV 导出按钮。将动态表格中展示的 Registration 数据
 * 转换为 CSV 文件，触发浏览器下载。使用 papaparse 库处理 JSON → CSV 转换。
 * PRD 明确要求此功能，是数据运营的重要工具。
 *
 * 【依赖关系】
 * Imports from:
 *   - papaparse               : JSON 数组 → CSV 字符串转换
 *   - lib/types/admin.types.ts : Registration, Event 类型
 *   - lib/types/form.types.ts  : FormField 类型
 *   - components/ui/Button.tsx
 *   - lucide-react             : Download 图标
 *
 * Exported to / Used by:
 *   - app/(admin)/events/[id]/page.tsx
 *
 * 【Props Interface】
 * interface ExportCSVButtonProps
 *   - event: Event               — 活动信息（用于文件名和 formSchema）
 *   - registrations: Registration[] — 要导出的报名数据
 *   - disabled?: boolean         — 无数据时禁用按钮
 *
 * 【组件】
 * export default function ExportCSVButton({ event, registrations, disabled }: ExportCSVButtonProps): JSX.Element
 *   - 渲染：variant="outline" 按钮，内含 Download 图标 + "Export CSV" 文字
 *
 * 【核心函数】
 * handleExport(): void
 *   - 1. 从 event.formSchema 提取列头：formSchema.map(f => f.label)，追加"状态"、"提交时间"
 *   - 2. 将 registrations 转换为二维数组：
 *         rows = registrations.map(reg => [
 *           ...formSchema.map(f => reg.userInfo[f.field] ?? ''),
 *           translateStatus(reg.status),
 *           formatDateTime(reg.createdAt),
 *         ])
 *   - 3. 调用 Papa.unparse({ fields: headers, data: rows }) → csvString
 *   - 4. 创建 Blob（text/csv;charset=utf-8;，加 BOM 头 '\ufeff' 确保 Excel 中文兼容）
 *   - 5. 创建临时 <a> 标签，设 href=URL.createObjectURL(blob)，download="{event.title}_报名数据.csv"
 *   - 6. 触发点击 → 下载 → 清理 URL.revokeObjectURL
 *
 * 【辅助函数】
 * translateStatus(status: RegistrationStatus): string
 *   - 将英文状态 pending/confirmed/cancelled 转为 "待审批/已确认/已取消"
 */

export {}
