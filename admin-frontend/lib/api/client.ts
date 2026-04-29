/**
 * ============================================================
 * FILE: admin-frontend/lib/api/client.ts
 * ============================================================
 *
 * 【作用】
 * 后台 API 请求基础客户端。封装所有与 Strapi REST API 的 HTTP 通信，
 * 集中管理认证 token 注入、错误处理和 401 自动登出逻辑。
 * 所有 *.api.ts 模块通过此客户端发起请求。
 *
 * 【依赖关系】
 * Imported by:
 *   - lib/api/members.api.ts
 *   - lib/api/events.api.ts
 *   - lib/api/registrations.api.ts
 *   - lib/api/departments.api.ts
 *   - lib/api/pastEvents.api.ts
 *   - lib/api/sponsors.api.ts
 *   - lib/api/siteConfig.api.ts
 *   - components/shared/ImageUploader.tsx : uploadMedia()
 *
 * 【Interface 定义】
 * interface ApiRequestOptions
 *   - method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
 *   - body?: unknown               — 请求体（自动 JSON 序列化）
 *   - params?: Record<string, string | number | boolean> — URL query 参数
 *
 * interface ApiResponse<T>
 *   - data: T
 *   - meta?: StrapiMeta           — 分页信息 { pagination: { total, page, pageSize } }
 *
 * 【函数】
 * export async function apiRequest<T>(endpoint: string, options?: ApiRequestOptions): Promise<ApiResponse<T>>
 *   - 基础 URL：process.env.NEXT_PUBLIC_API_URL
 *   - 自动注入 Authorization: 'Bearer {token}'（从 cookie 读取 admin_token）
 *   - 自动序列化 params 为 querystring（使用 URLSearchParams）
 *   - 响应 401：清除 cookie，window.location.href = '/login'（强制登出）
 *   - 响应 4xx/5xx（非 401）：抛出包含 error.message 的 Error
 *   - 成功：返回 res.json() 解析结果
 *
 * export async function uploadMedia(file: File): Promise<{ url: string; id: string }>
 *   - POST /api/upload（multipart/form-data）
 *   - 注入 Authorization header
 *   - 返回 Strapi 上传结果中的图片 url 和 id
 *
 * export function logout(): void
 *   - 清除 admin_token cookie
 *   - 可选：清除 TanStack Query 缓存
 *
 * 【关键变量】
 * - BASE_URL: string — process.env.NEXT_PUBLIC_API_URL
 */

export {}
