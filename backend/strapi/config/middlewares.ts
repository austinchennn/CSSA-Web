/**
 * Strapi 中间件配置
 *
 * 关键配置：CORS 允许前台（3000）和后台（3001）跨域请求。
 * 如果不配置 CORS，浏览器会拦截所有来自前端的请求。
 */

// CORS 必须允许前台（3000）和后台（3001）的跨域请求，否则浏览器会拦截
export default [
  'strapi::logger',       // 请求日志
  'strapi::errors',       // 统一错误处理

  // 安全头配置
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          // 允许从本地和 Cloudinary 加载图片（生产环境使用 Cloudinary 时需要）
          'img-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
          'media-src': ["'self'", 'data:', 'blob:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },

  // CORS：必须显式列出允许的来源，否则前台请求会被浏览器拦截
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      // filter(Boolean) 过滤未设置的环境变量，避免传入 undefined 导致 CORS 异常
      origin: [
        'http://localhost:3000',           // 本地客户端前台
        'http://localhost:3001',           // 本地后台前端
        process.env.CLIENT_URL,           // 生产客户端域名（如 https://cssa.com）
        process.env.ADMIN_FRONTEND_URL,   // 生产后台域名
      ].filter(Boolean) as string[],
    },
  },

  'strapi::poweredBy',
  'strapi::query',

  // 请求体大小限制
  {
    name: 'strapi::body',
    config: {
      formLimit: '256kb',
      jsonLimit: '256kb',
      textLimit: '256kb',
      formidable: {
        maxFileSize: 10 * 1024 * 1024,    // 文件上传限制 10MB，与 upload 插件保持一致
      },
    },
  },

  'strapi::session',
  'strapi::favicon',
  'strapi::public',
]
