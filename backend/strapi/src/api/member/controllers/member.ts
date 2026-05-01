/**
 * member controller
 *
 * 使用 Strapi 默认 Controller。
 * 前台通过 GraphQL populate department 字段获取成员所属部门，默认实现已支持。
 */
import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::member.member')
