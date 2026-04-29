/**
 * ============================================================
 * FILE: client/lib/graphql/mutations/registration.mutations.ts
 * ============================================================
 *
 * 【作用】
 * 活动报名（Registrations）的 GraphQL Mutation。
 * 封装表单提交逻辑，将用户填写的 userInfo 数据发送至后端，
 * 经过微服务防刷校验后写入 Registrations 表。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/graphql/client.ts   : gqlFetch（使用 cache: 'no-store' 选项）
 *   - lib/types/cms.types.ts  : Registration 类型
 *   - lib/types/form.types.ts : FormValues 类型
 *
 * Exported to / Used by:
 *   - components/sections/join/DynamicForm.tsx : 表单提交调用
 *   - app/contact/page.tsx                     : 联系表单提交（如启用）
 *
 * 【Interface 定义】
 * interface SubmitRegistrationInput
 *   - eventId: string          — 活动 ID
 *   - userInfo: FormValues      — 动态表单的填写数据（Record<string, string | number>）
 *
 * interface SubmitRegistrationResult
 *   - success: boolean
 *   - registrationId?: string
 *   - error?: string
 *
 * 【GraphQL Mutation 常量】
 * const CREATE_REGISTRATION_MUTATION: string
 *   - 变量：$eventId: ID!, $userInfo: JSON!
 *   - 操作：createRegistration(data: { event: $eventId, user_info: $userInfo, status: "pending" })
 *   - 返回字段：data { id, attributes { status } }
 *
 * 【函数】
 * export async function submitRegistration(input: SubmitRegistrationInput): Promise<SubmitRegistrationResult>
 *   - 使用 cache: 'no-store' 确保不缓存（每次实时提交）
 *   - 调用 gqlFetch(CREATE_REGISTRATION_MUTATION, { eventId, userInfo })
 *   - 成功时返回 { success: true, registrationId }
 *   - 失败时捕获错误，返回 { success: false, error: errorMessage }
 *   - 注意：实际流量会先经过 NestJS 微服务的 Rate Limit 拦截（在 API 层配置）
 */

export {}
