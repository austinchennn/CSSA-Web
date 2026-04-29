/**
 * ============================================================
 * FILE: admin-frontend/lib/api/pastEvents.api.ts
 * ============================================================
 *
 * 【作用】
 * 往期活动（Past_Events）CRUD 操作 API 函数集合。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/api/client.ts        : apiRequest
 *   - lib/types/admin.types.ts : PastEvent, PastEventFormData 类型
 *
 * Exported to / Used by:
 *   - app/(admin)/past-events/page.tsx（直接调用，或通过自定义 hook）
 *
 * 【函数】
 * export async function getPastEvents(): Promise<PastEvent[]>
 *   - GET /api/past-events?sort=event_date:desc&populate=photo
 *
 * export async function createPastEvent(data: PastEventFormData): Promise<PastEvent>
 *   - POST /api/past-events，body: { data: { event_name, introduction, event_date, photo: photoId } }
 *   - photo 传 Strapi media ID
 *
 * export async function updatePastEvent(id: string, data: Partial<PastEventFormData>): Promise<PastEvent>
 *   - PUT /api/past-events/{id}
 *
 * export async function deletePastEvent(id: string): Promise<void>
 *   - DELETE /api/past-events/{id}
 */

export {}
