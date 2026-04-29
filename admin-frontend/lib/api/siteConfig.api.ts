/**
 * ============================================================
 * FILE: admin-frontend/lib/api/siteConfig.api.ts
 * ============================================================
 *
 * 【作用】
 * 全站配置（Site_Configs）读取和更新 API 函数集合。
 * 与客户端前台不同，后台通过 REST API 批量读写配置，
 * 而非 GraphQL。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/api/client.ts        : apiRequest
 *   - lib/types/admin.types.ts : SiteConfig 类型
 *
 * Exported to / Used by:
 *   - app/(admin)/config/page.tsx
 *
 * 【函数】
 * export async function getSiteConfigs(): Promise<SiteConfig[]>
 *   - GET /api/site-configs（获取所有配置项）
 *   - 返回所有 { key, value, description } 记录
 *
 * export async function updateSiteConfig(key: string, value: string | object): Promise<SiteConfig>
 *   - 根据 key 查找已有记录并 PUT 更新
 *   - 若不存在：POST 创建新记录
 *   - Strapi Single Type 或 Collection Type 差异在此处处理
 *
 * export async function batchUpdateSiteConfigs(
 *   updates: Array<{ key: string; value: string | object }>
 * ): Promise<void>
 *   - 批量更新多个配置（并行发起多个 updateSiteConfig 请求）
 *   - 使用 Promise.all() 并行处理，提高批量保存性能
 */

export {}
