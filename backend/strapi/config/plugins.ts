/**
 * Strapi 插件配置
 *
 * 启用 GraphQL 和 Upload 插件。
 * GraphQL 的 shadowCRUD 让前端可以直接用 GraphQL 查询所有内容类型，
 * 无需手写 resolver。
 */
export default ({ env }) => ({
  graphql: {
    enabled: true,
    config: {
      endpoint: '/graphql',
      // 自动为所有 Content Type 生成 GraphQL CRUD 操作
      shadowCRUD: true,
      // 开发环境开启 Playground，生产环境关闭（防止 schema 泄露）
      playgroundAlwaysEnable: env('NODE_ENV') !== 'production',
      // 防止恶意深层嵌套查询（如 a{b{c{d{e{f{g}}}}}}）耗尽 CPU
      depthLimit: 7,
      // 单次最多返回 100 条，防止全量拉取导致 OOM
      amountLimit: 100,
    },
  },
  upload: {
    enabled: true,
    config: {
      sizeLimit: 10 * 1024 * 1024, // 单文件最大 10MB
      provider: 'local',           // 开发：本地磁盘；生产替换为 S3 或 Cloudinary
    },
  },
})
