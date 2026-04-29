/**
 * ============================================================
 * FILE: admin-frontend/app/(admin)/past-events/page.tsx
 * ============================================================
 *
 * 【作用】
 * 往期活动图库管理页（路由 `/admin/past-events`）。上传往期活动
 * 高清大图和总结文章，是前台 Events 页 Timeline 数据的来源。
 * 集成 TipTap 富文本编辑器支持 introduction 字段的格式化编辑。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/api/pastEvents.api.ts        : getPastEvents(), createPastEvent(), updatePastEvent(), deletePastEvent()
 *   - components/shared/RichTextEditor.tsx : TipTap 富文本编辑器
 *   - components/shared/ImageUploader.tsx  : 图片上传组件（含预览）
 *   - components/ui/ConfirmDialog.tsx      : 删除确认弹窗
 *   - lib/schemas/pastEvent.schema.ts      : Zod 校验
 *
 * 【组件】
 * export default function PastEventsPage(): JSX.Element
 *   - "use client"
 *   - 列表视图：网格卡片展示所有往期活动（封面缩略图 + 活动名 + 日期 + 操作）
 *   - 点击"添加"或"编辑"：右侧滑出 Drawer（或 Sheet 组件），包含：
 *       活动名称输入框
 *       举办日期 Date Picker
 *       封面图上传（<ImageUploader>，强制单图，预览后确认）
 *       活动总结（<RichTextEditor>，支持加粗/列表/换行）
 *   - 删除：<ConfirmDialog> 二次确认
 *
 * 【关键变量 / State】
 * - isDrawerOpen: boolean          — Drawer 开关
 * - editingEvent: PastEvent | null — null=新增，有值=编辑
 */

export {}
