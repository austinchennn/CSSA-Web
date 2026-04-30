/**
 * 数据库连接配置
 *
 * 使用 PostgreSQL 作为数据库。所有敏感信息从环境变量读取，
 * 严禁硬编码密码。开发环境默认连接本地 Docker 容器。
 */
export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host:     env('DATABASE_HOST',     'localhost'),
      port:     env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME',     'cssa_web_dev'),
      user:     env('DATABASE_USERNAME', 'postgres'),
      password: env('DATABASE_PASSWORD', 'postgres'),
      // 生产环境设置 DATABASE_SSL=true，本地开发无需 SSL
      ssl: env.bool('DATABASE_SSL', false)
        ? { rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true) }
        : false,
    },
    // 连接池：min 保持常驻连接避免冷启动，max 防止连接数耗尽
    pool: { min: 2, max: 10 },
    acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
  },
})
