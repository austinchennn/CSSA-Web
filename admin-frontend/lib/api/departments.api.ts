/**
 * ============================================================
 * FILE: admin-frontend/lib/api/departments.api.ts
 * ============================================================
 *
 * 【作用】
 * 部门（Departments）CRUD 操作 API 函数集合。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/api/client.ts        : apiRequest
 *   - lib/types/admin.types.ts : Department, DepartmentFormData 类型
 *
 * Exported to / Used by:
 *   - lib/hooks/useDepartments.ts
 *
 * 【函数】
 * export async function getDepartments(): Promise<Department[]>
 *   - GET /api/departments?sort=name:asc
 *   - 同时统计每个部门的成员数（populate: members count）
 *
 * export async function createDepartment(data: DepartmentFormData): Promise<Department>
 *   - POST /api/departments，body: { data: { name, leader_name, introduction } }
 *
 * export async function updateDepartment(id: string, data: Partial<DepartmentFormData>): Promise<Department>
 *   - PUT /api/departments/{id}
 *
 * export async function deleteDepartment(id: string): Promise<void>
 *   - DELETE /api/departments/{id}
 *   - 注意：若部门下有成员，Strapi 层会报错（依赖关系约束），
 *     前端应先检查成员数量，有成员时阻止删除并给出提示
 */

export {}
