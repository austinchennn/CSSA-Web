/**
 * ============================================================
 * FILE: backend/strapi/src/api/site-config/services/site-config.ts
 * ============================================================
 *
 * 【作用】
 * Site_Configs 内容类型的 Service 层。封装数据库操作逻辑，
 * 控制器（Controller）通过调用 Service 来操作数据，
 * 实现业务逻辑与 HTTP 处理的解耦。
 *
 * 【依赖关系】
 * Imports from:
 *   - @strapi/strapi : factories.createCoreService
 *
 * Used by:
 *   - backend/strapi/src/api/site-config/controllers/site-config.ts
 *
 * 【默认 Service 方法（来自 createCoreService）】
 * find(params): Promise<SiteConfig[]>
 *   - 查询所有配置项，支持 filters/sort/pagination 参数
 *
 * findOne(entityId, params): Promise<SiteConfig>
 *   - 按 ID 查单条配置
 *
 * create(params): Promise<SiteConfig>
 *   - 创建新配置项
 *
 * update(entityId, params): Promise<SiteConfig>
 *   - 更新已有配置项
 *
 * delete(entityId): Promise<SiteConfig>
 *   - 删除配置项
 *
 * 【自定义方法扩展（可选）】
 * findByKey(key: string): Promise<SiteConfig | null>
 *   - 使用 strapi.entityService.findMany 按 key 精确查找
 *   - 返回第一条匹配记录（key 有 unique 约束，最多一条）
 *
 * upsertByKey(key: string, value: string | object): Promise<SiteConfig>
 *   - 若 key 存在则更新 value，不存在则创建
 *   - 用于后台批量保存配置时简化调用
 */

export {}
