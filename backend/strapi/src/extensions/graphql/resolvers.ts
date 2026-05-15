/**
 * ============================================================
 * FILE: backend/strapi/src/extensions/graphql/resolvers.ts
 * ============================================================
 *
 * 【作用】
 * 自定义 GraphQL resolver 实现。Strapi GraphQL 插件通过 shadowCRUD 自动
 * 生成所有 Content Type 的基础 Query/Mutation resolver，此文件只需实现
 * schema.graphql 中额外扩展的自定义 Query。
 *
 * 【依赖关系】
 * Used by:
 *   - src/index.ts : 通过 extensionService.use({ resolvers }) 注册
 *
 * 【当前实现的 resolver】
 * Query.registrationCountByEvent(eventId: ID!): Int
 *   - 统计指定活动的有效报名数（status != 'cancelled'）
 *   - 对应 schema.graphql 中的 extend type Query 定义
 */

export default {
  Query: {
    registrationCountByEvent: async (
      _parent: unknown,
      args: { eventId: string },
      context: { strapi: any }
    ): Promise<number> => {
      const { eventId } = args

      // 只统计未取消的报名，已取消的不占用名额显示
      const count = await context.strapi.entityService.count(
        'api::registration.registration',
        {
          filters: {
            event: { id: eventId },
            status: { $ne: 'cancelled' },
          },
        }
      )

      return count as number
    },
  },
}
