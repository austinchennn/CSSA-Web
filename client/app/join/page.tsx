/**
 * ============================================================
 * FILE: client/app/join/page.tsx
 * ============================================================
 *
 * 【作用】
 * 加入我们/招新页面（路由 `/join`）。展示招新信息，并渲染
 * 由后端 form_schema 驱动的动态报名表单。不同活动的报名表单
 * 字段完全不同，前端通过通用 <DynamicForm> 组件自动适配。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/graphql/queries/events.queries.ts      : fetchActiveEvents()
 *   - lib/graphql/queries/siteConfig.queries.ts  : fetchJoinPageContent()
 *   - lib/graphql/mutations/registration.mutations.ts : submitRegistration()
 *   - lib/types/cms.types.ts                     : Event, JoinPageContent 类型
 *   - lib/types/form.types.ts                    : FormSchema, FormField 类型
 *   - components/sections/join/DynamicForm.tsx   : 动态表单渲染组件
 *   - components/shared/SectionHeader.tsx
 *   - components/shared/AnimatedSection.tsx
 *
 * 【导出 Metadata】
 * export const metadata: Metadata
 *   - title: "Join Us"
 *
 * 【函数】
 * export default async function JoinPage(): Promise<JSX.Element>
 *   - 并行调用 fetchActiveEvents() 和 fetchJoinPageContent()
 *   - 若无 active 活动，渲染"当前暂无开放报名"友好提示
 *   - 若有多个 active 活动，渲染活动选择器 Tab/Select
 *   - 将选中活动的 form_schema 传入 <DynamicForm>
 *   - 渲染各部门简介卡片区域（来自 pageContent）
 *
 * 【ISR 配置】
 * export const revalidate = 30
 *   - 报名活动状态变更较频繁，30 秒重验
 *
 * 【关键变量】
 * - activeEvents: Event[]          — 所有 status='active' 的活动
 * - selectedEvent: Event           — 当前选中活动（默认第一个）
 * - pageContent: JoinPageContent   — 招新文案、部门简介等
 */

export {}
