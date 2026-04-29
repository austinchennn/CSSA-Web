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
 * Imports from:
 *   - bullmq          : Worker, Job（BullMQ 任务处理基础类）
 *   - @nestjs/bullmq  : Processor, WorkerHost
 *   - @nestjs/config  : ConfigService
 *
 * Used by:
 *   - src/queue/queue.module.ts : providers 中注册
 *
 * 【任务处理方法】
 * @Processor('export')
 * export class ExportProcessor extends WorkerHost
 *
 * async process(job: Job<ExportJobData>): Promise<void>
 *   - job.data 包含：{ eventId, requestedBy, format: 'csv' | 'xlsx' }
 *   - 1. 调用 Strapi API 分页获取所有 Registrations（每页 100 条）
 *   - 2. 合并所有数据，调用 papaparse/exceljs 生成文件
 *   - 3. 将文件上传至云存储（S3 或 Strapi uploads），获取下载 URL
 *   - 4. 通过 email 队列发送"导出完成"通知邮件至请求者
 *
 * 【ExportJobData Interface】
 * interface ExportJobData
 *   - eventId: string
 *   - requestedBy: string  — 请求导出的管理员邮箱
 *   - format: 'csv'        — Phase 1 只支持 CSV
 */

export {}
