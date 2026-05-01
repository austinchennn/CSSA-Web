/**
 * registration controller
 *
 * 覆盖两个方法：
 * - create()：校验活动状态和容量，防止向关闭或已满的活动提交报名
 * - update()：只允许修改 status 字段，防止管理员误改用户填写的 user_info
 */
import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::registration.registration',
  ({ strapi }) => ({

    async create(ctx: any) {
      const { event: eventId } = (ctx.request.body as any).data

      // 查询活动详情，确认其是否存在及当前状态
      const event = await strapi.entityService.findOne(
        'api::event.event',
        eventId,
        { populate: ['registrations'] }
      )

      if (!event) {
        return ctx.badRequest('活动不存在')
      }

      // 活动状态必须为 active 才可报名，upcoming/closed 均拒绝
      if (event.status !== 'active') {
        return ctx.badRequest('报名通道已关闭，该活动当前不接受报名')
      }

      // capacity 为 null 表示不限人数，跳过容量检查
      if (event.capacity !== null) {
        const currentCount = await strapi.entityService.count(
          'api::registration.registration',
          {
            filters: {
              event: { id: eventId },
              status: { $ne: 'cancelled' }, // 已取消的不占用名额
            },
          }
        )

        if (currentCount >= event.capacity) {
          return ctx.badRequest(`报名人数已满（上限 ${event.capacity} 人）`)
        }
      }

      // 以上校验全部通过，交给默认 create 写入数据库
      return super.create(ctx)
    },

    async update(ctx: any) {
      const body = (ctx.request.body as any).data || {}
      const submittedFields = Object.keys(body)
      // 审批操作只允许改 status，防止管理员界面误操作覆盖用户填写的 user_info
      const forbidden = submittedFields.filter((k) => k !== 'status')

      if (forbidden.length > 0) {
        return ctx.badRequest(
          `不允许修改字段：${forbidden.join(', ')}。审批操作只能修改 status`
        )
      }

      return super.update(ctx)
    },
  })
)
