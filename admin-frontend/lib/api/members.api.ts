/**
 * ============================================================
 * FILE: admin-frontend/lib/api/members.api.ts
 * ============================================================
 *
 * 【作用】
 * 成员（Members）CRUD 操作 API 函数集合。封装所有与 Strapi Members
 * 内容类型相关的 REST 请求，供 TanStack Query hooks 调用。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/api/client.ts      : apiRequest
 *   - lib/types/admin.types.ts : Member, MemberFormData 类型
 *
 * Exported to / Used by:
 *   - lib/hooks/useMembers.ts : 所有成员操作 hooks
 *
 * 【函数】
 * export async function getMembers(params?: { search?: string; deptId?: string }): Promise<Member[]>
 *   - GET /api/members?populate=department&sort=order:desc
 *   - 若 params.search 存在：追加 &filters[name][$contains]={search}
 *   - 若 params.deptId 存在：追加 &filters[department][id][$eq]={deptId}
 *   - 返回展平后的 Member[] 数组
 *
 * export async function getMembersCount(): Promise<number>
 *   - GET /api/members?pagination[pageSize]=1（仅获取 total）
 *   - 返回 response.meta.pagination.total
 *
 * export async function createMember(data: MemberFormData): Promise<Member>
 *   - POST /api/members，body: { data: { name, title, department: deptId, order, photo: photoId } }
 *   - 注意：photo 字段传 Strapi media ID（先通过 uploadMedia 上传获取 ID）
 *
 * export async function updateMember(id: string, data: Partial<MemberFormData>): Promise<Member>
 *   - PUT /api/members/{id}，body: { data: {...} }
 *
 * export async function deleteMember(id: string): Promise<void>
 *   - DELETE /api/members/{id}
 */

export {}
