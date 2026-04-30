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
 * 【关键变量】
 * - port: number — process.env.PORT || 3002（不与 Next.js 3000/3001 冲突）
 */

import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  // 全局路由前缀：所有接口以 /api/v1 开头
  app.setGlobalPrefix('api/v1')

  // 全局请求体校验：DTO 上的装饰器（class-validator）自动生效
  // whitelist: true 表示自动剥离 DTO 中未声明的多余字段，防止注入攻击
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  // CORS 配置：允许前台和后台前端跨域调用
  app.enableCors({
    origin: [
      'http://localhost:3000',          // 本地客户端前台
      'http://localhost:3001',          // 本地后台前端
      process.env.CLIENT_URL,          // 生产客户端域名
      process.env.ADMIN_FRONTEND_URL,  // 生产后台域名
    ].filter(Boolean) as string[],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  })

  // 启动服务，端口 3002（Strapi 占 1337，Next.js 占 3000/3001）
  const port = process.env.PORT ?? 3002
  await app.listen(port)
  console.log(`微服务启动成功，端口：${port}`)
}

bootstrap()
