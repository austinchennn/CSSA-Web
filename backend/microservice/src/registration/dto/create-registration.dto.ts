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
 *
 * Used by:
 *   - src/registration/registration.controller.ts : @Body() 参数类型
 *   - src/registration/registration.service.ts    : create(dto: CreateRegistrationDto)
 *
 * 【注意】
 * - 此 DTO 不校验 userInfo 的内部字段（因为动态表单字段因活动而异）
 * - 前台 DynamicForm 已做前端校验，此处只做基础格式防御
 */

import { IsString, IsNotEmpty, IsObject } from 'class-validator'

export class CreateRegistrationDto {
  // 报名的目标活动 ID（Strapi documentId 格式）
  @IsString()
  @IsNotEmpty({ message: '活动 ID 不能为空' })
  eventId: string

  // 动态表单填写的数据，key 对应 form_schema 中的 field 字段
  // 例：{ name: '张三', email: 'zs@test.com', year: '大一' }
  @IsObject()
  @IsNotEmpty({ message: '表单数据不能为空' })
  userInfo: Record<string, string | number>
}
