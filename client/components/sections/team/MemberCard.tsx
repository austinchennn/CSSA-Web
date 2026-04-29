/**
 * ============================================================
 * FILE: client/components/sections/team/MemberCard.tsx
 * ============================================================
 *
 * 【作用】
 * 单个成员展示卡片。显示成员照片（统一风格，正方形裁剪）、
 * 姓名和职位 Title。是 Team 页面的最小展示单元。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/types/cms.types.ts : Member 类型
 *   - components/ui/Card.tsx : Card 容器
 *   - next/image             : 成员照片（必须含 alt={member.name}）
 *
 * Exported to / Used by:
 *   - components/sections/team/DepartmentGroup.tsx
 *
 * 【Props Interface】
 * interface MemberCardProps
 *   - member: Member — 含 id, name, title, photo_url, department 等字段
 *
 * 【组件】
 * export default function MemberCard({ member }: MemberCardProps): JSX.Element
 *   - 卡片布局（竖向，居中对齐）：
 *       1. 照片区域：正方形容器（aspect-square），overflow-hidden，rounded-full 或 rounded-lg
 *          <Image src={member.photo_url} alt={member.name} fill objectFit="cover" />
 *       2. 姓名：text-base font-semibold mt-3 text-center
 *       3. 职位：text-sm text-muted-foreground text-center
 *   - hover 时：shadow-md transform scale-[1.02]，transition-all duration-200
 *   - 由于 photo_url 在数据库层强制必填，此处无需处理图片缺失 fallback
 *
 * 【注意】
 * - 照片必须使用 next/image，并设置适当的 sizes 属性
 * - alt 属性严格使用成员姓名（可访问性要求）
 */

export {}
