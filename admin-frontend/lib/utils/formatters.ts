/**
 * ============================================================
 * FILE: admin-frontend/lib/utils/formatters.ts
 * ============================================================
 *
 * 【作用】
 * 后台通用格式化工具函数。与客户端 formatters.ts 功能类似但独立维护，
 * 因为后台需要额外的状态翻译、数字格式化等后台专用逻辑。
 *
 * 【依赖关系】
 * Imported by:
 *   - components/events/EventList.tsx          : 日期格式化
 *   - components/events/RegistrationsTable.tsx : 日期格式化、状态翻译
 *   - components/shared/ExportCSVButton.tsx    : 状态翻译
 *
 * 【函数】
 * export function formatDate(dateString: string): string
 *   - 格式化为 "2024-03-15 18:00" 格式（后台展示用，包含时间）
 *   - 使用 Intl.DateTimeFormat('zh-CN', { ... })
 *
 * export function formatDateOnly(dateString: string): string
 *   - 格式化为 "2024年3月15日"（不含时间）
 *
 * export function translateEventStatus(status: EventStatus): string
 *   - 'active' → '进行中'
 *   - 'upcoming' → '即将开始'
 *   - 'closed' → '已关闭'
 *
 * export function translateRegistrationStatus(status: RegistrationStatus): string
 *   - 'pending' → '待审批'
 *   - 'confirmed' → '已确认'
 *   - 'cancelled' → '已取消'
 *
 * export function formatCapacity(count: number, capacity?: number): string
 *   - 有 capacity：返回 "150 / 200"
 *   - 无 capacity：返回 "150 人"
 *
 * export function flattenStrapiData<T>(raw: StrapiCollectionResponse<T>): (T & { id: string })[]
 *   - 与客户端版本相同的 Strapi 数据展平工具（两端独立实现，避免跨包依赖）
 */

export {}
