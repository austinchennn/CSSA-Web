/**
 * site-config router
 *
 * Single Type 的路由只有 find 和 update，Strapi 核心路由工厂自动生成。
 * GET  /api/site-config   → find()
 * PUT  /api/site-config   → update()
 */
import { factories } from '@strapi/strapi'

export default factories.createCoreRouter('api::site-config.site-config')
