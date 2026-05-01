/**
 * ============================================================
 * FILE: backend/strapi/src/api/site-config/controllers/site-config.ts
 * ============================================================
 *
 * 【作用】
 * Site_Configs 内容类型的控制器（Controller）。Strapi 自动为每个
 * 内容类型生成 CRUD 控制器，此文件可扩展默认行为（如添加自定义鉴权、
 * 数据转换或额外校验逻辑）。
 *
 * 【依赖关系】
 * Imports from:
 *   - @strapi/strapi : factories.createCoreController
 *
 * Used by:
 *   - backend/strapi/src/api/site-config/routes/site-config.ts : 路由映射到此控制器
 *
 * 【默认生成的 CRUD 操作（来自 createCoreController）】
 * find(ctx): Promise<void>
 *   - GET /api/site-configs
 *   - 返回所有配置项列表（前台和后台都会调用）
 *   - 可在此覆盖添加缓存头：ctx.set('Cache-Control', 'public, max-age=300')
 *
 * findOne(ctx): Promise<void>
 *   - GET /api/site-configs/{id}
 *   - 按 ID 查单条配置
 *
 * create(ctx): Promise<void>
 *   - POST /api/site-configs（仅后台管理员可调用，需要 Roles 权限控制）
 *
 * update(ctx): Promise<void>
 *   - PUT /api/site-configs/{id}
 *
 * delete(ctx): Promise<void>
 *   - DELETE /api/site-configs/{id}
 *
 * 【扩展逻辑（如有）】
 * - 可在 find() 中添加"按 key 前缀分组"的响应转换
 * - 可限制 Public 角色只能 find（不能 create/update/delete）
 */

import { factories } from '@strapi/strapi'
export default factories.createCoreController('api::site-config.site-config')
