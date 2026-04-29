/**
 * ============================================================
 * FILE: admin-frontend/components/events/SchemaBuilder.tsx
 * ============================================================
 *
 * 【作用】
 * 动态报名表单 Schema 可视化构造器（后台核心功能）。
 * 让运营人员通过 GUI 拖拽/点击方式，配置前台报名表单的字段，
 * 无需编写 JSON。构造结果作为 form_schema 存入 Events 表。
 *
 * 【依赖关系】
 * Imports from:
 *   - components/events/SchemaFieldRow.tsx : 单个字段配置行
 *   - lib/types/form.types.ts              : FormField, FieldType 类型
 *   - components/ui/Button.tsx             : "+ 添加字段"按钮
 *
 * Exported to / Used by:
 *   - app/(admin)/events/new/page.tsx
 *
 * 【Props Interface】
 * interface SchemaBuilderProps
 *   - value: FormField[]                          — 当前 schema（受控）
 *   - onChange: (schema: FormField[]) => void     — schema 更新回调
 *
 * 【组件】
 * export default function SchemaBuilder({ value, onChange }: SchemaBuilderProps): JSX.Element
 *   - 顶部：当前已添加字段的列表（遍历 value，每个渲染 <SchemaFieldRow>）
 *   - 每个 SchemaFieldRow 可以：
 *       修改字段名（label）、字段 key（field）、类型（type）、是否必填（required）
 *       type='select' 时显示"添加选项"按钮，管理 options 数组
 *       拖拽调整顺序（@dnd-kit/sortable 实现，Phase 1 可选，可简化为上下按钮）
 *       删除（点击 × 按钮移除此字段）
 *   - 底部："+ 添加输入项"按钮
 *       点击弹出类型选择菜单（单行文本/数字/邮件/电话/下拉选择）
 *       选择后向 value 数组末尾追加新 FormField（field/label 为空，等待填写）
 *   - 右侧：实时预览区（可选），展示当前 schema 会渲染成的表单样式
 *
 * 【辅助函数】
 * addField(type: FieldType): void
 *   - 创建新 FormField：{ field: '', label: '', type, required: false }
 *   - 调用 onChange([...value, newField])
 *
 * updateField(index: number, updated: Partial<FormField>): void
 *   - 更新 value[index] 的指定字段
 *   - 调用 onChange(newSchema)
 *
 * removeField(index: number): void
 *   - 从 value 中移除指定 index 的字段
 *
 * 【关键变量】
 * - FIELD_TYPE_OPTIONS: { label: string; value: FieldType }[] — 类型选择菜单的选项
 */

export {}
