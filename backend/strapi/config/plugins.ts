// Strapi 插件配置
// 启用 GraphQL（供前台查询）和文件上传插件

export default ({ env }: { env: (key: string, fallback?: unknown) => unknown }) => ({

  // GraphQL 插件：前台用 GraphQL 查询 CMS 数据
  graphql: {
    enabled: true,
    config: {
      endpoint: '/graphql',             // GraphQL 请求路径
      shadowCRUD: true,                 // 自动为所有 Content Type 生成 CRUD 操作
      playgroundAlwaysEnable: env('NODE_ENV') !== 'production', // 生产环境关闭 Playground
      depthLimit: 7,                    // 查询深度限制，防止恶意深层嵌套
      amountLimit: 100,                 // 单次查询最多返回 100 条
      apolloServer: {
        tracing: false,                 // 关闭 tracing，减少响应体积
      },
    },
  },

  // 文件上传插件：成员头像、活动封面图上传
  upload: {
    enabled: true,
    config: {
      sizeLimit: 10 * 1024 * 1024,     // 单文件限制 10MB
      provider: 'local',               // 开发环境存本地；生产环境改为 S3/Cloudinary
    },
  },

})
