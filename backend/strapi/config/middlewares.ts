/**
 * Strapi 中间件配置
 *
 * 关键配置：CORS 允许前台（3000）和后台（3001）跨域请求。
 * 如果不配置 CORS，浏览器会拦截所有来自前端的请求。
 */
export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src':     ["'self'", 'data:', 'blob:'],
          'media-src':   ["'self'", 'data:', 'blob:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      // filter(Boolean) 过滤未设置的环境变量，避免传入 undefined 导致 CORS 异常
      origin: [
        'http://localhost:3000',         // 本地客户端前台
        'http://localhost:3001',         // 本地后台前端
        process.env.CLIENT_URL,         // 生产客户端前台域名
        process.env.ADMIN_FRONTEND_URL, // 生产后台前端域名
      ].filter(Boolean) as string[],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      formLimit: '256kb',
      jsonLimit: '256kb',
      textLimit: '256kb',
      formidable: {
        maxFileSize: 10 * 1024 * 1024, // 上传文件限制 10MB，与 upload 插件保持一致
      },
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
]
