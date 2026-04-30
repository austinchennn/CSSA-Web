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
 * 【路由】
 * @Controller('registrations')
 * POST /api/v1/registrations
 *   - RateLimitGuard 先拦截（超频返回 429）
 *   - ValidationPipe 校验 DTO（格式错误返回 400）
 *   - 调用 registrationService.create(dto)
 *
 * GET /api/v1/registrations/export?eventId=xxx
 *   - 仅限后台管理员调用（通过 Nginx 鉴权层保护）
 *   - 返回 UTF-8 CSV 文件流（含 BOM，Excel 可正确打开中文）
 *
 * 【错误处理】
 * - RateLimitGuard 触发时：429 Too Many Requests
 * - 活动已关闭或满员：400 BadRequestException（来自 Service）
 * - Strapi 不可达：503 ServiceUnavailableException（来自 Service）
 */

import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  BadRequestException,
  Res,
} from '@nestjs/common'
import type { Response } from 'express'
import { RegistrationService } from './registration.service'
import { CreateRegistrationDto } from './dto/create-registration.dto'
import { RateLimitGuard } from '../common/guards/rate-limit.guard'

@Controller('registrations')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  // POST /api/v1/registrations — 公开接口，用于前台提交报名
  @Post()
  @HttpCode(HttpStatus.CREATED)    // 成功返回 201 而非默认 200
  @UseGuards(RateLimitGuard)       // 先经过防刷守卫，超频直接 429
  async create(@Body() dto: CreateRegistrationDto) {
    const registration = await this.registrationService.create(dto)
    return { success: true, id: registration.id }
  }

  // GET /api/v1/registrations/export?eventId=xxx — 管理员后台调用，返回 CSV 文件
  // BOM（﻿）确保 Excel 在 Windows 上正确识别 UTF-8 中文
  @Get('export')
  async exportCSV(
    @Query('eventId') eventId: string,
    @Res() res: Response,
  ) {
    if (!eventId) throw new BadRequestException('缺少必填参数 eventId')
    const csv = await this.registrationService.exportRegistrations(eventId)
    res.setHeader('Content-Type', 'text/csv; charset=utf-8')
    res.setHeader('Content-Disposition', `attachment; filename="registrations-${eventId}.csv"`)
    res.send('﻿' + csv)
  }
}
