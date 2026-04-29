/**
 * ============================================================
 * FILE: client/app/layout.tsx
 * ============================================================
 *
 * 【作用】
 * Next.js App Router 的根 Layout，是所有页面的最外层容器。
 * 负责挂载全站共享的基础设施：Navbar、Footer、全局字体、
 * SEO 默认 Meta 以及所有 Context Provider（如 Framer Motion
 * AnimatePresence、Zustand Provider 等）。
 *
 * 【依赖关系】
 * Imports from:
 *   - components/layout/Navbar.tsx       : 顶部导航栏组件
 *   - components/layout/Footer.tsx       : 底部版权栏组件
 *   - app/globals.css                    : 全局 CSS Design Token 注入
 *   - lib/constants/seo.ts               : 默认 SEO metadata 常量
 *   - next/font/google                   : 加载品牌字体（Inter 或自定义）
 *
 * Exported to / Used by:
 *   - Next.js 框架自动识别，包裹所有 app/ 下的页面
 *
 * 【导出 Metadata】
 * export const metadata: Metadata
 *   - title.template : "%s | UTMCSSA" — 子页面拼接标题
 *   - title.default  : "UTMCSSA — 多伦多大学密西沙加中国学生学者联合会"
 *   - description    : 全站默认 SEO 描述
 *   - openGraph      : OG 图、站点名称
 *   - icons          : favicon 配置
 *
 * 【组件】
 * export default function RootLayout({ children }): JSX.Element
 *   - 渲染 <html lang="zh"> 根节点，注入字体 className
 *   - <body> 内依次渲染：
 *       1. <Navbar />           全站顶部导航
 *       2. <main>{children}</main>  各页面内容挂载点
 *       3. <Footer />           全站底部
 *   - 用 Framer Motion <AnimatePresence mode="wait"> 包裹 children，
 *     为页面切换提供进出场动效容器（子页面自行定义 motion.div 动画）
 *
 * 【关键变量】
 * - fontSans: NextFont — Google Fonts 实例，通过 className 注入全局字体
 * - bodyClassName: string — 合并 fontSans.variable 与 Tailwind 基础类
 */

export {}
