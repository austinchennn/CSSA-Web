/**
 * ============================================================
 * FILE: backend/microservice/src/queue/email.processor.ts
 * ============================================================
 *
 * 【作用】
 * "email" 队列的异步任务处理器。处理各类自动化邮件发送任务：
 * 报名确认邮件、状态变更通知等。使用 Nodemailer 或 SendGrid 发送。
 * Phase 1 可选实现（如用户未提供邮箱则跳过）。
 *
 * 【依赖关系】
 * Used by:
 *   - src/queue/queue.module.ts
 *   - src/registration/registration.service.ts : 报名成功后加入 email 队列
 *
 * 【任务类型】
 * - registration_confirmed：发送"报名成功"确认邮件
 * - status_changed：发送审批状态变更通知
 * - export_complete：发送导出完成通知（Task 7 阶段实现）
 */

import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { Job } from 'bullmq'

interface EmailJobData {
  type: 'registration_confirmed' | 'status_changed' | 'export_complete'
  to: string
  subject?: string
  data: Record<string, unknown>
}

// Task 8（P2）：接入真实 SMTP 邮件发送，目前只打日志占位
@Processor('email')
export class EmailProcessor extends WorkerHost {
  private readonly logger = new Logger(EmailProcessor.name)

  async process(job: Job<EmailJobData>): Promise<void> {
    const { type, to, data } = job.data

    switch (type) {
      case 'registration_confirmed':
        // TODO Task 8: 用 Nodemailer 发送报名确认邮件
        this.logger.log(`[TODO] 报名确认邮件 → ${to}，活动：${data.eventTitle}`)
        break
      case 'status_changed':
        // TODO Task 8: 发送审批状态变更通知
        this.logger.log(`[TODO] 状态变更邮件 → ${to}，新状态：${data.status}`)
        break
      case 'export_complete':
        // TODO Task 7: 发送导出完成通知
        this.logger.log(`[TODO] 导出完成邮件 → ${to}`)
        break
      default:
        this.logger.warn(`未知邮件类型：${type}`)
    }
  }
}
