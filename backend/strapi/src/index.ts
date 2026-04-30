/**
 * ============================================================
 * FILE: backend/strapi/src/index.ts
 * ============================================================
 *
 * 【作用】
 * Strapi 应用生命周期钩子入口。在此注册自定义 GraphQL resolver，
 * 将 extensions/graphql/resolvers.ts 中的实现合并到 Strapi 自动
 * 生成的 GraphQL Schema 中。
 *
 * 【依赖关系】
 * Imports from:
 *   - src/extensions/graphql/resolvers.ts : 自定义 resolver 实现
 *
 * Used by:
 *   - Strapi 框架在启动时自动调用 register() 钩子
 *
 * 【register 钩子】
 * - 时机：Strapi 加载插件之后、HTTP 服务启动之前
 * - 作用：向 GraphQL 插件的 extensionService 注册自定义 resolver
 * - extensionService.use({ resolvers }) 会将自定义 resolver 与
 *   shadowCRUD 自动生成的 resolver 合并，最终对外暴露统一的 GraphQL API
 */
import resolvers from './extensions/graphql/resolvers'

export default {
  register({ strapi }: { strapi: any }) {
    // 获取 GraphQL 插件的扩展服务
    const extensionService = strapi.plugin('graphql').service('extension')

    // 注册自定义 resolver，与 shadowCRUD 自动生成的合并
    extensionService.use({ resolvers })
  },
}
