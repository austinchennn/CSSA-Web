/**
 * ============================================================
 * FILE: admin-frontend/components/dashboard/QuickActions.tsx
 * ============================================================
 *
 * 【作用】
 * 仪表盘快捷操作入口区域。展示最常用的操作按钮，
 * 减少管理员的导航层级，提升后台操作效率。
 *
 * 【依赖关系】
 * Imports from:
 *   - components/ui/Card.tsx   : Card 容器
 *   - components/ui/Button.tsx : 操作按钮
 *   - next/link                : 跳转路由
 *   - lucide-react             : 操作图标
 *
 * Exported to / Used by:
 *   - app/(admin)/page.tsx
 *
 * 【组件】
 * export default function QuickActions(): JSX.Element
 *   - 标题："快捷操作"
 *   - 操作按钮列表（Grid 2x2 或水平排列）：
 *       "发布活动"  → Link /admin/events/new（icon: Plus）
 *       "添加成员"  → Link /admin/members（icon: UserPlus，点击自动打开 Drawer）
 *       "上传往期图库" → Link /admin/past-events（icon: Image）
 *       "更新全站配置" → Link /admin/config（icon: Settings）
 *   - 每个按钮：variant="outline"，大尺寸，图标在上文字在下（或左图右文）
 */

export {}
