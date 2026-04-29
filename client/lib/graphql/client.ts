/**
 * ============================================================
 * FILE: client/lib/graphql/client.ts
 * ============================================================
 *
 * 【作用】
 * GraphQL 请求客户端的核心封装。提供统一的 gqlFetch 函数，
 * 所有 GraphQL 查询均通过此函数发起，集中管理 endpoint、
 * 请求头、错误处理和 Next.js ISR 缓存策略配置。
 *
 * 【依赖关系】
 * Imported by:
 *   - lib/graphql/queries/*.ts        : 所有 Query 模块导入此函数
 *   - lib/graphql/mutations/*.ts      : 所有 Mutation 模块导入此函数
 *
 * 【Interface 定义】
 * interface GraphQLResponse<T>
 *   - data: T
 *   - errors?: GraphQLError[]
 *
 * interface GraphQLError
 *   - message: string
 *   - locations?: { line: number; column: number }[]
 *   - path?: string[]
 *
 * interface FetchOptions
 *   - revalidate?: number | false — ISR 重验时间（秒），false 表示永不过期
 *   - tags?: string[]            — Next.js 缓存 tag，用于按需 revalidate
 *   - cache?: 'no-store' | 'force-cache' — 覆盖默认缓存策略
 *
 * 【函数】
 * export async function gqlFetch<T>(
 *   query: string,
 *   variables?: Record<string, unknown>,
 *   options?: FetchOptions
 * ): Promise<T>
 *   - endpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT
 *   - 使用 Next.js 扩展的 fetch，传入 next: { revalidate, tags } 配置
 *   - 请求头：{ 'Content-Type': 'application/json' }
 *   - 发起 POST 请求，body: JSON.stringify({ query, variables })
 *   - 响应解析：res.json() → GraphQLResponse<T>
 *   - 若 errors 存在，抛出包含所有错误信息的 Error
 *   - 返回 response.data
 *
 * 【关键变量】
 * - GRAPHQL_ENDPOINT: string — 从环境变量读取，必须在构建时存在
 */

export {}
