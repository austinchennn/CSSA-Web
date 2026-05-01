/**
 * ============================================================
 * FILE: backend/strapi/src/api/department/controllers/department.ts
 * ============================================================
 *
 * 【作用】
 * Departments 内容类型控制器。继承 Strapi 默认 CRUD，
 * 可扩展添加"按部门聚合成员数量"的统计接口。
 *
 * 【默认路由】
 * GET    /api/departments         → find()（含 populate=members 可统计人数）
 * GET    /api/departments/:id     → findOne()
 * POST   /api/departments         → create()（仅管理员）
 * PUT    /api/departments/:id     → update()
 * DELETE /api/departments/:id     → delete()
 *   - 删除前需校验：若 department 有关联 members，Strapi 关系约束会阻止删除
 *     或在 Service 层显式检查并返回友好错误
 *
 * 【权限配置】
 * - Public：find, findOne（前台和后台公开读取）
 * - Authenticated（管理员）：create, update, delete
 */

import { factories } from '@strapi/strapi'
export default factories.createCoreController('api::department.department')
