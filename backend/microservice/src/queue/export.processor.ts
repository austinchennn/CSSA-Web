/**
 * ============================================================
 * FILE: backend/microservice/src/queue/export.processor.ts
 * ============================================================
 *
 * 【作用】
 * "export" 队列的异步任务处理器。处理大批量报名数据导出任务，
 * 避免大数据量导出阻塞 HTTP 请求（当报名人数超过 1000+ 时尤为重要）。
 * Phase 1 阶段前端直接在浏览器端用 papaparse 导出，此处理器为未来扩展预留。
 *
 * 【依赖关系】
 * Used by:
 *   - src/queue/queue.module.ts : providers 中注册
 *
 * 【Phase 1 说明】
 * 本阶段只打日志占位，导出功能由前端 papaparse 直接处理。
 * Phase 2 再实现服务端分页导出 + 云存储上传。
 */

import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { Job } from 'bullmq'

interface ExportJobData {
  eventId: string
  requestedBy: string // 请求导出的管理员邮箱
  format: 'csv'
}

// Task 7（P2）：实现真实 CSV 导出，目前只打日志占位
@Processor('export')
export class ExportProcessor extends WorkerHost {
  private readonly logger = new Logger(ExportProcessor.name)

  async process(job: Job<ExportJobData>): Promise<void> {
    const { eventId, requestedBy, format } = job.data
    // TODO Task 7: 调用 Strapi API 分页拉取报名数据，生成 CSV 并发送下载链接
    this.logger.log(
      `[TODO] 导出任务收到 — eventId: ${eventId}, format: ${format}, 请求人: ${requestedBy}`
    )
  }
}
