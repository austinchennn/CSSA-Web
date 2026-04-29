/**
 * ============================================================
 * FILE: admin-frontend/components/shared/RichTextEditor.tsx
 * ============================================================
 *
 * 【作用】
 * 富文本编辑器组件，基于 TipTap 封装。用于往期活动总结（introduction）
 * 的格式化编辑，支持加粗、斜体、无序列表、有序列表、换行等基础排版。
 *
 * 【依赖关系】
 * Imports from:
 *   - @tiptap/react           : useEditor, EditorContent
 *   - @tiptap/starter-kit     : 基础插件集（Bold, Italic, BulletList, OrderedList, Paragraph 等）
 *   - lucide-react            : 工具栏图标（Bold, Italic, List 等）
 *
 * Exported to / Used by:
 *   - app/(admin)/past-events/page.tsx : 活动总结编辑
 *
 * 【Props Interface】
 * interface RichTextEditorProps
 *   - content: string                   — 初始 HTML 内容（Strapi Rich Text 存储为 HTML）
 *   - onChange: (html: string) => void  — 内容变更回调（返回 HTML 字符串）
 *   - placeholder?: string
 *   - isDisabled?: boolean
 *
 * 【组件】
 * export default function RichTextEditor({ content, onChange, placeholder, isDisabled }: RichTextEditorProps): JSX.Element
 *   - 工具栏（Toolbar）：
 *       加粗（B）、斜体（I）、无序列表（•）、有序列表（1.）
 *       各按钮激活态（editor.isActive('bold')）时 bg-accent
 *   - 编辑区域：min-h-[200px] border border-input rounded-md p-3
 *       EditorContent 渲染 TipTap 编辑器
 *   - 内容变更时调用 onChange(editor.getHTML())
 *   - isDisabled=true 时编辑器设为 editable: false
 *
 * 【初始化配置（extensions）】
 * - StarterKit（含 Bold, Italic, BulletList, OrderedList, Paragraph, HardBreak 等）
 * - Placeholder（显示 placeholder 提示文字）
 */

export {}
