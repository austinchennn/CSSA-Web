/**
 * ============================================================
 * FILE: backend/microservice/src/app.module.ts
 * ============================================================
 *
 * 【作用】
 * NestJS 应用根模块。组装所有子模块（RegistrationModule、QueueModule），
 * 配置全局模块（ConfigModule 用于读取环境变量）。
 *
 * 【依赖关系】
 * Imports from:
 *   - @nestjs/common              : Module
 *   - @nestjs/config              : ConfigModule（全局环境变量管理）
 *   - src/registration/registration.module.ts : 报名处理模块
 *   - src/queue/queue.module.ts               : BullMQ 队列模块
 *
 * Used by:
 *   - src/main.ts : bootstrap 函数的 NestFactory.create() 参数
 *
 * 【模块组装】
 * @Module({
 *   imports: [
 *     ConfigModule.forRoot({ isGlobal: true }),  — 全局环境变量，无需每个模块导入
 *     QueueModule,        — BullMQ 队列（异步导出、邮件发送）
 *     RegistrationModule, — 报名提交 + Rate Limit 防刷
 *   ],
 * })
 * export class AppModule {}
 */
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RegistrationModule } from './registration/registration.module'
import { QueueModule } from './queue/queue.module'

@Module({
  imports: [
    // isGlobal: true 使 ConfigService 在所有模块可直接注入，无需再 import ConfigModule
    ConfigModule.forRoot({ isGlobal: true }),
    QueueModule,
    RegistrationModule,
  ],
})
export class AppModule {}
