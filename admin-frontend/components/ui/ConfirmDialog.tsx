/**
 * ============================================================
 * FILE: admin-frontend/components/ui/ConfirmDialog.tsx
 * ============================================================
 *
 * 【作用】
 * 删除/危险操作确认弹窗。PRD 强制规定所有删除操作必须通过此组件
 * 进行二次确认，防止误操作。全后台通用。
 *
 * 【依赖关系】
 * Imports from:
 *   - @radix-ui/react-dialog  : Dialog 基础组件（无障碍）
 *   - components/ui/Button.tsx : 确认/取消按钮
 *
 * Exported to / Used by:
 *   - components/members/MemberTable.tsx     : 删除成员
 *   - components/events/EventList.tsx        : 关闭活动
 *   - app/(admin)/departments/page.tsx       : 删除部门
 *   - app/(admin)/past-events/page.tsx       : 删除往期活动
 *   - app/(admin)/sponsors/page.tsx          : 删除赞助商
 *
 * 【Props Interface】
 * interface ConfirmDialogProps
 *   - isOpen: boolean           — 弹窗开关
 *   - onClose: () => void       — 关闭回调
 *   - onConfirm: () => void     — 确认操作回调
 *   - title: string             — 弹窗标题（如 "确认删除成员"）
 *   - description: string       — 操作说明（如 "此操作不可撤销，成员数据将永久删除"）
 *   - confirmLabel?: string     — 确认按钮文字，默认 "确认删除"
 *   - isLoading?: boolean       — 确认按钮 loading 状态
 *
 * 【组件】
 * export default function ConfirmDialog({ isOpen, onClose, onConfirm, title, description, confirmLabel, isLoading }: ConfirmDialogProps): JSX.Element
 *   - Radix Dialog.Root isOpen 受控
 *   - 弹窗内容：
 *       标题（text-lg font-semibold）
 *       描述（text-sm text-muted-foreground）
 *       底部操作行：取消按钮（variant="outline"）+ 确认按钮（variant="destructive"，isLoading 状态）
 *   - 点击遮罩层或 Escape 键关闭弹窗（调用 onClose）
 */

export {}
