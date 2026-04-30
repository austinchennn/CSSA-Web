/**
 * ============================================================
 * FILE: backend/microservice/src/registration/dto/create-registration.dto.ts
 * ============================================================
 *
 * 【作用】
 * 报名提交请求体的 DTO（Data Transfer Object）。
 * 使用 class-validator 装饰器定义字段校验规则，
 * NestJS 的 ValidationPipe 在进入 Controller 前自动校验，
 * 不合规的请求在此处被拦截（400 Bad Request）。
 *
 * 【依赖关系】
 * Imports from:
 *   - class-validator   : IsString, IsNotEmpty, IsObject
 *   - class-transformer : Transform（可选，用于数据转换）
 *
 * Used by:
 *   - src/registration/registration.controller.ts : @Body() 参数类型
 *   - src/registration/registration.service.ts    : create(dto: CreateRegistrationDto)
 *
 * 【DTO 类定义】
 * export class CreateRegistrationDto
 *
 *   @IsString()
 *   @IsNotEmpty({ message: '活动 ID 不能为空' })
 *   eventId: string
 *     — 报名的目标活动 ID
 *
 *   @IsObject()
 *   @IsNotEmpty({ message: '表单数据不能为空' })
 *   userInfo: Record<string, string | number>
 *     — 动态表单填写的数据（格式由 form_schema 定义，此处不做深层校验）
 *     — 深层字段校验由 Strapi 层的 form_schema 对比完成（或前端已校验）
 *
 * 【注意】
 * - 此 DTO 不校验 userInfo 的内部字段（因为动态表单字段因活动而异）
 * - 前台 DynamicForm 已做前端校验，此处只做基础格式防御
 */

import { IsString, IsNotEmpty, IsObject } from 'class-validator'

export class CreateRegistrationDto {
  @IsString()
  @IsNotEmpty({ message: '活动 ID 不能为空' })
  eventId: string

  // 动态表单数据，内部字段因活动而异，只做顶层格式校验
  @IsObject()
  @IsNotEmpty({ message: '表单数据不能为空' })
  userInfo: Record<string, string | number>
}
