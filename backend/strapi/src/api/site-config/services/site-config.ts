/**
 * site-config service
 *
 * 使用 Strapi 默认 Service 工厂，自动提供 find/update 方法。
 * 全站配置是 Single Type，无需 create/delete。
 */
import { factories } from '@strapi/strapi'

export default factories.createCoreService('api::site-config.site-config')
