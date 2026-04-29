/**
 * ============================================================
 * FILE: admin-frontend/lib/hooks/useDepartments.ts
 * ============================================================
 *
 * 【作用】
 * 部门数据操作的 TanStack Query 自定义 Hooks 集合。
 * 部门数据在后台被多处共享（成员表单的部门 Select、部门管理页等），
 * 通过 TanStack Query 缓存避免重复请求。
 *
 * 【依赖关系】
 * Imports from:
 *   - @tanstack/react-query       : useQuery, useMutation, useQueryClient
 *   - lib/api/departments.api.ts  : getDepartments, createDepartment, updateDepartment, deleteDepartment
 *   - sonner                      : toast
 *   - lib/types/admin.types.ts    : Department, DepartmentFormData 类型
 *
 * Exported to / Used by:
 *   - components/members/MemberForm.tsx    : 部门 Select 的选项数据
 *   - app/(admin)/departments/page.tsx     : 部门 CRUD 操作
 *   - app/(admin)/members/page.tsx         : 部门筛选 Dropdown
 *
 * 【Hooks】
 * export function useDepartments(): UseQueryResult<Department[]>
 *   - queryKey: ['departments']
 *   - queryFn: getDepartments
 *   - staleTime: 60_000（部门数据变更频率低，60 秒内不重新请求）
 *
 * export function useCreateDepartment(): UseMutationResult
 *   - onSuccess: invalidateQueries(['departments'])
 *
 * export function useUpdateDepartment(): UseMutationResult
 *
 * export function useDeleteDepartment(): UseMutationResult
 *   - onError: 处理"部门下有成员，无法删除"的特殊错误信息
 *   - toast.error("删除失败：该部门下仍有成员，请先移除所有成员")
 */

export {}
