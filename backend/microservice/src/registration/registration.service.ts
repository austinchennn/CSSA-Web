/**
 * ============================================================
 * FILE: backend/microservice/src/registration/registration.service.ts
 * ============================================================
 *
 * 【作用】
 * 报名提交的业务逻辑层。校验活动状态（是否开放报名）、
 * 容量检查，然后将数据转发到 Strapi REST API 写入 Registrations 表。
 *
 * 【依赖关系】
 * Imports from:
 *   - @nestjs/common        : Injectable, BadRequestException, ServiceUnavailableException
 *   - @nestjs/config        : ConfigService（读取 STRAPI_URL、STRAPI_API_TOKEN）
 *   - @nestjs/axios         : HttpService（HTTP 请求 Strapi API）
 *   - src/registration/dto/create-registration.dto.ts
 *
 * Used by:
 *   - src/registration/registration.controller.ts
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
  ) {
    // 从环境变量读取 Strapi 地址和 Token，禁止在代码里写死
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

    // 2. 如果活动设置了人数上限，检查是否已满（capacity 为 null 表示不限人数）
    if (event.capacity !== null && event.capacity !== undefined) {
      const countResp = await firstValueFrom(
        this.http.get(
          `${this.strapiUrl}/api/registrations?filters[event][id][$eq]=${dto.eventId}&pagination[pageSize]=1`,
          { headers }
        )
      )
      const total = countResp.data?.meta?.pagination?.total ?? 0
      if (total >= event.capacity) {
        throw new BadRequestException('报名人数已满，感谢你的关注')
      }
    }

    // 3. 向 Strapi 写入报名记录
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

    this.logger.log(`报名成功 — ID: ${registrationId}, 活动: ${event.title}`)
    return { id: registrationId }
  }

  // 导出某活动所有报名记录为 CSV 字符串
  // 列头由 form_schema 的 label 字段决定，数据行从 user_info 取对应 field 的 key
  async exportRegistrations(eventId: string): Promise<string> {
    const headers = { Authorization: `Bearer ${this.strapiToken}` }

    // 1. 获取活动的 form_schema（CSV 列头定义）
    const eventResp = await firstValueFrom(
      this.http.get(`${this.strapiUrl}/api/events/${eventId}`, { headers })
    ).catch(() => { throw new BadRequestException('活动不存在') })

    const formSchema: Array<{ field: string; label: string }> =
      eventResp.data?.data?.attributes?.form_schema ?? []

    // 2. 分页拉取全部报名记录（每页 100 条，循环到取完为止）
    const allItems: Array<{ id: number; attributes: { status: string; user_info: Record<string, unknown> } }> = []
    let page = 1
    while (true) {
      const resp = await firstValueFrom(
        this.http.get(
          `${this.strapiUrl}/api/registrations?filters[event][id][$eq]=${eventId}&pagination[page]=${page}&pagination[pageSize]=100`,
          { headers }
        )
      )
      const items = resp.data?.data ?? []
      allItems.push(...items)
      if (items.length < 100) break
      page++
    }

    const keys   = formSchema.map((f) => f.field)
    const labels = formSchema.map((f) => f.label)

    // 含逗号/换行/双引号的单元格用双引号包裹，内部双引号转义为 ""
    const esc = (val: unknown): string => {
      const s = val == null ? '' : String(val)
      return s.includes(',') || s.includes('\n') || s.includes('"')
        ? `"${s.replace(/"/g, '""')}"`
        : s
    }

    const rows = [
      ['报名ID', '状态', ...labels].map(esc).join(','),
      ...allItems.map((item) => {
        const info = item.attributes?.user_info ?? {}
        return [item.id, item.attributes?.status, ...keys.map((k) => info[k])]
          .map(esc)
          .join(',')
      }),
    ]

    return rows.join('\n')
  }
}
