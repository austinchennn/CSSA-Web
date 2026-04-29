/**
 * ============================================================
 * FILE: client/hooks/useMediaQuery.ts
 * ============================================================
 *
 * 【作用】
 * 响应式断点检测 Hook。在 Client Component 中判断当前屏幕宽度，
 * 用于需要在 JS 层面区分移动/桌面渲染逻辑的场景（优先使用 Tailwind 响应式类）。
 *
 * 【依赖关系】
 * Imports from:
 *   - react (useState, useEffect)
 *
 * Exported to / Used by:
 *   - components/sections/events/Timeline.tsx : 决定时间线左右布局逻辑
 *   - 其他需要 JS 层响应式判断的组件
 *
 * 【Hook】
 * export function useMediaQuery(query: string): boolean
 *   - 参数：CSS media query 字符串（如 "(min-width: 768px)"）
 *   - 使用 window.matchMedia(query) 创建 MediaQueryList
 *   - useState 存储当前是否匹配
 *   - useEffect 监听 change 事件，媒体查询状态变化时更新 state
 *   - 服务端渲染时（window 不存在）返回 false（避免 SSR Hydration 错误）
 *   - 清理函数：removeEventListener
 *
 * 【预定义断点常量】
 * export const BREAKPOINTS = {
 *   sm: '(min-width: 640px)',
 *   md: '(min-width: 768px)',
 *   lg: '(min-width: 1024px)',
 *   xl: '(min-width: 1280px)',
 * }
 *
 * 【使用示例】
 * const isDesktop = useMediaQuery(BREAKPOINTS.lg)
 */

export {}
