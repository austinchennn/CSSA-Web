/**
 * ============================================================
 * FILE: admin-frontend/components/ui/FileUpload.tsx
 * ============================================================
 *
 * 【作用】
 * 通用文件上传组件（基础版）。支持拖拽上传和点击选择文件，
 * 内置文件类型和大小校验，上传成功后回调返回文件对象。
 * 具体业务封装（图片预览、Strapi Media 上传）由 ImageUploader 处理。
 *
 * 【依赖关系】
 * Imported by:
 *   - components/shared/ImageUploader.tsx : 组合使用，图片专用版
 *
 * 【Props Interface】
 * interface FileUploadProps
 *   - onFileSelect: (file: File) => void — 文件选中回调
 *   - accept?: string         — 接受的文件类型（如 "image/jpeg,image/png"）
 *   - maxSizeMB?: number      — 最大文件大小（MB），默认 10
 *   - isDisabled?: boolean
 *   - children?: React.ReactNode — 自定义上传区域内容（可选）
 *
 * 【组件】
 * export default function FileUpload({ onFileSelect, accept, maxSizeMB, isDisabled }: FileUploadProps): JSX.Element
 *   - 拖拽区域：onDragOver / onDrop 事件处理
 *       拖拽悬停时：border-primary bg-accent（视觉反馈）
 *   - 点击区域：隐藏的 <input type="file">，点击 div 触发 inputRef.current.click()
 *   - 文件校验（onFileSelect 调用前）：
 *       类型校验：file.type 是否匹配 accept
 *       大小校验：file.size > maxSizeMB * 1024 * 1024 时显示错误
 *   - 错误信息：组件内部展示 text-destructive 小字错误提示
 *   - 默认 UI（无 children 时）：云图标 + "点击上传或拖拽文件至此处" 文字 + 格式/大小说明
 *
 * 【关键变量 / State】
 * - isDragging: boolean  — 拖拽悬停状态
 * - error: string | null — 文件校验错误信息
 */

export {}
