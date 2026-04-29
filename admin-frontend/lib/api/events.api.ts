/**
 * ============================================================
 * FILE: admin-frontend/lib/api/events.api.ts
 * ============================================================
 *
 * 【作用】
 * 活动（Events）CRUD 操作 API 函数集合。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/api/client.ts        : apiRequest
 *   - lib/types/admin.types.ts : Event, EventFormData 类型
 *
 * Exported to / Used by:
 *   - lib/hooks/useEvents.ts
 *
 * 【函数】
 * export async function getEvents(status?: EventStatus): Promise<Event[]>
 *   - GET /api/events?sort=start_time:desc
 *   - 若 status 存在：追加 &filters[status][$eq]={status}
 *
 * export async function getEventById(id: string): Promise<Event>
 *   - GET /api/events/{id}
 *   - 返回含 formSchema（JSON 自动解析）的完整活动数据
 *
 * export async function getActiveEventsCount(): Promise<number>
 *   - GET /api/events?filters[status][$eq]=active&pagination[pageSize]=1
 *   - 返回 meta.pagination.total
 *
 * export async function createEvent(data: EventFormData): Promise<Event>
 *   - POST /api/events，body: { data: { title, start_time, capacity, form_schema, status: 'upcoming' } }
 *   - form_schema 传递时为 JSON 对象（Strapi 自动序列化存储）
 *
 * export async function updateEvent(id: string, data: Partial<EventFormData>): Promise<Event>
 *   - PUT /api/events/{id}
 *
 * export async function updateEventStatus(id: string, status: EventStatus): Promise<Event>
 *   - PUT /api/events/{id}，body: { data: { status } }
 *   - 用于一键开启/关闭报名通道
 *
 * export async function deleteEvent(id: string): Promise<void>
 *   - DELETE /api/events/{id}
 */

export {}
