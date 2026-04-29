/**
 * ============================================================
 * FILE: backend/strapi/config/middlewares.ts
 * ============================================================
 *
 * 【作用】
 * Strapi 中间件配置。配置 CORS、安全头、请求体大小限制等。
 * CORS 配置尤为重要：需要允许前台域名和后台域名的跨域请求。
 *
 * 【配置内容】
 * export default [
 *   'strapi::logger',       — 请求日志中间件
 *   'strapi::errors',       — 错误处理中间件
 *   {
 *     name: 'strapi::security',
 *     config: {
 *       contentSecurityPolicy: {
 *         useDefaults: true,
 *         directives: {
 *           'connect-src': ["'self'", 'https:'],
 *           'img-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],  — 若使用 Cloudinary
 *           'media-src': ["'self'", 'data:', 'blob:'],
 *           upgradeInsecureRequests: null,
 *         },
 *       },
 *     },
 *   },
 *   {
 *     name: 'strapi::cors',
 *     config: {
 *       enabled: true,
 *       headers: '*',
 *       origin: [
 *         'http://localhost:3000',    — 本地客户端前台
 *         'http://localhost:3001',    — 本地后台前端
 *         process.env.CLIENT_URL,    — 生产客户端前台域名
 *         process.env.ADMIN_URL,     — 生产后台前端域名
 *       ],
 *     },
 *   },
 *   'strapi::poweredBy',    — 可以关闭（安全建议）
 *   'strapi::query',
 *   {
 *     name: 'strapi::body',
 *     config: {
 *       formLimit: '256kb',
 *       jsonLimit: '256kb',
 *       textLimit: '256kb',
 *       formidable: {
 *         maxFileSize: 10 * 1024 * 1024,  — 上传文件限制 10MB
 *       },
 *     },
 *   },
 *   'strapi::session',
 *   'strapi::favicon',
 *   'strapi::public',
 * ]
 */

export {}
