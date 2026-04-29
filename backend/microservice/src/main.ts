/**
 * ============================================================
 * FILE: backend/microservice/src/main.ts
 * ============================================================
 *
 * 【作用】
 * NestJS 微服务的应用入口文件（Bootstrap）。创建 NestJS 应用实例，
 * 配置全局中间件（CORS、全局前缀、全局异常过滤器）并启动 HTTP 服务器。
 *
 * 【依赖关系】
 * Imports from:
 *   - @nestjs/core          : NestFactory
 *   - src/app.module.ts     : AppModule（根模块）
 *   - src/common/filters/http-exception.filter.ts : 全局异常过滤器
 *
 * Used by:
 *   - Node.js 进程入口，被 `npm run start:dev` 执行
 *
 * 【Bootstrap 函数逻辑】
 * async function bootstrap(): Promise<void>
 *   - const app = await NestFactory.create(AppModule)
 *   - 全局异常过滤器：app.useGlobalFilters(new HttpExceptionFilter())
 *   - 全局 API 前缀：app.setGlobalPrefix('api/v1')（所有路由以 /api/v1 开头）
 *   - CORS 配置：
 *       origin: [process.env.CLIENT_URL, process.env.ADMIN_FRONTEND_URL]
 *       methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
 *       credentials: true
 *   - 端口：process.env.PORT || 3001（不与 Next.js 的 3000 冲突）
 *   - await app.listen(port)
 *   - console.log('Microservice running on port:', port)
 *
 * 【关键变量】
 * - port: number — process.env.PORT || 3001
 */

export {}
