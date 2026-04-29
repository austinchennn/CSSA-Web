/**
 * ============================================================
 * FILE: client/app/about/page.tsx
 * ============================================================
 *
 * 【作用】
 * 关于我们页面（路由 `/about`）。展示 UTMCSSA 的组织定位、使命宣言、
 * 核心服务对象（新生支持/学术支持/活动组织/资源整合）和长期价值观。
 * 内容来自 Strapi Site_Configs，不硬编码任何文案。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/graphql/queries/siteConfig.queries.ts : fetchAboutPageContent()
 *   - lib/types/cms.types.ts                    : AboutPageContent 类型
 *   - components/shared/SectionHeader.tsx        : 统一标题样式组件
 *   - components/shared/AnimatedSection.tsx      : 滚动进场动效包裹组件
 *
 * 【导出 Metadata】
 * export const metadata: Metadata
 *   - title: "About Us"
 *   - description: 从 siteConfig 读取的关于我们 SEO 描述
 *
 * 【函数】
 * export default async function AboutPage(): Promise<JSX.Element>
 *   - 调用 fetchAboutPageContent() 拉取全部文案数据
 *   - 渲染以下区域：
 *       1. 页面 Hero Banner（带背景色/图，显示标题和副标题）
 *       2. 使命宣言（Mission Statement）全宽文字区块
 *       3. 四大服务对象卡片网格（新生支持/学术支持/活动组织/资源整合）
 *          每张卡片含图标、标题、描述文字
 *       4. 核心价值观列表
 *       5. 底部 CTA：引导跳转至 /join 或 /contact
 *
 * 【ISR 配置】
 * export const revalidate = 300
 *   - 关于我们文案更新频率低，5 分钟重验即可
 *
 * 【关键变量】
 * - content: AboutPageContent — 含 missionStatement, services[], values[] 等字段
 */

export {}
