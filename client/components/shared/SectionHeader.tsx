/**
 * ============================================================
 * FILE: client/components/shared/SectionHeader.tsx
 * ============================================================
 *
 * 【作用】
 * 全站统一的区域标题组件。用于每个页面 Section 的顶部，
 * 提供标题 + 可选副标题 + 可选装饰线的标准化样式，
 * 确保全站视觉层级一致。
 *
 * 【依赖关系】
 * Imports from:
 *   - @/lib/utils/cn.ts
 *
 * Exported to / Used by:
 *   - 几乎所有 Section 组件（home/about/team/events/sponsors）
 *
 * 【Props Interface】
 * interface SectionHeaderProps
 *   - title: string           — 主标题文字
 *   - subtitle?: string       — 副标题/描述文字（可选）
 *   - align?: 'left' | 'center' | 'right'  — 对齐方式，默认 'center'
 *   - showDivider?: boolean   — 是否显示主色装饰线（默认 true）
 *   - className?: string      — 外部追加样式
 *
 * 【组件】
 * export default function SectionHeader({ title, subtitle, align, showDivider, className }: SectionHeaderProps): JSX.Element
 *   - 容器：mb-12（与内容保持统一间距）
 *   - 标题：text-3xl md:text-4xl font-bold text-foreground
 *   - 装饰线（showDivider=true）：h-1 w-16 bg-primary rounded-full
 *     align='center' 时 mx-auto，align='left' 时 mr-auto
 *   - 副标题：text-lg text-muted-foreground mt-4，max-w-2xl（center 时 mx-auto）
 */

export {}
