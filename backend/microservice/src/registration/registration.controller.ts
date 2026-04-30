/**
 * ============================================================
 * FILE: backend/microservice/src/registration/registration.controller.ts
 * ============================================================
 *
 * 【作用】
 * 报名提交的 HTTP 控制器。前台用户提交报名时，请求首先到达此控制器，
 * 经过 Rate Limit 拦截守卫后，转发到 Strapi API 写入数据库。
 * 这是项目中唯一需要公开且承受高并发的关键写接口。
 *
 * 【依赖关系】
 * Imports from:
 *   - @nestjs/common            : Controller, Post, Body, UseGuards, HttpCode
 *   - src/common/guards/rate-limit.guard.ts : RateLimitGuard
 *   - src/registration/registration.service.ts : RegistrationService
 *   - src/registration/dto/create-registration.dto.ts : CreateRegistrationDto
 *
 * Used by:
 *   - NestJS 路由系统（被 registration.module.ts 注册）
 *   - 客户端 lib/graphql/mutations/registration.mutations.ts 最终调用（经 Strapi 代理）
 *
 * 【路由】
 * @Controller('registrations')
 * @Post('/')  →  POST /api/v1/registrations
 *   - @UseGuards(RateLimitGuard)  — 请求进入前先经过防刷守卫
 *   - @HttpCode(201)              — 成功时返回 201
 *   - 参数：@Body() dto: CreateRegistrationDto
 *   - 调用：registrationService.create(dto)
 *   - 返回：{ success: true, id: registrationId }
 *
 * 【错误处理】
 * - RateLimitGuard 触发时：抛出 429 Too Many Requests（由全局过滤器处理）
 * - 活动已关闭或满员时：Service 层抛出 400 BadRequestException
 * - 网络错误（Strapi 不可达）：Service 层抛出 503 ServiceUnavailableException
 */

import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
} from '@nestjs/common'
import { RateLimitGuard } from '../common/guards/rate-limit.guard'
import { RegistrationService } from './registration.service'
import { CreateRegistrationDto } from './dto/create-registration.dto'

@Controller('registrations')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  // POST /api/v1/registrations
  @Post('/')
  @UseGuards(RateLimitGuard) // 速率限制：同 IP 每分钟最多 5 次
  @HttpCode(201)
  async create(@Body() dto: CreateRegistrationDto) {
    const result = await this.registrationService.create(dto)
    return { success: true, id: result.id }
  }
}
