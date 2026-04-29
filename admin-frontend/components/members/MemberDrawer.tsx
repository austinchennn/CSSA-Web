/**
 * ============================================================
 * FILE: admin-frontend/components/members/MemberDrawer.tsx
 * ============================================================
 *
 * 【作用】
 * 添加/编辑成员的侧边滑出抽屉（Sheet 组件）。包含成员信息表单
 * 和图片上传功能，提交后自动刷新成员列表。
 *
 * 【依赖关系】
 * Imports from:
 *   - components/members/MemberForm.tsx    : 表单字段组件
 *   - @radix-ui/react-dialog               : Sheet/Drawer 基础组件
 *   - lib/hooks/useMembers.ts              : createMember(), updateMember()
 *   - lib/types/admin.types.ts             : Member 类型
 *
 * Exported to / Used by:
 *   - app/(admin)/members/page.tsx
 *
 * 【Props Interface】
 * interface MemberDrawerProps
 *   - isOpen: boolean
 *   - onClose: () => void
 *   - member: Member | null    — null=新增模式，有值=编辑模式（预填表单）
 *
 * 【组件】
 * export default function MemberDrawer({ isOpen, onClose, member }: MemberDrawerProps): JSX.Element
 *   - 使用 Radix Sheet 从右侧滑入（side="right"，width: w-96 或 w-[480px]）
 *   - 标题：新增模式="添加新成员"，编辑模式="编辑成员信息"
 *   - 主体：<MemberForm member={member} onSubmit={handleSubmit}>
 *   - handleSubmit(data: MemberFormData): Promise<void>
 *       编辑模式：调用 updateMember(member.id, data)
 *       新增模式：调用 createMember(data)
 *       成功：Toast 提示 + onClose() + invalidateMembers()（刷新列表）
 *       失败：Toast 错误提示，Drawer 保持开启
 *   - 提交中：表单内 Submit 按钮显示 Spinner
 */

export {}
