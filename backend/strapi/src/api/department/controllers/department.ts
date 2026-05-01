/**
 * department controller
 *
 * 使用 Strapi 默认 Controller，标准 CRUD 已满足所有需求。
 * 前台通过 GraphQL 查询部门列表，无需自定义逻辑。
 */
import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::department.department')
