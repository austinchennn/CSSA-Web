/**
 * ============================================================
 * FILE: client/lib/utils/cn.ts
 * ============================================================
 *
 * 【作用】
 * className 合并工具函数。结合 clsx（条件类名）和 tailwind-merge
 * （Tailwind 冲突解决）提供 cn() 函数，是全站所有组件合并
 * className 的标准方式。
 *
 * 【依赖关系】
 * npm packages:
 *   - clsx           : 条件性 className 合并
 *   - tailwind-merge : 解决 Tailwind 类名冲突（如 'p-4' 和 'p-6' 只保留后者）
 *
 * Imported by:
 *   - 几乎所有 components/ui/*.tsx 组件
 *   - components/layout/*.tsx
 *   - components/sections/**/*.tsx
 *
 * 【函数】
 * export function cn(...inputs: ClassValue[]): string
 *   - 接受任意数量的 className 值（字符串、对象、数组，undefined/null 被忽略）
 *   - 先经 clsx 合并为单个字符串
 *   - 再经 tailwind-merge 去除冲突的 Tailwind 类
 *   - 返回最终合并后的 className 字符串
 *
 * 【使用示例】
 * cn("px-4 py-2", isActive && "bg-primary text-white", className)
 * → 若 isActive=true："px-4 py-2 bg-primary text-white [外部className]"
 */

export {}
