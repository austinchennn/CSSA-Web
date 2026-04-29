/**
 * ============================================================
 * FILE: client/components/layout/Navbar.tsx
 * ============================================================
 *
 * 【作用】
 * 全站顶部导航栏。固定在页面顶部（sticky/fixed），在桌面端显示水平导航链接，
 * 在移动端显示 Hamburger 按钮并控制 <MobileMenu> 抽屉的开关状态。
 * 滚动超过阈值后添加毛玻璃背景（backdrop-blur）增强层次感。
 *
 * 【依赖关系】
 * Imports from:
 *   - components/layout/MobileMenu.tsx   : 移动端全屏菜单抽屉
 *   - lib/constants/routes.ts            : NAV_LINKS 导航链接配置数组
 *   - lib/store/ui.store.ts              : useUIStore — 读写 isMobileMenuOpen 状态
 *   - next/link                          : 无刷新路由跳转
 *   - next/image                         : 渲染 CSSA Logo
 *   - next/navigation (usePathname)      : 判断当前路由，高亮 active 链接
 *
 * Exported to / Used by:
 *   - app/layout.tsx : 挂载于根 Layout，全站所有页面共用
 *
 * 【组件】
 * export default function Navbar(): JSX.Element
 *   - 使用 usePathname() 获取当前路径，与每个 NAV_LINK.href 对比确定 active 态
 *   - 使用 useEffect + window.scrollY 监听滚动，超过 80px 时设 isScrolled=true
 *   - isScrolled=true 时为 <nav> 添加 bg-card/90 + backdrop-blur-md + shadow-sm
 *   - 桌面端（md 以上）：水平渲染 NAV_LINKS，active 链接加 text-primary 和下划线
 *   - 移动端（md 以下）：隐藏链接列表，显示 Hamburger 图标按钮
 *   - 点击 Hamburger 调用 toggleMobileMenu() 切换抽屉状态
 *   - CSSA Logo 点击跳转首页 /
 *
 * 【关键变量 / State / Hooks】
 * - NAV_LINKS: NavLink[]        — 从 routes.ts 导入，含 { label, href } 对象
 * - isScrolled: boolean         — 本地 state，控制毛玻璃背景
 * - pathname: string            — usePathname() 返回值
 * - isMobileMenuOpen: boolean   — 来自 Zustand store
 * - toggleMobileMenu: () => void — 来自 Zustand store
 */

export {}
