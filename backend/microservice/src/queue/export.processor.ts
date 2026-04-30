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

import { Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'

interface ExportJobData {
  eventId: string
  requestedBy: string   // 请求导出的管理员邮箱
  format: 'csv'
}

@Processor('export')
export class ExportProcessor {
  private readonly logger = new Logger(ExportProcessor.name)

  @Process()
  async handleExport(job: Job<ExportJobData>): Promise<void> {
    const { eventId, requestedBy, format } = job.data

    // Phase 1：暂时只打日志
    // Phase 2 实现：分页拉取 Strapi 报名数据 → 生成 CSV → 上传云存储 → 发邮件通知
    this.logger.log(
      `[导出队列] 收到导出任务，活动ID：${eventId}，格式：${format}，请求人：${requestedBy}`,
    )
  }
}
