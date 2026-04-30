/**
 * event controller
 *
 * 覆盖 find()，在每个活动数据里追加实时报名人数（registrationCount）。
 * 后台列表页用此字段展示报名进度，避免前端再发一次统计请求。
 */
import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::event.event',
  ({ strapi }) => ({

    async find(ctx) {
      // 先调用默认 find 获取活动列表和分页信息
      const { data, meta } = await super.find(ctx)

      // 为每个活动并行查询报名人数，Promise.all 避免串行 N+1 查询
      const enriched = await Promise.all(
        data.map(async (event: any) => {
          // 只统计未取消的报名，已取消的不计入人数
          const count = await strapi.entityService.count(
            'api::registration.registration',
            {
              filters: {
                event: { id: event.id },
                status: { $ne: 'cancelled' },
              },
            }
          )
          return {
            ...event,
            attributes: {
              ...event.attributes,
              registrationCount: count, // 追加到 attributes，前端直接读取
            },
          }
        })
      )

      return { data: enriched, meta }
    },
  })
)
