/**
 * ============================================================
 * FILE: backend/strapi/src/api/member/controllers/member.ts
 * ============================================================
 *
 * 【作用】
 * Members 内容类型控制器。继承 Strapi 默认 CRUD。
 * 前台 GraphQL 请求时会自动 populate department 关联字段。
 *
 * 【默认路由】
 * GET    /api/members         → find()
 *   - 常用参数：?populate=department&sort=order:desc
 *   - 可加 &filters[department][id][$eq]={id} 按部门筛选
 * GET    /api/members/:id     → findOne()
 * POST   /api/members         → create()（需上传 photo，经 Strapi Media 处理）
 * PUT    /api/members/:id     → update()
 * DELETE /api/members/:id     → delete()
 *   - 删除后前端数组长度变化，对应 MemberCard 自动 unmount
 *
 * 【权限配置】
 * - Public：find, findOne（前台展示用）
 * - Authenticated：create, update, delete
 *
 * 【GraphQL 注意】
 * - 前台使用 GraphQL query，Strapi GraphQL 插件自动根据 schema.json 生成类型和 resolver
 * - populate 在 GraphQL 中通过嵌套字段选择实现（无需额外配置）
 */

export {}
