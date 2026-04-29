/**
 * ============================================================
 * FILE: client/components/sections/sponsors/TierSection.tsx
 * ============================================================
 *
 * 【作用】
 * 赞助档位权益展示区域。用表格或卡片形式展示不同赞助级别（Gold/Silver/Bronze）
 * 对应的权益清单，帮助潜在赞助商快速理解合作价值。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/types/cms.types.ts   : SponsorTier, TierBenefit 类型
 *   - components/ui/Badge.tsx  : 档位标签（gold/silver/bronze 颜色）
 *   - components/ui/Card.tsx   : 档位卡片容器
 *   - components/shared/SectionHeader.tsx
 *
 * Exported to / Used by:
 *   - app/sponsors/page.tsx
 *
 * 【Props Interface】
 * interface TierSectionProps
 *   - tiers: SponsorTier[] — 档位数组，每项含 name, color, price, benefits[]
 *
 * 【组件】
 * export default function TierSection({ tiers }: TierSectionProps): JSX.Element
 *   - 区域标题："赞助档位与权益"
 *   - 三列（或两列 + 一列特显）卡片布局
 *   - 每个档位卡片：
 *       顶部：档位名称 Badge + 价格区间
 *       中部：权益清单（checkmark 图标 + 权益描述）
 *       底部："联系我们" CTA 按钮（跳转 /contact）
 *   - Gold 档位卡片使用 ring-2 ring-primary 高亮边框突出
 *
 * 【关键变量】
 * - TIER_COLORS: Record<string, string> — 档位名 → Badge variant 的映射表
 */

export {}
