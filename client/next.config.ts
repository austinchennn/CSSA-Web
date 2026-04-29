/**
 * ============================================================
 * FILE: client/next.config.ts
 * ============================================================
 *
 * 【作用】
 * Next.js 框架核心配置文件。配置图片域名白名单、环境变量暴露、
 * 重定向规则和性能优化选项。
 *
 * 【关键配置项说明】
 *
 * images.remotePatterns
 *   - 添加 Strapi 服务器域名（开发：localhost:1337，生产：实际域名）
 *   - 允许 next/image 组件从这些域名加载图片并进行优化
 *   - 格式：{ protocol: 'http', hostname: 'localhost', port: '1337', pathname: '/uploads/**' }
 *
 * images.formats
 *   - ['image/avif', 'image/webp'] — 优先输出现代格式，降低图片体积
 *
 * experimental.typedRoutes
 *   - true — 开启 Next.js 类型安全路由（Link href 会有 TypeScript 检查）
 *
 * env
 *   - 将 NEXT_PUBLIC_* 环境变量透传给客户端 bundle
 *   - NEXT_PUBLIC_STRAPI_URL: Strapi 服务器地址
 *   - NEXT_PUBLIC_GRAPHQL_ENDPOINT: GraphQL 端点完整 URL
 *   - NEXT_PUBLIC_SITE_URL: 生产环境站点域名（用于 SEO canonical URL）
 *
 * headers（可选）
 *   - 为所有页面添加安全响应头：
 *       X-Frame-Options: DENY
 *       X-Content-Type-Options: nosniff
 *       Referrer-Policy: strict-origin-when-cross-origin
 */

export {}
