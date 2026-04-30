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
 * Used by:
 *   - src/app.module.ts : 在 AppModule.imports 中注册
 *
 * 【模块配置】
 * - email 队列：报名成功后异步发送确认邮件
 * - export 队列：管理员导出 CSV 时异步生成文件
 */

import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { EmailProcessor } from './email.processor'
import { ExportProcessor } from './export.processor'

@Module({
  imports: [
    // 全局配置 Redis 连接（所有队列共享同一个 Redis 实例）
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        redis: {
          host: config.get<string>('REDIS_HOST', 'localhost'),
          port: config.get<number>('REDIS_PORT', 6379),
        },
      }),
      inject: [ConfigService],
    }),

    // 注册两个独立队列
    BullModule.registerQueue(
      { name: 'email' },    // 邮件发送队列
      { name: 'export' },   // 数据导出队列
    ),
  ],

  // 挂载处理器：BullMQ 会自动将任务分配给对应的 Processor
  providers: [EmailProcessor, ExportProcessor],

  // 导出 BullModule，让 RegistrationModule 可以注入 email 队列
  exports: [BullModule],
})
export class QueueModule {}
