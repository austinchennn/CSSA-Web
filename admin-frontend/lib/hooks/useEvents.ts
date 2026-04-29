/**
 * ============================================================
 * FILE: admin-frontend/lib/hooks/useEvents.ts
 * ============================================================
 *
 * 【作用】
 * 活动数据操作的 TanStack Query 自定义 Hooks 集合。
 *
 * 【依赖关系】
 * Imports from:
 *   - @tanstack/react-query  : useQuery, useMutation, useQueryClient
 *   - lib/api/events.api.ts  : getEvents, getEventById, createEvent, updateEvent, updateEventStatus, deleteEvent
 *   - sonner                 : toast
 *   - lib/types/admin.types.ts : Event, EventFormData, EventStatus 类型
 *
 * Exported to / Used by:
 *   - app/(admin)/events/page.tsx
 *   - app/(admin)/events/new/page.tsx
 *   - app/(admin)/events/[id]/page.tsx
 *
 * 【Hooks】
 * export function useEvents(status?: EventStatus): UseQueryResult<Event[]>
 *   - queryKey: ['events', { status }]
 *   - queryFn: () => getEvents(status)
 *
 * export function useEvent(id: string): UseQueryResult<Event>
 *   - queryKey: ['events', id]
 *   - queryFn: () => getEventById(id)
 *   - enabled: !!id（id 存在时才请求）
 *
 * export function useCreateEvent(): UseMutationResult
 *   - mutationFn: createEvent
 *   - onSuccess: invalidateQueries(['events'])，toast.success("活动发布成功！")
 *
 * export function useUpdateEventStatus(): UseMutationResult
 *   - mutationFn: ({ id, status }) => updateEventStatus(id, status)
 *   - onSuccess: invalidateQueries(['events', id])
 *   - 用于报名详情页的 Toggle Switch 开关
 *
 * export function useDeleteEvent(): UseMutationResult
 *   - mutationFn: deleteEvent
 *   - onSuccess: invalidateQueries(['events'])，toast.success("活动已删除")
 */

export {}
