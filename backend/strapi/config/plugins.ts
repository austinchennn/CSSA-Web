/**
 * ============================================================
 * FILE: backend/strapi/config/plugins.ts
 * ============================================================
 *
 * 【作用】
 * Strapi 插件配置文件。启用和配置 GraphQL、Upload、i18n 等插件。
 *
 * 【依赖关系】
 * Used by:
 *   - Strapi 框架在启动时自动加载，激活对应插件
 *
 * 【配置内容】
 * export default ({ env }) => ({
 *
 *   graphql: {
 *     enabled: true,          — 启用 GraphQL 插件（前台使用 GraphQL 查询）
 *     config: {
 *       endpoint: '/graphql', — GraphQL 端点路径
 *       shadowCRUD: true,     — 自动为所有内容类型生成 CRUD GraphQL 操作
 *       playgroundAlwaysEnable: false,  — 生产环境关闭 Playground（安全）
 *       depthLimit: 7,        — GraphQL 查询深度限制，防止恶意深层嵌套查询
 *       amountLimit: 100,     — 单次查询最多返回 100 条记录
 *     }
 *   },
 *
 *   upload: {
 *     enabled: true,          — 启用文件上传插件
 *     config: {
 *       sizeLimit: 10 * 1024 * 1024,   — 单文件最大 10MB
 *       provider: 'local',              — 开发环境使用本地存储
 *       // 生产环境切换为 S3/Cloudinary：
 *       // provider: '@strapi/provider-upload-aws-s3',
 *       // providerOptions: { s3Options: { ... } }
 *     }
 *   },
 *
 * })
 *
 * 【生产环境注意】
 * - playgroundAlwaysEnable 必须为 false
 * - upload provider 建议切换为云存储（AWS S3 或 Cloudinary）
 * - depthLimit 和 amountLimit 根据实际业务需求调整，但不要过大
 */

export {}
