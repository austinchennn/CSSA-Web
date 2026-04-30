/**
 * ============================================================
 * FILE: backend/microservice/src/registration/registration.service.ts
 * ============================================================
 *
 * 【作用】
 * 报名提交的业务逻辑层。校验活动状态（是否开放报名）、
 * 容量检查，然后将数据转发到 Strapi REST API 写入 Registrations 表。
 * 同时触发 BullMQ 队列，处理异步后置任务（如确认邮件）。
 *
 * 【依赖关系】
 * Imports from:
 *   - @nestjs/common        : Injectable, BadRequestException, ServiceUnavailableException
 *   - @nestjs/config        : ConfigService（读取 STRAPI_URL、STRAPI_API_TOKEN）
 *   - @nestjs/axios         : HttpService（HTTP 请求 Strapi API）
 *   - @nestjs/bull          : InjectQueue
 *   - src/registration/dto/create-registration.dto.ts
 *
 * Used by:
 *   - src/registration/registration.controller.ts
 *
 * 【方法】
 * async create(dto: CreateRegistrationDto): Promise<{ id: string }>
 *   - 1. 调用 Strapi GET /api/events/{dto.eventId} 获取活动信息
 *       - 若活动 status !== 'active'：throw BadRequestException('报名通道已关闭')
 *       - 若活动 capacity 存在：
 *           调用 Strapi GET /api/registrations?count=true&filters[event][id][$eq]={id}
 *           若已达上限：throw BadRequestException('报名人数已满')
 *   - 2. 调用 Strapi POST /api/registrations 写入报名数据
 *       - 请求头携带 STRAPI_API_TOKEN（后端内部通信使用全权限 Token）
 *   - 3. 向 BullMQ 'email' 队列添加任务：{ type: 'registration_confirmed', registrationId, userEmail? }
 *   - 4. 返回新创建的 registration id
 *
 * 【关键变量】
 * - STRAPI_URL: string      — Strapi 内部服务地址（如 http://localhost:1337）
 * - STRAPI_API_TOKEN: string — Strapi 全权限 API Token（从环境变量读取，不暴露给前端）
 */

import {
  Injectable,
  BadRequestException,
  ServiceUnavailableException,
  Logger,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HttpService } from '@nestjs/axios'
import { InjectQueue } from '@nestjs/bullmq'
import { Queue } from 'bullmq'
import { firstValueFrom } from 'rxjs'
import { CreateRegistrationDto } from './dto/create-registration.dto'

@Injectable()
export class RegistrationService {
  private readonly logger = new Logger(RegistrationService.name)
  private readonly strapiUrl: string
  private readonly strapiToken: string

  constructor(
    private config: ConfigService,
    private http: HttpService,
    @InjectQueue('email') private emailQueue: Queue,
  ) {
    this.strapiUrl = config.get('STRAPI_URL', 'http://localhost:1337')
    this.strapiToken = config.get('STRAPI_API_TOKEN', '')
  }

  async create(dto: CreateRegistrationDto): Promise<{ id: string }> {
    const headers = { Authorization: `Bearer ${this.strapiToken}` }

    // 1. 查询活动状态和容量（Strapi Controller 层也会做校验，这里是双保险）
    let event: any
    try {
      const resp = await firstValueFrom(
        this.http.get(`${this.strapiUrl}/api/events/${dto.eventId}`, { headers })
      )
      event = resp.data?.data?.attributes
    } catch {
      throw new ServiceUnavailableException('Strapi 服务暂时不可达，请稍后重试')
    }

    if (!event || event.status !== 'active') {
      throw new BadRequestException('报名通道已关闭，该活动当前不接受报名')
    }

    // 2. 转发到 Strapi 写入报名记录
    let registration: any
    try {
      const resp = await firstValueFrom(
        this.http.post(
          `${this.strapiUrl}/api/registrations`,
          { data: { event: dto.eventId, user_info: dto.userInfo, status: 'pending' } },
          { headers }
        )
      )
      registration = resp.data?.data
    } catch (err: any) {
      // Strapi 业务校验失败（如活动已满），原样透传错误信息
      const msg = err.response?.data?.error?.message || '提交报名失败'
      throw new BadRequestException(msg)
    }

    const registrationId = String(registration.id)

    // 3. 异步发送确认邮件（若 userInfo 包含 email 字段）
    const userEmail = dto.userInfo?.email as string | undefined
    if (userEmail) {
      await this.emailQueue.add('registration_confirmed', {
        type: 'registration_confirmed',
        to: userEmail,
        data: { eventTitle: event.title, registrationId },
      })
    }

    this.logger.log(`报名成功 — ID: ${registrationId}, 活动: ${event.title}`)
    return { id: registrationId }
  }
}
