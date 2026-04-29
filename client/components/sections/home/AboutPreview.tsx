/**
 * ============================================================
 * FILE: client/components/sections/home/AboutPreview.tsx
 * ============================================================
 *
 * 【作用】
 * 首页"社团简介"预览区域。用 2-3 段简短文案介绍 UTMCSSA 的定位和使命，
 * 配合一张代表性图片（左图右文或右图左文布局），并附"了解更多"链接跳转 /about。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/types/cms.types.ts   : AboutPreviewData 类型
 *   - components/ui/Button.tsx : 跳转按钮
 *   - components/shared/AnimatedSection.tsx : 滚动进场
 *   - next/image               : 配图
 *   - next/link                : 跳转 /about
 *
 * Exported to / Used by:
 *   - app/page.tsx
 *
 * 【Props Interface】
 * interface AboutPreviewProps
 *   - data: AboutPreviewData — 含 title, description, imageUrl, imageAlt
 *
 * 【组件】
 * export default function AboutPreview({ data }: AboutPreviewProps): JSX.Element
 *   - 两列布局（md:grid-cols-2），在移动端变为单列
 *   - 图片列：使用 next/image，aspect-ratio 4/3，rounded-lg，overflow-hidden
 *   - 文字列：标题 + 描述文字 + "了解更多 →" 按钮
 *   - 文字与图片顺序在每次使用时可通过 reverse prop 交替，增加视觉多样性
 *
 * 【额外 Props】
 * - reverse?: boolean — 是否反转左右布局，默认 false
 */

export {}
