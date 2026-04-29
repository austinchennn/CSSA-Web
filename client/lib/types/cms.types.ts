/**
 * ============================================================
 * FILE: client/lib/types/cms.types.ts
 * ============================================================
 *
 * 【作用】
 * 定义所有与 Strapi CMS 数据模型对应的 TypeScript Interface。
 * 这是前端类型安全的核心文件，所有 GraphQL 返回值必须经过
 * 这里定义的类型约束。每次 Strapi Schema 变更，此文件必须同步更新。
 *
 * 【依赖关系】
 * Imported by:
 *   - lib/graphql/queries/*.ts : 所有 Query 函数的返回类型
 *   - lib/graphql/mutations/*.ts
 *   - components/**/*.tsx       : 所有 Props 中涉及 CMS 数据的类型
 *   - app/**/*.tsx              : 所有页面组件
 *
 * 【定义的 Interface / Type】
 *
 * --- Strapi 通用结构 ---
 * interface StrapiMedia
 *   - url: string
 *   - alternativeText: string | null
 *   - width: number
 *   - height: number
 *
 * interface StrapiRaw<T>
 *   - id: string
 *   - attributes: T
 *
 * interface StrapiCollectionResponse<T>
 *   - data: StrapiRaw<T>[]
 *
 * --- 业务数据模型 ---
 * interface SiteConfig
 *   - key: string
 *   - value: string | object
 *   - description?: string
 *
 * interface Department
 *   - id: string
 *   - name: string
 *   - leaderName: string
 *   - introduction?: string
 *
 * interface Member
 *   - id: string
 *   - name: string
 *   - title: string
 *   - photoUrl: string        （从 StrapiMedia.url 展平）
 *   - photoAlt: string        （从 StrapiMedia.alternativeText 展平）
 *   - order: number
 *   - department: Department
 *
 * interface PastEvent
 *   - id: string
 *   - eventName: string
 *   - introduction: string    （富文本 HTML 字符串）
 *   - photo: StrapiMedia      （强制非空，数据库层约束）
 *   - eventDate: string       （ISO 日期字符串，如 "2024-03-15"）
 *
 * interface Event
 *   - id: string
 *   - title: string
 *   - startTime: string       （ISO DateTime 字符串）
 *   - capacity?: number
 *   - formSchema: FormField[] （JSON 解析后的类型，见 form.types.ts）
 *   - status: 'upcoming' | 'active' | 'closed'
 *
 * interface Registration
 *   - id: string
 *   - eventId: string
 *   - userInfo: Record<string, unknown>
 *   - status: 'pending' | 'confirmed' | 'cancelled'
 *
 * interface Sponsor
 *   - id: string
 *   - name: string
 *   - logo: StrapiMedia
 *   - websiteUrl?: string
 *   - tier: 'gold' | 'silver' | 'bronze'
 *   - description?: string
 *
 * --- 页面数据聚合类型 ---
 * interface HomePageData
 *   - heroTitle: string
 *   - heroSubtitle: string
 *   - heroBackgroundUrl?: string
 *   - ctaPrimaryText: string
 *   - ctaSecondaryText: string
 *
 * interface AboutPageContent
 *   - heroTitle: string
 *   - missionStatement: string
 *   - services: ServiceItem[]
 *   - values: string[]
 *
 * interface ServiceItem
 *   - icon: string
 *   - title: string
 *   - description: string
 *
 * interface ContactInfo
 *   - email: string
 *   - socialLinks: SocialLink[]
 *
 * interface SocialLink
 *   - platform: string
 *   - url: string
 *   - iconName: string
 *
 * interface SponsorsPageContent
 *   - heroTitle: string
 *   - heroSubtitle: string
 *   - stats: StatItem[]
 *   - tiers: SponsorTier[]
 *
 * interface StatItem
 *   - label: string
 *   - value: string
 *
 * interface SponsorTier
 *   - name: string
 *   - benefits: string[]
 *
 * interface JoinPageContent
 *   - heroTitle: string
 *   - recruitmentDescription: string
 *   - departmentIntros: DepartmentIntro[]
 *
 * interface DepartmentIntro
 *   - name: string
 *   - description: string
 *
 * interface NavLink
 *   - label: string
 *   - href: string
 */

export {}
