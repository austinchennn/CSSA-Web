/**
 * ============================================================
 * FILE: client/lib/utils/formatDate.ts
 * ============================================================
 *
 * 【作用】
 * 日期格式化工具函数集合。将 API 返回的 ISO 日期字符串转换为
 * 用户友好的展示格式，支持中英文和多种格式输出。
 *
 * 【依赖关系】
 * Imported by:
 *   - components/sections/events/EventCard.tsx   : 活动日期展示
 *   - components/sections/events/TimelineItem.tsx: 时间线日期
 *   - admin-frontend/lib/utils/formatters.ts     : （不直接复用，admin 有独立版本）
 *
 * 【函数】
 * export function formatEventDate(dateString: string, locale?: string): string
 *   - 参数：ISO 日期字符串（如 "2024-03-15"）
 *   - locale 默认为 'zh-CN'
 *   - 返回：格式化后的日期字符串（如 "2024年3月15日"）
 *   - 实现：使用 Intl.DateTimeFormat（避免引入 date-fns 等第三方库）
 *   - 格式选项：{ year: 'numeric', month: 'long', day: 'numeric' }
 *
 * export function formatDateTime(dateTimeString: string): string
 *   - 参数：ISO DateTime 字符串（如 "2024-03-15T18:00:00.000Z"）
 *   - 返回：日期 + 时间字符串（如 "2024年3月15日 18:00"）
 *   - 使用 Intl.DateTimeFormat，包含 hour 和 minute
 *
 * export function formatRelativeDate(dateString: string): string
 *   - 返回相对时间（如 "3 天前"、"2 个月前"）
 *   - 使用 Intl.RelativeTimeFormat
 *   - 超过 1 年时退回为绝对日期格式 formatEventDate()
 *
 * export function getYear(dateString: string): number
 *   - 从日期字符串提取年份数字
 *   - 用于时间线按年分组
 */

export {}
