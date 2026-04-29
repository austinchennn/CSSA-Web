/**
 * ============================================================
 * FILE: backend/strapi/config/database.ts
 * ============================================================
 *
 * 【作用】
 * Strapi 数据库连接配置。指定使用 PostgreSQL 作为数据库，
 * 配置连接参数。所有敏感信息（host/port/user/password）
 * 从环境变量读取，禁止硬编码。
 *
 * 【依赖关系】
 * Used by:
 *   - Strapi 框架在启动时自动加载，建立 PostgreSQL 连接
 *   - 所有 Strapi Service 和 EntityService 通过此连接操作数据库
 *
 * 【配置内容】
 * export default ({ env }) => ({
 *   connection: {
 *     client: 'postgres',    — 使用 PostgreSQL（需安装 pg 包）
 *     connection: {
 *       host:     env('DATABASE_HOST', 'localhost'),
 *       port:     env.int('DATABASE_PORT', 5432),
 *       database: env('DATABASE_NAME', 'cssa_web'),
 *       user:     env('DATABASE_USERNAME', 'postgres'),
 *       password: env('DATABASE_PASSWORD', ''),
 *       ssl:      env.bool('DATABASE_SSL', false)
 *                 ? { rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true) }
 *                 : false,
 *     },
 *     acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
 *   },
 * })
 *
 * 【环境变量说明】
 * DATABASE_HOST     : 数据库主机（开发：localhost，生产：RDS 或 Supabase 地址）
 * DATABASE_PORT     : 数据库端口，默认 5432
 * DATABASE_NAME     : 数据库名称，建议：cssa_web_dev / cssa_web_prod
 * DATABASE_USERNAME : 数据库用户名
 * DATABASE_PASSWORD : 数据库密码（生产环境通过 CI/CD secret 注入）
 * DATABASE_SSL      : 生产环境通常为 true（Cloud 数据库要求）
 */

export {}
