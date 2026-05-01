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
 * BullModule.forRootAsync — 从 ConfigService 动态读取 Redis host/port
 * BullModule.registerQueue — 注册 email 和 export 两个队列
 * exports: [BullModule]   — 导出供 RegistrationModule 注入队列
 */
import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bullmq'
import { ConfigService } from '@nestjs/config'
import { EmailProcessor } from './email.processor'
import { ExportProcessor } from './export.processor'

@Module({
  imports: [
    BullModule.forRootAsync({
      // 从环境变量读取 Redis 地址，开发/生产环境无缝切换
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get('REDIS_HOST', 'localhost'),
          port: config.get<number>('REDIS_PORT', 6379),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue(
      { name: 'email' },   // 发送报名确认邮件
      { name: 'export' },  // 异步导出 CSV（Task 7/P2 阶段实现）
    ),
  ],
  providers: [EmailProcessor, ExportProcessor],
  // 导出 BullModule 供 RegistrationModule 使用 InjectQueue('email')
  exports: [BullModule],
})
export class QueueModule {}
