/**
 * ============================================================
 * FILE: backend/microservice/src/registration/registration.module.ts
 * ============================================================
 *
 * 【作用】
 * 报名模块。组装 RegistrationController 和 RegistrationService，
 * 导入 HttpModule 供 Service 调用 Strapi API，
 * 导入 BullModule 注册 email 队列供 Service 注入。
 *
 * 【依赖关系】
 * Imports from:
 *   - @nestjs/common   : Module
 *   - @nestjs/axios    : HttpModule
 *   - @nestjs/bullmq   : BullModule
 *
 * Used by:
 *   - src/app.module.ts : AppModule.imports
 */
import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { RegistrationController } from './registration.controller'
import { RegistrationService } from './registration.service'
import { RateLimitGuard } from '../common/guards/rate-limit.guard'

@Module({
  imports: [
    HttpModule, // 提供 HttpService 调用 Strapi
  ],
  controllers: [RegistrationController],
  providers: [RegistrationService, RateLimitGuard],
})
export class RegistrationModule {}
