/**
 * ============================================================
 * FILE: admin-frontend/components/shared/ImageUploader.tsx
 * ============================================================
 *
 * 【作用】
 * 图片上传专用组件（在 FileUpload 基础上封装）。
 * 额外提供图片预览功能和 Strapi Media API 上传集成，
 * 上传成功后返回 Strapi 存储的图片 URL（非本地 Blob URL）。
 *
 * 【依赖关系】
 * Imports from:
 *   - components/ui/FileUpload.tsx  : 基础文件上传逻辑
 *   - lib/api/client.ts             : uploadMedia()（POST /api/upload）
 *   - next/image                    : 预览图
 *
 * Exported to / Used by:
 *   - components/members/MemberForm.tsx      : 成员照片上传
 *   - app/(admin)/past-events/page.tsx       : 活动封面上传
 *   - app/(admin)/sponsors/page.tsx          : 赞助商 Logo 上传
 *
 * 【Props Interface】
 * interface ImageUploaderProps
 *   - value?: string              — 当前图片 URL（已上传的，用于预览）
 *   - onChange: (url: string) => void — 上传完成后回调 Strapi 图片 URL
 *   - accept?: string             — 默认 "image/jpeg,image/png,image/webp"
 *   - aspectRatio?: '1:1' | '4:3' | '16:9' — 预览比例提示（不强制裁剪）
 *   - hint?: string               — 上传区域下方的格式建议文字
 *
 * 【组件】
 * export default function ImageUploader({ value, onChange, accept, aspectRatio, hint }: ImageUploaderProps): JSX.Element
 *   - 若 value 存在：显示已上传图片预览（next/image，object-contain）
 *       预览图上叠加"更换图片"按钮（hover 显示遮罩）
 *   - 若 value 不存在：渲染 <FileUpload> 拖拽上传区域
 *   - onFileSelect(file: File): Promise<void>
 *       1. 显示本地 URL.createObjectURL(file) 作为临时预览（即时反馈）
 *       2. 调用 uploadMedia(file)，将文件 POST 至 Strapi /api/upload
 *       3. 上传成功：获取返回的 url，调用 onChange(url)，替换临时预览
 *       4. 上传失败：清除临时预览，显示 Toast 错误提示
 *   - 上传中：在预览区显示 loading 旋转指示器
 *
 * 【关键变量 / State】
 * - previewUrl: string | null — 临时本地预览 URL 或已上传的 Strapi URL
 * - isUploading: boolean      — 控制 loading 指示器
 */

export {}
