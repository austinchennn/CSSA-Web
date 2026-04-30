// Strapi 数据库连接配置
// 所有敏感信息从环境变量读取，禁止硬编码密码

export default ({ env }: { env: (key: string, fallback?: unknown) => unknown }) => ({
  connection: {
    client: 'postgres',           // 使用 PostgreSQL 驱动
    connection: {
      host:     env('DATABASE_HOST',     'localhost'),    // 数据库主机
      port:     env('DATABASE_PORT',     5432),           // 默认端口 5432
      database: env('DATABASE_NAME',     'cssa_web_dev'), // 数据库名
      user:     env('DATABASE_USERNAME', 'postgres'),     // 用户名
      password: env('DATABASE_PASSWORD', 'postgres'),     // 密码（生产环境通过 CI/CD 注入）
      ssl: env('DATABASE_SSL', false)
        ? { rejectUnauthorized: env('DATABASE_SSL_REJECT_UNAUTHORIZED', true) }
        : false,                  // 生产环境开启 SSL，本地开发关闭
    },
    acquireConnectionTimeout: env('DATABASE_CONNECTION_TIMEOUT', 60000), // 连接超时 60s
    pool: {
      min: 2,                     // 连接池最小连接数
      max: 10,                    // 连接池最大连接数，避免数据库过载
    },
  },
})
