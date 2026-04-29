/**
 * ============================================================
 * FILE: backend/microservice/src/queue/queue.module.ts
 * ============================================================
 *
 * 【作用】
 * BullMQ 异步任务队列模块。配置 Redis 连接，注册"email"和"export"
 * 两个队列，并挂载对应的 Processor（任务处理器）。
 * 将耗时任务（邮件发送、大量数据导出）从同步请求链路中剥离，
 * 避免阻塞 HTTP 响应。
 *
 * 【依赖关系】
 * Imports from:
 *   - @nestjs/bullmq          : BullModule（NestJS BullMQ 集成）
 *   - src/queue/export.processor.ts : ExportProcessor
 *   - src/queue/email.processor.ts  : EmailProcessor
 *   - @nestjs/config                : ConfigService（读取 Redis 配置）
 *
 * Used by:
 *   - src/app.module.ts : 在 AppModule.imports 中注册
 *
 * 【模块配置】
 * @Module({
 *   imports: [
 *     BullModule.forRootAsync({
 *       useFactory: (config: ConfigService) => ({
 *         connection: {
 *           host: config.get('REDIS_HOST', 'localhost'),
 *           port: config.get<number>('REDIS_PORT', 6379),
 *         },
 *       }),
 *       inject: [ConfigService],
 *     }),
 *     BullModule.registerQueue(
 *       { name: 'email' },   — 邮件发送队列
 *       { name: 'export' },  — 数据导出队列
 *     ),
 *   ],
 *   providers: [ExportProcessor, EmailProcessor],
 *   exports: [BullModule],   — 导出供 RegistrationService 注入队列
 * })
 * export class QueueModule {}
 */

export {}
