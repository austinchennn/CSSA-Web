/**
 * ============================================================
 * FILE: admin-frontend/lib/hooks/useRegistrations.ts
 * ============================================================
 *
 * 【作用】
 * 报名记录操作的 TanStack Query 自定义 Hooks 集合。
 *
 * 【依赖关系】
 * Imports from:
 *   - @tanstack/react-query          : useQuery, useMutation, useQueryClient
 *   - lib/api/registrations.api.ts   : getRegistrationsByEvent, updateRegistrationStatus
 *   - sonner                         : toast
 *   - lib/types/admin.types.ts       : Registration, RegistrationStatus 类型
 *
 * Exported to / Used by:
 *   - app/(admin)/events/[id]/page.tsx
 *
 * 【Hooks】
 * export function useRegistrations(eventId: string): UseQueryResult<Registration[]>
 *   - queryKey: ['registrations', eventId]
 *   - queryFn: () => getRegistrationsByEvent(eventId)
 *   - refetchInterval: 30_000（每 30 秒自动刷新，实时感知新报名）
 *   - enabled: !!eventId
 *
 * export function useUpdateRegistrationStatus(): UseMutationResult
 *   - mutationFn: ({ id, status }) => updateRegistrationStatus(id, status)
 *   - onSuccess: 乐观更新缓存（直接修改缓存中对应 registration.status）
 *       使用 queryClient.setQueryData(['registrations', eventId], ...) 实现
 *   - onError: 回滚缓存，toast.error(...)
 *   - 乐观更新原因：审批操作频繁，避免每次都等待网络请求刷新
 */

export {}
