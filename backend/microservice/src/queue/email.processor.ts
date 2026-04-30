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
 * 【任务处理方法】
 * - registration_confirmed：发送"报名成功"确认邮件
 * - status_changed：发送状态变更通知
 */

import { Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'

// 邮件任务的数据结构
interface EmailJobData {
  type: 'registration_confirmed' | 'status_changed'
  userEmail: string
  eventTitle: string
  registrationId: string
}

@Processor('email')
export class EmailProcessor {
  private readonly logger = new Logger(EmailProcessor.name)

  @Process('registration_confirmed')
  async handleRegistrationConfirmed(job: Job<EmailJobData>): Promise<void> {
    const { userEmail, eventTitle, registrationId } = job.data

    // Phase 1：暂时只打日志，邮件服务配置完善后替换为真实发送逻辑
    // 后续接入 Nodemailer：
    //   await transporter.sendMail({ to: userEmail, subject: `${eventTitle} 报名成功`, ... })
    this.logger.log(
      `[邮件队列] 报名确认邮件待发送 → ${userEmail}，活动：${eventTitle}，报名ID：${registrationId}`,
    )
  }

  @Process('status_changed')
  async handleStatusChanged(job: Job<EmailJobData>): Promise<void> {
    const { userEmail, eventTitle } = job.data
    this.logger.log(`[邮件队列] 状态变更通知待发送 → ${userEmail}，活动：${eventTitle}`)
  }
}
