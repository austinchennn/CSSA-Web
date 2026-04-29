/**
 * ============================================================
 * FILE: backend/strapi/src/api/registration/controllers/registration.ts
 * ============================================================
 *
 * 【作用】
 * Registrations 内容类型控制器。最关键的扩展点：
 * 1. create() 需要校验对应活动状态是否为 'active'（关闭的活动不允许提交报名）
 * 2. create() 需要校验活动是否已达容量上限（capacity 字段）
 * 3. create() 实际上通过 NestJS 微服务代理（Rate Limit 在微服务层拦截），
 *    Strapi 层作为最终写入层
 *
 * 【默认路由】
 * GET    /api/registrations         → find()（仅管理员，查看所有报名）
 *   - ?filters[event][id][$eq]={eventId} 按活动筛选
 * GET    /api/registrations/:id     → findOne()
 * POST   /api/registrations         → create()（Public，前台提交报名）
 * PUT    /api/registrations/:id     → update()（管理员审批，修改 status）
 * DELETE /api/registrations/:id     → delete()（管理员清理）
 *
 * 【create() 扩展逻辑】
 * async create(ctx): Promise<void>
 *   - 从 ctx.request.body.data.event 获取 eventId
 *   - 调用 strapi.entityService.findOne('api::event.event', eventId) 获取活动
 *   - 若 event.status !== 'active'：返回 400 "报名通道已关闭"
 *   - 若 event.capacity 存在：
 *       统计当前 registrations 数量（COUNT WHERE event_id = eventId AND status != 'cancelled'）
 *       若已达上限：返回 400 "报名人数已满"
 *   - 校验通过：调用 super.create(ctx) 写入 Registrations 表
 *
 * 【update() 扩展逻辑（审批操作）】
 * - 仅允许修改 status 字段（防止管理员意外改动 user_info）
 * - 状态流转约束：pending → confirmed / cancelled（不允许 confirmed → pending 等回滚）
 *
 * 【权限配置】
 * - Public：create（前台提交报名）
 * - Authenticated：find, findOne, update, delete
 */

export {}
