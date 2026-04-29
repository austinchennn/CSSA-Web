/**
 * ============================================================
 * FILE: admin-frontend/lib/types/admin.types.ts
 * ============================================================
 *
 * 【作用】
 * 后台前端所有 TypeScript Interface 和 Type 的集中定义文件。
 * 与客户端 cms.types.ts 分开维护（两者数据结构类似但用途不同：
 * 后台需要更多管理操作相关的字段，如 createdAt、updatedAt、审批状态等）。
 *
 * 【依赖关系】
 * Imported by:
 *   - lib/api/*.api.ts          : 所有 API 函数的参数和返回值类型
 *   - lib/hooks/*.ts             : 所有自定义 hooks 的类型
 *   - components/**/*.tsx        : 所有组件的 Props 类型
 *
 * 【定义的 Interface / Type】
 *
 * --- Strapi 通用 ---
 * interface StrapiMeta
 *   - pagination: { page: number; pageSize: number; pageCount: number; total: number }
 *
 * type EventStatus = 'upcoming' | 'active' | 'closed'
 * type RegistrationStatus = 'pending' | 'confirmed' | 'cancelled'
 * type SponsorTier = 'gold' | 'silver' | 'bronze'
 *
 * --- 业务数据模型 ---
 * interface Member
 *   - id: string
 *   - name: string
 *   - title: string
 *   - photoUrl: string
 *   - photoId: string        （Strapi media ID，用于更新时引用）
 *   - order: number
 *   - department: Department
 *   - createdAt: string
 *   - updatedAt: string
 *
 * interface MemberFormData
 *   - name: string
 *   - title: string
 *   - deptId: string
 *   - order: number
 *   - photoUrl: string
 *
 * interface Department
 *   - id: string
 *   - name: string
 *   - leaderName: string
 *   - introduction?: string
 *   - memberCount?: number   （统计字段，非 Strapi 原生）
 *
 * interface DepartmentFormData
 *   - name: string
 *   - leaderName: string
 *   - introduction?: string
 *
 * interface Event
 *   - id: string
 *   - title: string
 *   - startTime: string
 *   - capacity?: number
 *   - formSchema: FormField[]
 *   - status: EventStatus
 *   - registrationCount?: number （统计字段）
 *   - createdAt: string
 *
 * interface EventFormData
 *   - title: string
 *   - startTime: Date
 *   - endTime?: Date
 *   - capacity?: number
 *   - formSchema: FormField[]
 *
 * interface Registration
 *   - id: string
 *   - eventId: string
 *   - userInfo: Record<string, string | number>
 *   - status: RegistrationStatus
 *   - createdAt: string
 *
 * interface PastEvent
 *   - id: string
 *   - eventName: string
 *   - introduction: string
 *   - photo: { url: string; id: string }
 *   - eventDate: string
 *
 * interface PastEventFormData
 *   - eventName: string
 *   - introduction: string
 *   - eventDate: Date
 *   - photoUrl: string
 *
 * interface Sponsor
 *   - id: string
 *   - name: string
 *   - logo: { url: string; id: string }
 *   - websiteUrl?: string
 *   - tier: SponsorTier
 *   - description?: string
 *
 * interface SponsorFormData
 *   - name: string
 *   - logoUrl: string
 *   - tier: SponsorTier
 *   - websiteUrl?: string
 *   - description?: string
 *
 * interface SiteConfig
 *   - id: string
 *   - key: string
 *   - value: string | object
 *   - description?: string
 *
 * interface AdminUser
 *   - username: string
 *   - email: string
 *   - avatarInitials: string
 *
 * interface AdminNavItem
 *   - href: string
 *   - label: string
 *   - iconName: string
 */

export {}
