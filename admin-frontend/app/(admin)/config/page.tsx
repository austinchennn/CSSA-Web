/**
 * ============================================================
 * FILE: admin-frontend/app/(admin)/config/page.tsx
 * ============================================================
 *
 * 【作用】
 * 全站内容配置页（路由 `/admin/config`）。通过表单维护前台网站
 * 所有可配置的文案，包括首页 Hero 标题、关于我们文案、联系邮箱等。
 * 所有字段均对应 Site_Configs 表的 key-value 记录。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/api/siteConfig.api.ts      : getSiteConfigs(), updateSiteConfig()
 *   - lib/schemas/siteConfig.schema.ts : Zod 校验 Schema
 *   - react-hook-form                : useForm
 *
 * 【组件】
 * export default function ConfigPage(): JSX.Element
 *   - "use client"
 *   - 加载所有 Site_Configs 记录，按 key 前缀分组展示表单：
 *       Home（hero_title, hero_subtitle, hero_background_url）
 *       About（about_mission, about_service_*）
 *       Contact（contact_email, social_instagram, social_wechat）
 *   - 每个分组一个 Card，内含对应输入字段
 *   - 底部"保存"按钮：提交所有变更（批量 PATCH，使用 React Hook Form handleSubmit）
 *   - 保存成功显示 Toast："全站配置已更新，前台将在 5 分钟内刷新"
 *   - 保存按钮提交中显示 isLoading Spinner
 *
 * 【关键变量】
 * - form: UseFormReturn — React Hook Form 实例
 * - configs: SiteConfig[] — 从 API 加载的所有配置项
 * - isDirty: boolean — 表单是否有未保存的改动（可用于离开提示）
 */

export {}
