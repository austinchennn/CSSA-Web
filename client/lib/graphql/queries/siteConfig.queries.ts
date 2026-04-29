/**
 * ============================================================
 * FILE: client/lib/graphql/queries/siteConfig.queries.ts
 * ============================================================
 *
 * 【作用】
 * 全站配置（Site_Configs）相关的 GraphQL Query 定义与数据获取函数。
 * 提供按 key 查询或批量获取配置项的接口，供各页面组件的数据获取调用。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/graphql/client.ts  : gqlFetch
 *   - lib/types/cms.types.ts : SiteConfig, HomePageData, AboutPageContent 等类型
 *
 * Exported to / Used by:
 *   - app/page.tsx           : fetchHomeData
 *   - app/about/page.tsx     : fetchAboutPageContent
 *   - app/contact/page.tsx   : fetchContactInfo
 *   - app/sponsors/page.tsx  : fetchSponsorsPageContent
 *   - app/join/page.tsx      : fetchJoinPageContent
 *
 * 【GraphQL Query 常量】
 * const SITE_CONFIG_QUERY: string
 *   - 查询指定 key 的配置值
 *   - 查询字段：key, value, description
 *
 * const SITE_CONFIGS_BY_KEYS_QUERY: string
 *   - 批量查询多个 key 的配置值
 *   - 参数：$keys: [String!]!
 *
 * 【函数】
 * export async function fetchSiteConfig(key: string): Promise<SiteConfig>
 *   - 调用 gqlFetch<{ siteConfig: SiteConfig }>(SITE_CONFIG_QUERY, { key })
 *   - revalidate: 300
 *
 * export async function fetchHomeData(): Promise<HomePageData>
 *   - 批量查询首页所需的所有 Site_Configs key（hero_title, hero_subtitle, hero_background_url 等）
 *   - 将扁平的 SiteConfig[] 转换为结构化 HomePageData 对象并返回
 *
 * export async function fetchAboutPageContent(): Promise<AboutPageContent>
 *   - 查询 about_* 前缀的所有配置 key
 *   - 返回结构化 AboutPageContent 对象
 *
 * export async function fetchContactInfo(): Promise<ContactInfo>
 *   - 查询 contact_email, social_instagram, social_wechat 等 key
 *
 * export async function fetchSponsorsPageContent(): Promise<SponsorsPageContent>
 *   - 查询赞助页文案、统计数字等配置
 *
 * export async function fetchJoinPageContent(): Promise<JoinPageContent>
 *   - 查询招新页文案配置
 */

export {}
