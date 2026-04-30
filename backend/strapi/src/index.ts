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
// T7 — 种子数据
// ============================================================

async function seedIfEmpty(strapi: any): Promise<void> {
  // 以 Department 数量作为判断依据，已有数据则跳过
  const count = await strapi.entityService.count('api::department.department')
  if (count > 0) return

  strapi.log.info('[Seed] 数据库为空，开始录入种子数据...')

  // 1. 全站配置（Single Type，直接 upsert）
  await strapi.db.query('api::site-config.site-config').upsert({
    where: {},
    create: {
      hero_title: '欢迎来到 UTMCSSA',
      hero_subtitle: '多伦多大学密西沙加校区中国学生学者联合会',
      contact_email: 'utmcssa@gmail.com',
      instagram_url: 'https://instagram.com/utmcssa',
    },
    update: {},
  })

  // 2. 部门（Member 依赖 Department，必须先建）
  const [zxt, scb, xsb] = await Promise.all([
    strapi.entityService.create('api::department.department', {
      data: {
        name: '主席团',
        leader_name: '张三',
        introduction: '学生会最高领导机构，负责整体战略规划和对外代表。',
      },
    }),
    strapi.entityService.create('api::department.department', {
      data: {
        name: '市场部',
        leader_name: '李四',
        introduction: '负责社交媒体运营、活动宣传和品牌推广。',
      },
    }),
    strapi.entityService.create('api::department.department', {
      data: {
        name: '学术部',
        leader_name: '王五',
        introduction: '组织学术讲座、升学分享和职业发展活动。',
      },
    }),
  ])

  // 3. 成员（photo 字段为 required，但 entityService 绕过 API 校验，种子阶段可不传）
  await Promise.all([
    strapi.entityService.create('api::member.member', {
      data: { name: '张三', title: '主席', order: 10, department: zxt.id },
    }),
    strapi.entityService.create('api::member.member', {
      data: { name: '赵六', title: '副主席', order: 9, department: zxt.id },
    }),
    strapi.entityService.create('api::member.member', {
      data: { name: '李四', title: '市场部部长', order: 8, department: scb.id },
    }),
    strapi.entityService.create('api::member.member', {
      data: { name: '孙七', title: '市场部干事', order: 7, department: scb.id },
    }),
    strapi.entityService.create('api::member.member', {
      data: { name: '王五', title: '学术部部长', order: 6, department: xsb.id },
    }),
    strapi.entityService.create('api::member.member', {
      data: { name: '周八', title: '学术部干事', order: 5, department: xsb.id },
    }),
  ])

  // 4. 活动
  await Promise.all([
    strapi.entityService.create('api::event.event', {
      data: {
        title: '2025 秋季迎新晚会',
        start_time: '2025-09-15T18:00:00.000Z',
        capacity: 100,
        status: 'active',
        form_schema: [
          { field: 'name', label: '姓名', type: 'text', required: true },
          { field: 'email', label: '邮箱', type: 'email', required: true },
          { field: 'student_id', label: '学号', type: 'text', required: true },
          { field: 'grade', label: '年级', type: 'select', required: true, options: ['大一', '大二', '大三', '大四', '研究生'] },
          { field: 'wechat', label: '微信号', type: 'text', required: false },
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
          { field: 'name', label: '姓名', type: 'text', required: true },
          { field: 'email', label: '邮箱', type: 'email', required: true },
          { field: 'department', label: '意向部门', type: 'select', required: true, options: ['主席团', '市场部', '学术部'] },
          { field: 'reason', label: '为什么想加入', type: 'textarea', required: true },
        ],
      },
    }),
  ])

  // 5. 往期活动（photo 为 required，同 Member，种子阶段跳过）
  await Promise.all([
    strapi.entityService.create('api::past-event.past-event', {
      data: {
        event_name: '2025 春季游园活动',
        introduction: '本次游园活动在多伦多植物园举行，共 80 名同学参加，大家在游览园区的同时认识了新朋友，留下了美好回忆。',
        event_date: '2025-04-20',
      },
    }),
    strapi.entityService.create('api::past-event.past-event', {
      data: {
        event_name: '2024 冬季联谊晚会',
        introduction: '年度最重磅活动！来自不同专业的同学欢聚一堂，共同庆祝 2024 年的收获与成长。',
        event_date: '2024-12-15',
      },
    }),
    strapi.entityService.create('api::past-event.past-event', {
      data: {
        event_name: '2024 秋季学术分享会',
        introduction: '邀请三位学长学姐分享申研经验和求职心得，现场反响热烈，Q&A 环节持续了一个小时。',
        event_date: '2024-10-08',
      },
    }),
  ])

  strapi.log.info('[Seed] 种子数据录入完成：3 部门 / 6 成员 / 2 活动 / 3 往期活动')
}

// ============================================================
// 生命周期导出
// ============================================================

export default {
  register({ strapi }: { strapi: any }) {
    // 注册自定义 GraphQL resolver（registrationCountByEvent）
    const extensionService = strapi.plugin('graphql').service('extension')
    extensionService.use({ resolvers })
  },

  async bootstrap({ strapi }: { strapi: any }) {
    // T3：自动配置 Public 角色权限
    await configurePublicPermissions(strapi)
    // T7：数据库为空时自动录入种子数据
    await seedIfEmpty(strapi)
  },
}
