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
 *
 * Used by:
 *   - Node.js 进程入口，被 `npm run start:dev` 执行
 *
 * 【Bootstrap 函数逻辑】
 * async function bootstrap(): Promise<void>
 *   - const app = await NestFactory.create(AppModule)
 *   - 全局 ValidationPipe：自动校验请求体，不合规返回 400
 *   - 全局 API 前缀：app.setGlobalPrefix('api/v1')（所有路由以 /api/v1 开头）
 *   - CORS 配置：
 *       origin: [process.env.CLIENT_URL, process.env.ADMIN_FRONTEND_URL]
 *       methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
 *       credentials: true
 *   - 端口：process.env.PORT || 3002（不与 Next.js 的 3000 和 Strapi 的 1337 冲突）
 *   - await app.listen(port)
 *
 * 【关键变量】
 * - port: number — process.env.PORT || 3002
 */
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // 所有路由统一加 /api/v1 前缀
  app.setGlobalPrefix('api/v1')

  // 自动校验请求体（class-validator 装饰器），whitelist 过滤掉 DTO 未声明的字段
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  // CORS：只允许来自前台和后台前端的跨域请求
  app.enableCors({
    origin: [
      process.env.CLIENT_URL || 'http://localhost:3000',
      process.env.ADMIN_FRONTEND_URL || 'http://localhost:3001',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  })

  const port = process.env.PORT || 3002
  await app.listen(port)
  console.log(`微服务已启动，端口：${port}`)
}

bootstrap()
