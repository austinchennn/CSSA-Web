/**
 * past-event controller
 *
 * 往期活动只读展示，使用 Strapi 默认 Controller。
 * 管理员在 Admin UI 中录入数据，前台通过 GraphQL 查询。
 */
import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::past-event.past-event')
