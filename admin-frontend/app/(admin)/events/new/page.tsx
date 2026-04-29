/**
 * ============================================================
 * FILE: admin-frontend/app/(admin)/events/new/page.tsx
 * ============================================================
 *
 * 【作用】
 * 创建/编辑活动页面（路由 `/admin/events/new` 和 `/admin/events/new?edit={id}`）。
 * 包含活动基础信息表单和动态 Schema 构造器（核心功能）。
 *
 * 【依赖关系】
 * Imports from:
 *   - components/events/EventForm.tsx      : 活动基础信息表单
 *   - components/events/SchemaBuilder.tsx  : 动态报名表单 Schema 构造器
 *   - lib/hooks/useEvents.ts               : createEvent(), updateEvent()
 *   - next/navigation (useSearchParams)    : 读取 ?edit={id} 参数判断是新增还是编辑
 *
 * 【组件】
 * export default function NewEventPage(): JSX.Element
 *   - "use client"
 *   - 通过 useSearchParams().get('edit') 判断是创建还是编辑模式
 *   - 编辑模式时预先加载活动数据填充表单
 *   - 布局：左栏（活动基础信息）+ 右栏（Schema 构造器）
 *   - 底部：保存草稿 / 立即发布 两个操作按钮
 *   - 保存成功后跳转至 /admin/events
 *
 * 【关键变量 / State】
 * - isEditMode: boolean        — 是否为编辑模式
 * - eventId: string | null     — 编辑模式下的活动 ID
 * - formData: EventFormData    — 活动基础信息（标题/时间/容量）
 * - schema: FormField[]        — Schema 构造器的当前 JSON 结构
 */

export {}
