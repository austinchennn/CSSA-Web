/**
 * ============================================================
 * FILE: admin-frontend/app/(admin)/sponsors/page.tsx
 * ============================================================
 *
 * 【作用】
 * 赞助商管理页（路由 `/admin/sponsors`）。上传赞助商 Logo、
 * 填写合作文案、设置赞助档位，更新后前台赞助页自动更新。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/api/sponsors.api.ts          : CRUD 操作
 *   - components/shared/ImageUploader.tsx : Logo 上传（校验透明背景 PNG）
 *   - components/ui/ConfirmDialog.tsx     : 删除确认
 *   - lib/schemas/sponsor.schema.ts       : Zod 校验（名称必填，Logo 必填，tier 枚举）
 *
 * 【组件】
 * export default function SponsorsPage(): JSX.Element
 *   - "use client"
 *   - 按档位分组展示赞助商（Gold / Silver / Bronze 三个区块）
 *   - 每个赞助商卡片：Logo 预览 + 名称 + 档位 Badge + 编辑/删除操作
 *   - 添加/编辑 Drawer：
 *       赞助商名称（文本输入）
 *       Logo 上传（<ImageUploader>，提示"建议上传透明背景 PNG"）
 *       合作文案（Textarea）
 *       官网 URL（可选 URL 输入）
 *       赞助档位（Select：Gold/Silver/Bronze）
 *
 * 【关键变量 / State】
 * - isDrawerOpen: boolean
 * - editingSponsor: Sponsor | null
 */

export {}
