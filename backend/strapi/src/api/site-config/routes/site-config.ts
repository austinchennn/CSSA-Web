/**
 * ============================================================
 * FILE: backend/strapi/src/api/site-config/routes/site-config.ts
 * ============================================================
 *
 * 【作用】
 * Site_Configs 内容类型的路由配置。Strapi 自动为每个内容类型生成
 * 标准 CRUD 路由，此文件可添加自定义路由（如按 key 查询的特殊接口）。
 *
 * 【依赖关系】
 * Used by:
 *   - Strapi 框架自动加载，映射到 site-config 控制器的对应方法
 *
 * 【自动生成的标准路由】
 * GET    /api/site-configs         → controller.find()
 * GET    /api/site-configs/:id     → controller.findOne()
 * POST   /api/site-configs         → controller.create()
 * PUT    /api/site-configs/:id     → controller.update()
 * DELETE /api/site-configs/:id     → controller.delete()
 *
 * 【自定义路由扩展（可选）】
 * GET /api/site-configs/key/:key
 *   - 按 key 字段精确查询单条配置
 *   - 比按 ID 查询更语义化，前端可直接用 key 名获取配置值
 *   - 需在 controller 中添加对应 findByKey() 方法
 *
 * 【权限配置说明】
 * - 在 Strapi Admin → Settings → Roles 中配置：
 *     Public 角色：允许 find、findOne（前台读取）
 *     Authenticated 角色（管理员）：允许全部 CRUD
 * - 此路由文件本身不处理权限，权限在 Strapi Roles 设置中控制
 */

export {}
