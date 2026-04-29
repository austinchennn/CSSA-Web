/**
 * ============================================================
 * FILE: backend/microservice/src/app.module.ts
 * ============================================================
 *
 * 【作用】
 * NestJS 应用根模块。组装所有子模块（RegistrationModule、QueueModule、AuthModule），
 * 配置全局模块（如 ConfigModule 用于读取环境变量）。
 *
 * 【依赖关系】
 * Imports from:
 *   - @nestjs/common              : Module
 *   - @nestjs/config              : ConfigModule（全局环境变量管理）
 *   - src/registration/registration.module.ts : 报名处理模块
 *   - src/queue/queue.module.ts               : BullMQ 队列模块
 *   - src/auth/auth.module.ts                 : 鉴权模块
 *
 * Used by:
 *   - src/main.ts : bootstrap 函数的 NestFactory.create() 参数
 *
 * 【模块组装】
 * @Module({
 *   imports: [
 *     ConfigModule.forRoot({ isGlobal: true }),  — 全局环境变量，无需每个模块导入
 *     AuthModule,         — 提供 JwtAuthGuard，保护管理接口
 *     RegistrationModule, — 报名提交 + Rate Limit 防刷
 *     QueueModule,        — BullMQ 队列（异步导出、邮件发送）
 *   ],
 * })
 * export class AppModule {}
 */

export {}
