/**
 * ============================================================
 * FILE: backend/strapi/src/index.ts
 * ============================================================
 *
 * 【作用】
 * Strapi 应用生命周期钩子入口，承担两个职责：
 *
 * 1. register() — 注册自定义 GraphQL resolver（Mike 实现）
 *    在 Strapi 加载插件后、HTTP 服务启动前执行。
 *    将 extensions/graphql/resolvers.ts 的实现合并进 shadowCRUD 生成的 Schema。
 *
 * 2. bootstrap() — 自动完成 T3 权限配置 + T7 种子数据（Austin 实现）
 *    在 HTTP 服务启动后首次执行。
 *    - configurePublicPermissions()：把 Public 角色的指定接口设为可公开访问
 *    - seedIfEmpty()：数据库为空时自动录入开发用种子数据
 *
 * 【为什么用 bootstrap 而不是手动在 Admin UI 操作？】
 * 团队成员克隆仓库后只需 npm run develop，环境自动就绪，
 * 不需要每人手动点 UI 配置权限和录入测试数据，减少人为失误。
 */
import * as fs from 'fs'
import * as path from 'path'
import resolvers from './extensions/graphql/resolvers'

// ============================================================
// T3 — Public 角色权限配置
// ============================================================

// 公开可访问的接口（不需要 Token）
// 格式：api::内容类型.控制器.操作
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
  // Registration 只开放 create：前台可提交，但不能查看别人的报名记录
  'api::registration.registration.create',
  // Sponsor：前台展示赞助商 Logo，只需 find/findOne
  'api::sponsor.sponsor.find',
  'api::sponsor.sponsor.findOne',
]

async function configurePublicPermissions(strapi: any): Promise<void> {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } })

  if (!publicRole) {
    strapi.log.warn('[Permissions] 找不到 Public 角色，跳过权限配置')
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

  strapi.log.info('[Permissions] Public 角色权限配置完成')
}

// ============================================================
// T7 — 种子数据（真实 UTMCSSA 数据）
// ============================================================

async function seedIfEmpty(strapi: any): Promise<void> {
  // 以 Department 数量作为判断依据，已有数据则跳过
  const count = await strapi.entityService.count('api::department.department')
  if (count > 0) return

  strapi.log.info('[Seed] 数据库为空，开始录入种子数据...')

  // 1. 全站配置（Single Type，先查后建）
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
          { platform: 'TikTok',    handle: '@utmcssa', url: 'https://www.tiktok.com/@utmcssa' },
        ],
        about_description:
          'UTMCSSA（多伦多大学密西沙加校区中国学生学者联谊会）成立于2012年，已走过13年。我们致力于为UTM的中国留学生及学者提供归属感，帮助大家更好地融入海外生活。我们不仅是一个举办活动的组织，更是一个提供陪伴、支持与成长的大家庭，秉持"Always by your side"的初心，与每一位同学同行。',
        join_us_description:
          '欢迎加入UTMCSSA！无论你对活动策划、品牌宣传、外联赞助、学术交流还是行政财务感兴趣，都能在这里找到属于自己的舞台。加入我们，与志同道合的伙伴一起为UTM中国学生社区贡献力量，共同成长。',
      },
    })
  }

  // 2. 部门（Member 依赖 Department，必须先建）
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

  // 3. 成员（真实 UTMCSSA 换届公告数据）
  await Promise.all([
    strapi.entityService.create('api::member.member', {
      data: { name: '谭巍琦', title: '主席',             introduction: '承诺为同学提供全方位帮助',               order: 1,  department: zxt.id },
    }),
    strapi.entityService.create('api::member.member', {
      data: { name: '王俊杰', title: '内务副主席',       introduction: '希望通过团队合作带来活力与创意',         major: '管理学与经济学', order: 2, department: zxt.id },
    }),
    strapi.entityService.create('api::member.member', {
      data: { name: '徐令昊', title: '外务副主席',       introduction: '致力于提升组织效能和平台影响力',         order: 3,  department: zxt.id },
    }),
    strapi.entityService.create('api::member.member', {
      data: { name: '西西',   title: '秘书长',           introduction: '专注于为留学生群体服务和活动记录',       order: 4,  department: zxt.id },
    }),
    strapi.entityService.create('api::member.member', {
      data: { name: 'Jessica', title: '品牌与宣传部部长', introduction: '侧重视频与内容策划',                   order: 5,  department: ppb.id },
    }),
    strapi.entityService.create('api::member.member', {
      data: { name: 'Max',    title: '外联与赞助部部长', introduction: '',                                     major: 'Commerce', order: 6, department: wlb.id },
    }),
    strapi.entityService.create('api::member.member', {
      data: { name: 'Jenny',  title: '活动策划部部长',   introduction: '拥有活动统筹经验',                     order: 7,  department: hdb.id },
    }),
    strapi.entityService.create('api::member.member', {
      data: { name: '孙婉晴', title: '行政与财务部部长', introduction: undefined,                             major: 'Eco+Math', order: 8, department: xzb.id },
    }),
    strapi.entityService.create('api::member.member', {
      data: { name: 'Jackson', title: '学术部部长',      introduction: '强调分享与支持',                      major: 'Math/CS/STA', order: 9, department: xsb.id },
    }),
  ])

  // 4. 活动（含动态报名表单 schema）
  await Promise.all([
    strapi.entityService.create('api::event.event', {
      data: {
        title: '2025 秋季迎新晚会',
        start_time: '2025-09-15T18:00:00.000Z',
        capacity: 100,
        status: 'active',
        form_schema: [
          { field: 'name',       label: '姓名',   type: 'text',     required: true },
          { field: 'email',      label: '邮箱',   type: 'email',    required: true },
          { field: 'student_id', label: '学号',   type: 'text',     required: true },
          { field: 'grade',      label: '年级',   type: 'select',   required: true, options: ['大一', '大二', '大三', '大四', '研究生'] },
          { field: 'wechat',     label: '微信号', type: 'text',     required: false },
        ],
      },
    }),
    strapi.entityService.create('api::event.event', {
      data: {
        title: '2025 秋季招新',
        start_time: '2025-10-01T10:00:00.000Z',
        capacity: 50,
        status: 'upcoming',
        form_schema: [
          { field: 'name',       label: '姓名',         type: 'text',     required: true },
          { field: 'email',      label: '邮箱',         type: 'email',    required: true },
          { field: 'department', label: '意向部门',     type: 'select',   required: true, options: ['主席团', '市场部', '学术部'] },
          { field: 'reason',     label: '为什么想加入', type: 'textarea', required: true },
        ],
      },
    }),
  ])

  // 5. 往期活动（真实 UTMCSSA 历史活动）
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
    strapi.entityService.create('api::past-event.past-event', {
      data: {
        event_name: '2024 秋季学术分享会',
        introduction:
          '邀请三位学长学姐分享申研经验和求职心得，现场反响热烈，Q&A 环节持续了一个小时。',
        event_date: '2024-10-08',
      },
    }),
  ])

  strapi.log.info('[Seed] 种子数据录入完成：6 部门 / 9 成员 / 2 活动 / 3 往期活动')
}

// ============================================================
// 生命周期导出
// ============================================================

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
    // T3：自动配置 Public 角色权限
    await configurePublicPermissions(strapi)
    // T7：数据库为空时自动录入种子数据
    await seedIfEmpty(strapi)
  },
}
