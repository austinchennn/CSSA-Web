/**
 * ============================================================
 * FILE: admin-frontend/lib/api/registrations.api.ts
 * ============================================================
 *
 * 【作用】
 * 活动报名记录（Registrations）查询和审批操作 API 函数集合。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/api/client.ts        : apiRequest
 *   - lib/types/admin.types.ts : Registration, RegistrationStatus 类型
 *
 * Exported to / Used by:
 *   - lib/hooks/useRegistrations.ts
 *
 * 【函数】
 * export async function getRegistrationsByEvent(eventId: string): Promise<Registration[]>
 *   - GET /api/registrations?filters[event][id][$eq]={eventId}&sort=createdAt:desc
 *   - 返回该活动的所有报名记录，userInfo 字段为 JSON 对象
 *
 * export async function getMonthlyRegistrationsCount(): Promise<number>
 *   - 查询本月（createdAt >= 月初 && createdAt <= 月末）的报名总数
 *   - 用于仪表盘统计卡片
 *
 * export async function updateRegistrationStatus(
 *   id: string,
 *   status: RegistrationStatus
 * ): Promise<Registration>
 *   - PUT /api/registrations/{id}，body: { data: { status } }
 *   - 用于审批操作：pending → confirmed / cancelled
 *
 * export async function deleteRegistration(id: string): Promise<void>
 *   - DELETE /api/registrations/{id}（管理员手动清理用，谨慎使用）
 */

export {}
