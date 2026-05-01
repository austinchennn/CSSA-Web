/**
 * ============================================================
 * FILE: backend/strapi/src/api/event/controllers/event.ts
 * ============================================================
 *
 * 【作用】
 * Events 内容类型控制器。核心扩展点：
 * 1. 可在 find() 中附加每个活动的报名人数统计（count registrations）
 * 2. 可在 create/update 时校验 form_schema 格式是否合法
 *
 * 【默认路由】
 * GET    /api/events         → find()
 *   - 常用参数：?filters[status][$eq]=active，?sort=start_time:desc
 * GET    /api/events/:id     → findOne()
 * POST   /api/events         → create()（仅管理员）
 * PUT    /api/events/:id     → update()（修改 status 用于开关报名通道）
 * DELETE /api/events/:id     → delete()
 *
 * 【扩展逻辑】
 * find() 覆盖：
 *   - 调用默认 find() 获取活动列表
 *   - 对每个活动追加 registrationCount 字段（通过 countRelated）
 *   - 用于后台列表页的报名进度显示
 *
 * create()/update() 覆盖（可选）：
 *   - 校验 ctx.request.body.data.form_schema 是否为合法 FormField[] 格式
 *   - 不合法时返回 400 Bad Request + 详细错误信息
 *
 * 【权限配置】
 * - Public：find, findOne（前台获取 active 活动及 form_schema）
 * - Authenticated：create, update, delete
 */

import { factories } from '@strapi/strapi'
export default factories.createCoreController('api::event.event')
