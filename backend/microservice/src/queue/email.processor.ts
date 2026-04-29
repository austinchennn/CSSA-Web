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
 * Imports from:
 *   - bullmq          : Job
 *   - @nestjs/bullmq  : Processor, WorkerHost
 *   - nodemailer       : createTransport, Transporter（SMTP 邮件发送）
 *   - @nestjs/config  : ConfigService（读取 SMTP 配置）
 *
 * Used by:
 *   - src/queue/queue.module.ts
 *   - src/registration/registration.service.ts : 报名成功后加入 email 队列
 *
 * 【任务处理方法】
 * @Processor('email')
 * export class EmailProcessor extends WorkerHost
 *
 * async process(job: Job<EmailJobData>): Promise<void>
 *   - 根据 job.data.type 分支处理不同邮件类型：
 *       case 'registration_confirmed':
 *         - 发送"报名成功"确认邮件给用户（若 userInfo 包含 email 字段）
 *         - 邮件内容：活动名称、报名时间、状态"待审批"
 *       case 'status_changed':
 *         - 发送状态变更通知（如"您的报名已确认/已取消"）
 *       case 'export_complete':
 *         - 发送"数据导出完成"邮件给管理员，附下载链接
 *
 * 【EmailJobData Interface】
 * interface EmailJobData
 *   - type: 'registration_confirmed' | 'status_changed' | 'export_complete'
 *   - to: string          — 收件人邮箱
 *   - subject?: string    — 邮件主题（可覆盖默认）
 *   - data: Record<string, unknown>  — 邮件模板变量
 *
 * 【关键变量】
 * - transporter: Transporter — Nodemailer SMTP 连接（从 ConfigService 读取 SMTP_HOST/PORT/USER/PASS）
 */

export {}
