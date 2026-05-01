/**
 * Strapi lifecycle hooks.
 *
 * register() — registers custom GraphQL resolvers before HTTP starts.
 * bootstrap() — sets Public role permissions + seeds empty DB on first start.
 *
 * Why bootstrap for permissions/seed: team members only need `npm run develop`
 * instead of manually clicking through Admin UI on every fresh clone.
 */
import * as fs from 'fs'
import * as path from 'path'
import resolvers from './extensions/graphql/resolvers'

// REST endpoints accessible without an API token
const PUBLIC_PERMISSIONS = [
  'api::site-config.site-config.find',
  'api::department.department.find',
  'api::department.department.findOne',
  'api::member.member.find',
  'api::member.member.findOne',
  'api::event.event.find',
  'api::event.event.findOne',
  'api::past-event.past-event.find',
  'api::past-event.past-event.findOne',
  // create-only: visitors can register but cannot read other registrations
  'api::registration.registration.create',
]

async function configurePublicPermissions(strapi: any): Promise<void> {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } })

  if (!publicRole) {
    strapi.log.warn('[Permissions] Public role not found, skipping')
    return
  }

  for (const action of PUBLIC_PERMISSIONS) {
    const existing = await strapi.db
      .query('plugin::users-permissions.permission')
      .findOne({ where: { action, role: publicRole.id } })

    if (existing) {
      if (!existing.enabled) {
        await strapi.db
          .query('plugin::users-permissions.permission')
          .update({ where: { id: existing.id }, data: { enabled: true } })
      }
    } else {
      await strapi.db
        .query('plugin::users-permissions.permission')
        .create({ data: { action, enabled: true, role: publicRole.id } })
    }
  }

  strapi.log.info('[Permissions] Public role permissions configured')
}

async function seedIfEmpty(strapi: any): Promise<void> {
  const count = await strapi.entityService.count('api::department.department')
  if (count > 0) return

  strapi.log.info('[Seed] Empty database — seeding real UTMCSSA data...')

  // 1. Site config (Single Type)
  const existingSiteConfig = await strapi.db
    .query('api::site-config.site-config')
    .findOne({})
  if (!existingSiteConfig) {
    await strapi.db.query('api::site-config.site-config').create({
      data: {
        hero_title: 'Always by your side',
        hero_subtitle: 'UTMCSSA — 多伦多大学密西沙加校区中国学生学者联谊会',
        contact_email: 'utmcssa@gmail.com',
        social_links: [
          { platform: 'Instagram', handle: '@utmcssa', url: 'https://www.instagram.com/utmcssa' },
          { platform: 'WeChat',    handle: 'UTMCSSA', url: '' },
          { platform: '小红书',    handle: 'UTMCSSA', url: '' },
          { platform: 'LinkedIn',  handle: 'UTMCSSA', url: 'https://www.linkedin.com/company/utmcssa' },
          { platform: 'YouTube',   handle: 'UTMCSSA', url: 'https://www.youtube.com/@utmcssa' },
          { platform: 'Facebook',  handle: 'UTMCSSA', url: 'https://www.facebook.com/utmcssa' },
          { platform: 'Twitter',   handle: '@utmcssa', url: 'https://twitter.com/utmcssa' },
          { platform: 'TikTok',   handle: '@utmcssa', url: 'https://www.tiktok.com/@utmcssa' },
        ],
        about_description:
          'UTMCSSA（多伦多大学密西沙加校区中国学生学者联谊会）成立于2012年，已走过13年。我们致力于为UTM的中国留学生及学者提供归属感，帮助大家更好地融入海外生活。我们不仅是一个举办活动的组织，更是一个提供陪伴、支持与成长的大家庭，秉持"Always by your side"的初心，与每一位同学同行。',
        join_us_description:
          '欢迎加入UTMCSSA！无论你对活动策划、品牌宣传、外联赞助、学术交流还是行政财务感兴趣，都能在这里找到属于自己的舞台。加入我们，与志同道合的伙伴一起为UTM中国学生社区贡献力量，共同成长。',
      },
    })
  }

  // 2. Departments (members depend on these)
  const [zxt, ppb, wlb, hdb, xzb, xsb] = await Promise.all([
    strapi.entityService.create('api::department.department', {
      data: { name: '主席团',       introduction: '负责统筹全局，制定战略方向，对内协调各部门工作，对外代表学生会。' },
    }),
    strapi.entityService.create('api::department.department', {
      data: { name: '品牌与宣传部', introduction: '负责社交媒体运营、内容创作、视觉设计与品牌传播。' },
    }),
    strapi.entityService.create('api::department.department', {
      data: { name: '外联与赞助部', introduction: '负责对外联络、商业赞助洽谈及合作伙伴关系维护。' },
    }),
    strapi.entityService.create('api::department.department', {
      data: { name: '活动策划部',   introduction: '负责各类校园活动的策划、组织与执行。' },
    }),
    strapi.entityService.create('api::department.department', {
      data: { name: '行政与财务部', introduction: '负责日常行政事务管理及财务核算与报销。' },
    }),
    strapi.entityService.create('api::department.department', {
      data: { name: '学术部',       introduction: '负责学术资源整合、学习交流活动及导师计划。' },
    }),
  ])

  // 3. Members (real data from 换届公告)
  await Promise.all([
    strapi.entityService.create('api::member.member', {
      data: { name: '谭巍琦', title: '主席',           introduction: '承诺为同学提供全方位帮助',               major: undefined,         order: 1, department: zxt.id },
    }),
    strapi.entityService.create('api::member.member', {
      data: { name: '王俊杰', title: '内务副主席',     introduction: '希望通过团队合作带来活力与创意',         major: '管理学与经济学',  order: 2, department: zxt.id },
    }),
    strapi.entityService.create('api::member.member', {
      data: { name: '徐令昊', title: '外务副主席',     introduction: '致力于提升组织效能和平台影响力',         major: undefined,         order: 3, department: zxt.id },
    }),
    strapi.entityService.create('api::member.member', {
      data: { name: '西西',   title: '秘书长',         introduction: '专注于为留学生群体服务和活动记录',       major: undefined,         order: 4, department: zxt.id },
    }),
    strapi.entityService.create('api::member.member', {
      data: { name: 'Jessica', title: '品牌与宣传部部长', introduction: '侧重视频与内容策划',                 major: undefined,         order: 5, department: ppb.id },
    }),
    strapi.entityService.create('api::member.member', {
      data: { name: 'Max',    title: '外联与赞助部部长', introduction: '',                                   major: 'Commerce',        order: 6, department: wlb.id },
    }),
    strapi.entityService.create('api::member.member', {
      data: { name: 'Jenny',  title: '活动策划部部长', introduction: '拥有活动统筹经验',                     major: undefined,         order: 7, department: hdb.id },
    }),
    strapi.entityService.create('api::member.member', {
      data: { name: '孙婉晴', title: '行政与财务部部长', introduction: undefined,                           major: 'Eco+Math',        order: 8, department: xzb.id },
    }),
    strapi.entityService.create('api::member.member', {
      data: { name: 'Jackson', title: '学术部部长',   introduction: '强调分享与支持',                       major: 'Math/CS/STA',     order: 9, department: xsb.id },
    }),
  ])

  // 4. Past events (real UTMCSSA events)
  await Promise.all([
    strapi.entityService.create('api::past-event.past-event', {
      data: {
        event_name: '加国留学分享会',
        introduction:
          'UTMCSSA携手多位在加拿大就读的中国留学生，分享真实的留学生活经历、申请经验与校园适应心得，帮助即将赴加的同学提前了解海外生活。活动涵盖学业规划、生活安排、文化适应等多个话题，为新生提供宝贵参考。',
        event_date: '2025-06-20',
      },
    }),
    strapi.entityService.create('api::past-event.past-event', {
      data: {
        event_name: 'UTM华人新生见面会',
        introduction:
          'UTMCSSA为UTM新入学的中国留学生举办的迎新见面会，旨在帮助大家快速融入校园环境，结识志同道合的同学，了解UTMCSSA的各项服务与活动资源。活动设有自我介绍、校园导览、Q&A环节及轻松社交时间。',
        event_date: '2025-09-12',
      },
    }),
  ])

  strapi.log.info('[Seed] Done: 6 departments / 9 members / 2 past events')
}

export default {
  register({ strapi }: { strapi: any }) {
    const typeDefs = fs.readFileSync(
      path.join(__dirname, 'extensions/graphql/schema.graphql'),
      'utf-8'
    )
    const extensionService = strapi.plugin('graphql').service('extension')
    extensionService.use({ typeDefs, resolvers })
  },

  async bootstrap({ strapi }: { strapi: any }) {
    await configurePublicPermissions(strapi)
    await seedIfEmpty(strapi)
  },
}
