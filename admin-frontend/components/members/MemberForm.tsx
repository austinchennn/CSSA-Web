/**
 * ============================================================
 * FILE: admin-frontend/components/members/MemberForm.tsx
 * ============================================================
 *
 * 【作用】
 * 成员信息表单字段组件。包含所有成员信息的输入控件，
 * 使用 React Hook Form + Zod 进行严苛的前端校验。
 * 与 Drawer 解耦，便于独立测试。
 *
 * 【依赖关系】
 * Imports from:
 *   - react-hook-form              : useForm, Controller
 *   - lib/schemas/member.schema.ts : memberSchema (Zod)
 *   - @hookform/resolvers/zod      : zodResolver
 *   - lib/hooks/useDepartments.ts  : 动态加载部门选项
 *   - components/shared/ImageUploader.tsx : 照片上传
 *   - components/ui/Button.tsx
 *
 * Exported to / Used by:
 *   - components/members/MemberDrawer.tsx
 *
 * 【Props Interface】
 * interface MemberFormProps
 *   - member?: Member | null        — 编辑时预填表单值（新增时为 null/undefined）
 *   - onSubmit: (data: MemberFormData) => Promise<void>  — 提交回调
 *   - isSubmitting: boolean         — 控制提交按钮状态
 *
 * 【表单字段与校验规则】
 * 通过 memberSchema (Zod) 定义：
 *   - name: string, 必填，最少 2 字符
 *   - title: string, 必填，最少 2 字符
 *   - deptId: string, 必填（从部门下拉选择，不能为空）
 *   - order: number, 默认 0，最小 0
 *   - photo: File | string（File=新上传，string=已有照片 URL）
 *
 * 【表单 UI 结构】
 * - 姓名输入框（<Input>）+ 错误提示
 * - 职位输入框（<Input>）+ 错误提示
 * - 部门下拉（<Select>，动态加载 departments）+ 错误提示
 * - 排序权重（<Input type="number">）
 * - 照片上传（<ImageUploader>，accept="jpg/png"，预览已有照片）
 * - 提交按钮（isLoading=isSubmitting）
 *
 * 【校验触发时机】
 * mode: 'onBlur'（离开输入框时校验）
 */

export {}
