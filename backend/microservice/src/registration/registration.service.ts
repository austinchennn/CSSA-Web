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
 *   - @nestjs/bull          : InjectQueue
 *   - src/registration/dto/create-registration.dto.ts
 *
 * Used by:
 *   - src/registration/registration.controller.ts
 *
 * 【关键变量】
 * - STRAPI_URL: string      — Strapi 内部服务地址（如 http://localhost:1337）
 * - STRAPI_API_TOKEN: string — Strapi 全权限 API Token（从环境变量读取，不暴露给前端）
 */

import { Injectable, BadRequestException, ServiceUnavailableException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'
import { CreateRegistrationDto } from './dto/create-registration.dto'

@Injectable()
export class RegistrationService {
  private readonly strapiUrl: string
  private readonly strapiToken: string

  constructor(
    private readonly configService: ConfigService,
    @InjectQueue('email') private readonly emailQueue: Queue,
  ) {
    // 从环境变量读取 Strapi 地址和 Token，禁止在代码里写死
    this.strapiUrl   = this.configService.get<string>('STRAPI_URL', 'http://localhost:1337')
    this.strapiToken = this.configService.get<string>('STRAPI_API_TOKEN', '')
  }

  async create(dto: CreateRegistrationDto): Promise<{ id: string }> {
    // 第一步：查询活动信息，验证活动状态和容量
    const event = await this.fetchEvent(dto.eventId)

    if (event.status !== 'active') {
      throw new BadRequestException('报名通道已关闭，请关注下次活动')
    }

    // 如果活动设置了人数上限，检查是否已满
    if (event.capacity !== null) {
      const currentCount = await this.fetchRegistrationCount(dto.eventId)
      if (currentCount >= event.capacity) {
        throw new BadRequestException('报名人数已满，感谢你的关注')
      }
    }

    // 第二步：向 Strapi 写入报名记录
    const registration = await this.createRegistration(dto)

    // 第三步：异步发送确认邮件（加入队列，不阻塞响应）
    const userEmail = dto.userInfo['email'] as string | undefined
    if (userEmail) {
      await this.emailQueue.add('registration_confirmed', {
        registrationId: registration.id,
        userEmail,
        eventTitle: event.title,
      })
    }

    return { id: registration.id }
  }

  // 查询单个活动信息
  private async fetchEvent(eventId: string) {
    const res = await fetch(`${this.strapiUrl}/api/events/${eventId}`, {
      headers: { Authorization: `Bearer ${this.strapiToken}` },
    })
    if (!res.ok) {
      throw new ServiceUnavailableException('无法连接到 CMS 服务，请稍后再试')
    }
    const data = await res.json()
    return data.data.attributes
  }

  // 查询活动当前报名人数
  private async fetchRegistrationCount(eventId: string): Promise<number> {
    const res = await fetch(
      `${this.strapiUrl}/api/registrations?filters[event][id][$eq]=${eventId}&pagination[pageSize]=1`,
      { headers: { Authorization: `Bearer ${this.strapiToken}` } },
    )
    if (!res.ok) return 0
    const data = await res.json()
    return data.meta?.pagination?.total ?? 0
  }

  // 向 Strapi 创建报名记录
  private async createRegistration(dto: CreateRegistrationDto): Promise<{ id: string }> {
    const res = await fetch(`${this.strapiUrl}/api/registrations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.strapiToken}`,
      },
      body: JSON.stringify({
        data: {
          event: dto.eventId,
          user_info: dto.userInfo,
          status: 'pending',
        },
      }),
    })
    if (!res.ok) {
      throw new ServiceUnavailableException('报名提交失败，请稍后重试')
    }
    const data = await res.json()
    return { id: String(data.data.id) }
  }
}
