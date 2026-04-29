/**
 * ============================================================
 * FILE: admin-frontend/lib/hooks/useMembers.ts
 * ============================================================
 *
 * 【作用】
 * 成员数据操作的 TanStack Query 自定义 Hooks 集合。
 * 封装 useQuery/useMutation，统一管理缓存键、乐观更新和 Toast 提示。
 *
 * 【依赖关系】
 * Imports from:
 *   - @tanstack/react-query   : useQuery, useMutation, useQueryClient
 *   - lib/api/members.api.ts  : getMembers, createMember, updateMember, deleteMember
 *   - sonner                  : toast
 *   - lib/types/admin.types.ts : Member, MemberFormData 类型
 *
 * Exported to / Used by:
 *   - app/(admin)/members/page.tsx
 *   - components/members/MemberTable.tsx
 *   - components/members/MemberDrawer.tsx
 *
 * 【Hooks】
 * export function useMembers(filters?: { search?: string; deptId?: string }): UseQueryResult<Member[]>
 *   - queryKey: ['members', filters]
 *   - queryFn: () => getMembers(filters)
 *   - staleTime: 30_000（30 秒内不重复请求）
 *
 * export function useCreateMember(): UseMutationResult
 *   - mutationFn: (data: MemberFormData) => createMember(data)
 *   - onSuccess: queryClient.invalidateQueries(['members'])，toast.success("成员添加成功")
 *   - onError: toast.error("添加失败：{error.message}")
 *
 * export function useUpdateMember(): UseMutationResult
 *   - mutationFn: ({ id, data }) => updateMember(id, data)
 *   - onSuccess: invalidateQueries(['members'])，toast.success("成员信息已更新")
 *   - onError: toast.error(...)
 *
 * export function useDeleteMember(): UseMutationResult
 *   - mutationFn: (id: string) => deleteMember(id)
 *   - onSuccess: invalidateQueries(['members'])，toast.success("成员已删除")
 *   - onError: toast.error(...)
 *
 * 【关键变量】
 * - MEMBERS_QUERY_KEY: string[] — ['members']，统一的缓存键
 */

export {}
