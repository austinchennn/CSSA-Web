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

export {}
