/**
 * ============================================================
 * FILE: client/components/ui/Select.tsx
 * ============================================================
 *
 * 【作用】
 * 全站统一下拉选择组件，基于 Radix UI Select 封装。
 * 在 DynamicForm 中用于渲染 form_schema 中 type='select' 的字段，
 * 同时用于筛选器、部门选择等场景。
 *
 * 【依赖关系】
 * Imports from:
 *   - @radix-ui/react-select  : Select 无障碍基础组件
 *   - @/lib/utils/cn.ts
 *
 * Exported to / Used by:
 *   - components/sections/join/DynamicForm.tsx : 动态表单 select 类型字段
 *   - admin-frontend 不使用此文件（admin 有独立版本）
 *
 * 【组件集合】
 * export const Select         — Radix Select.Root 透传
 * export const SelectTrigger  — 触发按钮（显示当前选中值 + 下拉箭头）
 *   基础样式：flex h-10 w-full items-center justify-between rounded-md border
 *            border-input bg-card px-3 py-2 text-sm
 * export const SelectValue    — 当前选中值展示（含 placeholder）
 * export const SelectContent  — 下拉面板容器（z-50, shadow-md, overflow-hidden）
 * export const SelectItem     — 单个选项
 *   - 选中时文字变为 text-primary
 *   - hover 时 bg-accent
 * export const SelectGroup    — 选项分组容器（可选）
 * export const SelectLabel    — 分组标题（可选）
 *
 * 【Interface 定义】
 * interface SelectOption
 *   - value: string   — 选项实际值
 *   - label: string   — 选项展示文字
 */

export {}
