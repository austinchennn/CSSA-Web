/**
 * site-config controller
 *
 * 全站配置 Single Type，使用默认 Controller。
 * GET /api/site-config  → 前台读取首页文案和联系方式
 * PUT /api/site-config  → 管理员更新配置（需 Authenticated 权限）
 */
import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::site-config.site-config')
