/**
 * ============================================================
 * FILE: admin-frontend/components/events/SchemaFieldRow.tsx
 * ============================================================
 *
 * 【作用】
 * Schema 构造器中的单个字段配置行。每个字段的 label/key/type/required
 * 等属性均在此组件中内联编辑，实时回调父组件 SchemaBuilder 更新 schema。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/types/form.types.ts   : FormField, FieldType
 *   - components/ui/Input.tsx
 *   - components/ui/Select.tsx
 *
 * Exported to / Used by:
 *   - components/events/SchemaBuilder.tsx
 *
 * 【Props Interface】
 * interface SchemaFieldRowProps
 *   - field: FormField                                — 当前字段数据
 *   - index: number                                   — 字段序号（用于标识）
 *   - onChange: (index: number, updated: Partial<FormField>) => void
 *   - onRemove: (index: number) => void               — 删除此字段
 *
 * 【组件】
 * export default function SchemaFieldRow({ field, index, onChange, onRemove }: SchemaFieldRowProps): JSX.Element
 *   - 一行横向布局（flex gap-2 items-start）：
 *       字段标签输入（label）：placeholder="字段名称（如：微信号）"
 *       字段 key 输入（field）：placeholder="字段 key（如：wechat）"，自动从 label 生成 slug
 *       类型 Select（type）：选项来自 FIELD_TYPE_OPTIONS
 *       必填 Checkbox（required）：label="必填"
 *       × 删除按钮（variant="ghost"，仅显示图标）
 *   - type='select' 时：展开 options 区域
 *       当前 options 列表（可逐个输入、删除）
 *       "+ 添加选项"按钮
 *
 * 【辅助函数】
 * generateFieldKey(label: string): string
 *   - 将中文 label 转为 camelCase 或拼音 slug（如 "微信号" → "wechat"）
 *   - 实际实现可以是简单的 label.toLowerCase().replace(/\s+/g, '_')
 *   - 仅作为默认值建议，用户可手动修改
 */

export {}
