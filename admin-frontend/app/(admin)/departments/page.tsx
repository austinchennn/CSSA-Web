/**
 * ============================================================
 * FILE: admin-frontend/app/(admin)/departments/page.tsx
 * ============================================================
 *
 * 【作用】
 * 部门管理页（路由 `/admin/departments`）。维护部门名称、现任部长姓名
 * 和部门简介，为成员管理的部门下拉选择器提供数据池。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/hooks/useDepartments.ts          : 部门 CRUD hooks
 *   - lib/schemas/department.schema.ts     : Zod 校验
 *   - components/ui/ConfirmDialog.tsx      : 删除确认弹窗
 *
 * 【组件】
 * export default function DepartmentsPage(): JSX.Element
 *   - "use client"
 *   - 顶部：页面标题 + "+ 添加部门"按钮
 *   - 主体：简单的 Card 列表（无需复杂表格），每个部门显示：
 *       部门名称、现任部长姓名、成员人数（统计）、操作（编辑/删除）
 *   - 内联编辑：点击编辑直接在 Card 内展开编辑表单（inline editing 模式）
 *   - 删除：弹出 <ConfirmDialog>，确认后调用 deleteDepartment(id)
 *   - 注意：若部门下有成员，删除需先提示"请先移除该部门下的所有成员"
 *
 * 【关键变量 / State】
 * - editingId: string | null — 当前正在编辑的部门 ID（null = 非编辑状态）
 * - deletingId: string | null — 待删除的部门 ID（控制 ConfirmDialog）
 */

export {}
