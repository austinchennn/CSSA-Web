/**
 * ============================================================
 * FILE: admin-frontend/lib/api/sponsors.api.ts
 * ============================================================
 *
 * 【作用】
 * 赞助商（Sponsors）CRUD 操作 API 函数集合。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/api/client.ts        : apiRequest
 *   - lib/types/admin.types.ts : Sponsor, SponsorFormData 类型
 *
 * Exported to / Used by:
 *   - app/(admin)/sponsors/page.tsx
 *
 * 【函数】
 * export async function getSponsors(): Promise<Sponsor[]>
 *   - GET /api/sponsors?sort=tier:asc,name:asc&populate=logo
 *
 * export async function createSponsor(data: SponsorFormData): Promise<Sponsor>
 *   - POST /api/sponsors，body: { data: { name, logo: logoId, website_url, tier, description } }
 *
 * export async function updateSponsor(id: string, data: Partial<SponsorFormData>): Promise<Sponsor>
 *   - PUT /api/sponsors/{id}
 *
 * export async function deleteSponsor(id: string): Promise<void>
 *   - DELETE /api/sponsors/{id}
 */

export {}
