# Simon 后台前端开发 SOP
> 写给你的，用人话解释每一步怎么做。按顺序来，别跳。

---

## 先搞清楚你在做什么

你负责的是 `admin-frontend/` 这个文件夹，就是管理员用的后台网站。  
管理员登进去可以：加成员、发活动、审批报名、导出名单等等。

**整体架构就这三层，从底到顶：**

```
① 类型定义（TypeScript 接口）
      ↓
② API 函数（fetch 调用后端）
      ↓
③ TanStack Query Hooks（缓存和自动刷新）
      ↓
④ React 组件（UI 展示）
      ↓
⑤ 页面（把组件拼起来）
```

你要按这个顺序写，**不要上来就写 UI**，否则会因为没有数据类型而写得很痛苦。

---

## 第一步：配置环境变量

在 `admin-frontend/` 目录下新建 `.env.local` 文件：

```env
# Strapi 后端地址（本地开发用这个）
NEXT_PUBLIC_API_URL=http://localhost:1337

# NestJS 微服务地址（CSV 导出用）
NEXT_PUBLIC_MICROSERVICE_URL=http://localhost:3002

# 注意：凡是加了 NEXT_PUBLIC_ 前缀的变量，浏览器端代码才能读到
# Strapi API Token 千万不要加 NEXT_PUBLIC_ 前缀！token 要藏起来
```

> ⚠️ `.env.local` 不会被 git 追踪，每个人本地都要自己建。  
> API Token 从 Austin 那拿，或者自己在 Strapi Admin → Settings → API Tokens 里生成一个 Full Access 的。

---

## 第二步：安装依赖

```bash
cd admin-frontend
npm install
```

看 `package.json` 里已经有这些必要依赖，确认都在：
- `@tanstack/react-query` — 数据请求缓存
- `sonner` — Toast 提示（右上角弹出的那种消息）
- `react-hook-form` — 表单
- `zod` + `@hookform/resolvers` — 表单校验规则
- `@radix-ui/react-*` — UI 组件
- `lucide-react` — 图标库

---

## 第三步：写类型定义（admin.types.ts）

**文件位置：** `admin-frontend/lib/types/admin.types.ts`

这个文件定义所有数据长什么样。你先把它写好，后面所有地方都要用到。

**直接把下面这段代码覆盖掉文件里的 `export {}`：**

```typescript
// ============ Strapi 通用分页信息 ============
export interface StrapiMeta {
  pagination: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}

// ============ 枚举类型 ============
export type EventStatus = 'upcoming' | 'active' | 'closed'
export type RegistrationStatus = 'pending' | 'confirmed' | 'cancelled'
export type SponsorTier = 'gold' | 'silver' | 'bronze'

// ============ 部门 ============
export interface Department {
  id: string
  name: string
  leaderName: string
  introduction?: string
}

export interface DepartmentFormData {
  name: string
  leaderName: string
  introduction?: string
}

// ============ 成员 ============
export interface Member {
  id: string
  name: string
  title: string
  photoUrl: string
  photoId: string      // Strapi 媒体文件的 ID，更新图片时用
  order: number
  department: Department
  createdAt: string
  updatedAt: string
}

export interface MemberFormData {
  name: string
  title: string
  deptId: string
  order: number
  photoUrl: string     // 上传后的图片 URL
  photoId?: string     // 上传后的媒体 ID
}

// ============ 活动 ============
export interface FormField {
  field: string        // 字段的 key，如 "wechat"
  label: string        // 字段的中文名，如 "微信号"
  type: 'text' | 'number' | 'email' | 'tel' | 'select'
  required: boolean
  options?: string[]   // type='select' 时才有，如 ["大一","大二","大三"]
}

export interface Event {
  id: string
  title: string
  startTime: string
  endTime?: string
  capacity?: number
  formSchema: FormField[]
  status: EventStatus
  registrationCount?: number   // 后端额外计算的报名人数
  createdAt: string
}

export interface EventFormData {
  title: string
  startTime: Date
  endTime?: Date
  capacity?: number
  formSchema: FormField[]
}

// ============ 报名记录 ============
export interface Registration {
  id: string
  eventId: string
  userInfo: Record<string, string | number>  // 动态的，key 是表单字段名
  status: RegistrationStatus
  createdAt: string
}

// ============ 往期活动 ============
export interface PastEvent {
  id: string
  eventName: string
  introduction: string
  photo: { url: string; id: string }
  eventDate: string
}

export interface PastEventFormData {
  eventName: string
  introduction: string
  eventDate: Date
  photoUrl: string
  photoId?: string
}

// ============ 赞助商 ============
export interface Sponsor {
  id: string
  name: string
  logo: { url: string; id: string }
  websiteUrl?: string
  tier: SponsorTier
  description?: string
  displayOrder?: number
}

export interface SponsorFormData {
  name: string
  logoUrl: string
  logoId?: string
  tier: SponsorTier
  websiteUrl?: string
  description?: string
}

// ============ 全站配置 ============
export interface SiteConfig {
  id: string
  key: string
  value: string | object
  description?: string
}

// ============ 管理员用户 ============
export interface AdminUser {
  username: string
  email: string
  avatarInitials: string
}
```

---

## 第四步：写 API 基础客户端（client.ts）

**文件位置：** `admin-frontend/lib/api/client.ts`

这个文件是所有 API 请求的"总开关"。你写好这一个，后面所有 API 函数都用它发请求。

**它做这几件事：**
1. 自动在每个请求头里加上 `Authorization: Bearer xxx`（不用每次手动加）
2. 遇到 401（没权限）自动跳转到登录页
3. 遇到其他错误，抛出异常（让上层处理）

```typescript
'use client'  // 这个文件会在浏览器端运行

// Token 存在 cookie 里。怎么存进去？登录成功后 document.cookie = 'admin_token=xxx; path=/'
function getToken(): string {
  // 从 cookie 里读取 admin_token
  const match = document.cookie.match(/admin_token=([^;]+)/)
  return match ? match[1] : ''
}

function clearToken(): void {
  document.cookie = 'admin_token=; path=/; max-age=0'
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:1337'

export interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: unknown
  params?: Record<string, string | number | boolean>
}

export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<{ data: T; meta?: any }> {
  const { method = 'GET', body, params } = options

  // 拼接 query 参数，比如 ?populate=event&pagination[pageSize]=25
  let url = `${BASE_URL}${endpoint}`
  if (params) {
    const qs = new URLSearchParams()
    Object.entries(params).forEach(([k, v]) => qs.append(k, String(v)))
    url += '?' + qs.toString()
  }

  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  // 401 = token 失效，踢回登录页
  if (res.status === 401) {
    clearToken()
    window.location.href = '/login'
    throw new Error('未登录或登录已过期')
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message ?? `请求失败（${res.status}）`)
  }

  return res.json()
}

// 上传图片到 Strapi（返回图片 URL 和媒体 ID）
export async function uploadMedia(
  file: File
): Promise<{ url: string; id: string }> {
  const formData = new FormData()
  formData.append('files', file)

  const res = await fetch(`${BASE_URL}/api/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}` },
    // 注意：上传不设 Content-Type，让浏览器自动设置 multipart/form-data
    body: formData,
  })

  if (!res.ok) throw new Error('图片上传失败')

  const result = await res.json()
  // Strapi upload 返回数组，取第一个
  return {
    url: result[0].url,
    id: String(result[0].id),
  }
}

export function logout(): void {
  clearToken()
  window.location.href = '/login'
}
```

---

## 第五步：写各资源的 API 函数

> **规律总结**：Strapi REST API 的响应格式永远是这样的：
> ```json
> {
>   "data": {
>     "id": 1,
>     "attributes": { /* 实际数据在这里 */ }
>   },
>   "meta": { "pagination": {...} }
> }
> ```
> 所以你每次都要从 `item.attributes` 里拿字段，不是直接 `item.xxx`。
> 写一个 helper 函数 `flattenStrapiItem` 把这层拍平会省很多重复代码。

### 通用工具函数（建议放在 client.ts 里或新建 utils.ts）

```typescript
// 把 Strapi 的 { id, attributes: {...} } 拍平成 { id, ...attributes }
export function flattenStrapiItem<T>(item: { id: number | string; attributes: T }): T & { id: string } {
  return { id: String(item.id), ...item.attributes }
}

export function flattenStrapiList<T>(
  items: Array<{ id: number | string; attributes: T }>
): Array<T & { id: string }> {
  return items.map(flattenStrapiItem)
}
```

---

### 5.1 成员 API（members.api.ts）

```typescript
import { apiRequest, uploadMedia } from './client'
import type { Member, MemberFormData } from '../types/admin.types'
import { flattenStrapiList, flattenStrapiItem } from './client'

// 查询所有成员（支持按姓名搜索 + 按部门筛选）
export async function getMembers(
  params: { search?: string; deptId?: string } = {}
): Promise<Member[]> {
  const query: Record<string, string> = {
    'populate': 'department,photo',
    'sort': 'order:desc',
  }
  if (params.search) query['filters[name][$contains]'] = params.search
  if (params.deptId) query['filters[department][id][$eq]'] = params.deptId

  const res = await apiRequest<any[]>('/api/members', { params: query as any })
  
  return flattenStrapiList(res.data).map((item: any) => ({
    id: item.id,
    name: item.name,
    title: item.title,
    photoUrl: item.photo?.data?.attributes?.url ?? '',
    photoId: String(item.photo?.data?.id ?? ''),
    order: item.order ?? 0,
    department: item.department?.data
      ? flattenStrapiItem(item.department.data)
      : { id: '', name: '未分配', leaderName: '' },
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }))
}

// 获取成员总数（给仪表盘用）
export async function getMembersCount(): Promise<number> {
  const res = await apiRequest<any>('/api/members', {
    params: { 'pagination[pageSize]': 1 } as any,
  })
  return res.meta?.pagination?.total ?? 0
}

// 新建成员
// 注意：要先用 uploadMedia() 上传图片，拿到 photoId 再传进来
export async function createMember(data: MemberFormData): Promise<void> {
  await apiRequest('/api/members', {
    method: 'POST',
    body: {
      data: {
        name: data.name,
        title: data.title,
        order: data.order,
        department: data.deptId,         // 传 ID 字符串
        photo: data.photoId ?? null,     // 传媒体 ID
      },
    },
  })
}

// 更新成员
export async function updateMember(
  id: string,
  data: Partial<MemberFormData>
): Promise<void> {
  await apiRequest(`/api/members/${id}`, {
    method: 'PUT',
    body: {
      data: {
        ...(data.name && { name: data.name }),
        ...(data.title && { title: data.title }),
        ...(data.order !== undefined && { order: data.order }),
        ...(data.deptId && { department: data.deptId }),
        ...(data.photoId && { photo: data.photoId }),
      },
    },
  })
}

// 删除成员
export async function deleteMember(id: string): Promise<void> {
  await apiRequest(`/api/members/${id}`, { method: 'DELETE' })
}
```

---

### 5.2 活动 API（events.api.ts）

```typescript
import { apiRequest } from './client'
import { flattenStrapiList, flattenStrapiItem } from './client'
import type { Event, EventFormData, EventStatus } from '../types/admin.types'

export async function getEvents(status?: EventStatus): Promise<Event[]> {
  const params: Record<string, string> = { 'sort': 'start_time:desc' }
  if (status) params['filters[status][$eq]'] = status

  const res = await apiRequest<any[]>('/api/events', { params: params as any })

  return flattenStrapiList(res.data).map((item: any) => ({
    id: item.id,
    title: item.title,
    startTime: item.start_time,
    capacity: item.capacity ?? undefined,
    formSchema: item.form_schema ?? [],
    status: item.status,
    registrationCount: item.registrationCount ?? 0,  // 后端额外加的字段
    createdAt: item.createdAt,
  }))
}

export async function getEventById(id: string): Promise<Event> {
  const res = await apiRequest<any>(`/api/events/${id}`)
  const item = flattenStrapiItem(res.data)
  return {
    id: item.id,
    title: (item as any).title,
    startTime: (item as any).start_time,
    capacity: (item as any).capacity ?? undefined,
    formSchema: (item as any).form_schema ?? [],
    status: (item as any).status,
    registrationCount: (item as any).registrationCount ?? 0,
    createdAt: (item as any).createdAt,
  }
}

// 获取进行中活动数（给仪表盘用）
export async function getActiveEventsCount(): Promise<number> {
  const res = await apiRequest<any>('/api/events', {
    params: {
      'filters[status][$eq]': 'active',
      'pagination[pageSize]': 1,
    } as any,
  })
  return res.meta?.pagination?.total ?? 0
}

export async function createEvent(data: EventFormData): Promise<void> {
  await apiRequest('/api/events', {
    method: 'POST',
    body: {
      data: {
        title: data.title,
        start_time: data.startTime.toISOString(),
        capacity: data.capacity ?? null,
        form_schema: data.formSchema,
        status: 'upcoming',
      },
    },
  })
}

export async function updateEvent(
  id: string,
  data: Partial<EventFormData>
): Promise<void> {
  await apiRequest(`/api/events/${id}`, {
    method: 'PUT',
    body: {
      data: {
        ...(data.title && { title: data.title }),
        ...(data.startTime && { start_time: data.startTime.toISOString() }),
        ...(data.capacity !== undefined && { capacity: data.capacity }),
        ...(data.formSchema && { form_schema: data.formSchema }),
      },
    },
  })
}

// 单独开关报名通道（改状态）
export async function updateEventStatus(
  id: string,
  status: EventStatus
): Promise<void> {
  await apiRequest(`/api/events/${id}`, {
    method: 'PUT',
    body: { data: { status } },
  })
}

export async function deleteEvent(id: string): Promise<void> {
  await apiRequest(`/api/events/${id}`, { method: 'DELETE' })
}
```

---

### 5.3 报名记录 API（registrations.api.ts）

```typescript
import { apiRequest } from './client'
import { flattenStrapiList } from './client'
import type { Registration, RegistrationStatus } from '../types/admin.types'

export async function getRegistrationsByEvent(
  eventId: string
): Promise<Registration[]> {
  const res = await apiRequest<any[]>('/api/registrations', {
    params: {
      'filters[event][id][$eq]': eventId,
      'sort': 'createdAt:desc',
      'pagination[pageSize]': 200,
    } as any,
  })

  return flattenStrapiList(res.data).map((item: any) => ({
    id: item.id,
    eventId,
    userInfo: item.user_info ?? {},
    status: item.status,
    createdAt: item.createdAt,
  }))
}

// 本月报名总数（给仪表盘用）
export async function getMonthlyRegistrationsCount(): Promise<number> {
  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString()

  const res = await apiRequest<any>('/api/registrations', {
    params: {
      'filters[createdAt][$gte]': monthStart,
      'filters[createdAt][$lte]': monthEnd,
      'pagination[pageSize]': 1,
    } as any,
  })
  return res.meta?.pagination?.total ?? 0
}

// 审批：改状态
export async function updateRegistrationStatus(
  id: string,
  status: RegistrationStatus
): Promise<void> {
  await apiRequest(`/api/registrations/${id}`, {
    method: 'PUT',
    body: { data: { status } },
  })
}

// 删除（一般不用，谨慎）
export async function deleteRegistration(id: string): Promise<void> {
  await apiRequest(`/api/registrations/${id}`, { method: 'DELETE' })
}
```

---

### 5.4 CSV 导出（不走 Strapi，走 NestJS 微服务）

这个跟其他 API 不一样，不调用 Strapi，调用 NestJS 微服务（端口 3002）。  
直接在用到的地方写，不用封装到 api 文件里：

```typescript
// 在 ExportCSVButton 组件里这样写：
const MICROSERVICE_URL = process.env.NEXT_PUBLIC_MICROSERVICE_URL ?? 'http://localhost:3002'

async function handleExport(eventId: string) {
  const res = await fetch(
    `${MICROSERVICE_URL}/api/v1/registrations/export?eventId=${eventId}`
  )
  if (!res.ok) throw new Error('导出失败')
  
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `registrations-event-${eventId}.csv`
  a.click()
  URL.revokeObjectURL(url)
}
```

---

## 第六步：写 TanStack Query Hooks

> **TanStack Query 是什么？** 就是一个帮你管理"请求状态"的库。
> 你告诉它"去哪拿数据"，它帮你处理加载中/成功/失败三种状态，还会自动缓存，
> 不用每次都重新发请求。

### 6.1 成员 Hooks（useMembers.ts）

```typescript
'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  getMembers, getMembersCount, createMember, updateMember, deleteMember,
} from '../api/members.api'
import type { Member, MemberFormData } from '../types/admin.types'

const KEY = ['members']  // 缓存的名字，invalidate 时用这个

// 查询成员列表
export function useMembers(filters?: { search?: string; deptId?: string }) {
  return useQuery({
    queryKey: [...KEY, filters],
    queryFn: () => getMembers(filters),
    staleTime: 30_000,  // 30 秒内不重新请求
  })
}

// 查询成员总数
export function useMembersCount() {
  return useQuery({
    queryKey: [...KEY, 'count'],
    queryFn: getMembersCount,
  })
}

// 新建成员
export function useCreateMember() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: MemberFormData) => createMember(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEY })  // 让列表自动刷新
      toast.success('成员添加成功')
    },
    onError: (err: Error) => toast.error(`添加失败：${err.message}`),
  })
}

// 更新成员
export function useUpdateMember() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<MemberFormData> }) =>
      updateMember(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEY })
      toast.success('成员信息已更新')
    },
    onError: (err: Error) => toast.error(`更新失败：${err.message}`),
  })
}

// 删除成员
export function useDeleteMember() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteMember(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEY })
      toast.success('成员已删除')
    },
    onError: (err: Error) => toast.error(`删除失败：${err.message}`),
  })
}
```

其他资源（Events、Registrations、Departments）的 hooks 结构完全一样，把 API 函数换一下就行。

---

## 第七步：写组件

### 7.1 整体布局已经有了

看 `app/(admin)/layout.tsx`，里面已经有侧边栏 + 顶部导航的骨架，  
直接在这个基础上填内容。

**侧边栏导航链接（在 AdminSidebar.tsx 里）：**

```typescript
const navItems = [
  { href: '/admin', label: '仪表盘', icon: LayoutDashboard },
  { href: '/admin/members', label: '成员管理', icon: Users },
  { href: '/admin/events', label: '活动管理', icon: Calendar },
  { href: '/admin/departments', label: '部门管理', icon: Building2 },
  { href: '/admin/past-events', label: '往期活动', icon: Archive },
  { href: '/admin/sponsors', label: '赞助商', icon: Star },
  { href: '/admin/config', label: '全站配置', icon: Settings },
]
```

---

### 7.2 成员管理页面（这个最典型，学会了其他都一样）

**页面（`app/(admin)/members/page.tsx`）：**

```tsx
'use client'

import { useState } from 'react'
import { useMembers } from '@/lib/hooks/useMembers'
import { useDepartments } from '@/lib/hooks/useDepartments'
import MemberTable from '@/components/members/MemberTable'
import MemberDrawer from '@/components/members/MemberDrawer'
import type { Member } from '@/lib/types/admin.types'

export default function MembersPage() {
  const [search, setSearch] = useState('')
  const [selectedDept, setSelectedDept] = useState<string | null>(null)
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<Member | null>(null)

  const { data: members = [], isLoading } = useMembers({ search, deptId: selectedDept ?? undefined })
  const { data: departments = [] } = useDepartments()

  function handleAddNew() {
    setEditingMember(null)   // null = 新增模式
    setDrawerOpen(true)
  }

  function handleEdit(member: Member) {
    setEditingMember(member) // 有值 = 编辑模式
    setDrawerOpen(true)
  }

  return (
    <div className="space-y-4">
      {/* 顶部工具栏 */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">成员管理</h1>
        <button
          onClick={handleAddNew}
          className="bg-primary text-white px-4 py-2 rounded-md"
        >
          + 添加成员
        </button>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex gap-2">
        <input
          placeholder="搜索姓名..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <select
          value={selectedDept ?? ''}
          onChange={(e) => setSelectedDept(e.target.value || null)}
          className="border rounded px-3 py-2"
        >
          <option value="">全部部门</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
      </div>

      {/* 表格 */}
      <MemberTable
        members={members}
        isLoading={isLoading}
        onEdit={handleEdit}
      />

      {/* 添加/编辑抽屉 */}
      <MemberDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        member={editingMember}
      />
    </div>
  )
}
```

---

### 7.3 MemberTable 组件

这个组件负责把成员列表渲染成表格：

```tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useDeleteMember } from '@/lib/hooks/useMembers'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import type { Member } from '@/lib/types/admin.types'

interface Props {
  members: Member[]
  isLoading: boolean
  onEdit: (member: Member) => void
}

export default function MemberTable({ members, isLoading, onEdit }: Props) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const deleteMember = useDeleteMember()

  if (isLoading) {
    // 骨架屏：用灰色占位块代替真实数据
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-muted rounded animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left text-sm text-muted-foreground">
            <th className="py-3 px-4">头像</th>
            <th className="py-3 px-4">姓名</th>
            <th className="py-3 px-4">职位</th>
            <th className="py-3 px-4">部门</th>
            <th className="py-3 px-4">排序</th>
            <th className="py-3 px-4">操作</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id} className="border-b hover:bg-muted/50">
              <td className="py-3 px-4">
                <Image
                  src={member.photoUrl}
                  alt={member.name}
                  width={40} height={40}
                  className="rounded-full object-cover"
                />
              </td>
              <td className="py-3 px-4 font-medium">{member.name}</td>
              <td className="py-3 px-4 text-muted-foreground">{member.title}</td>
              <td className="py-3 px-4">{member.department.name}</td>
              <td className="py-3 px-4">{member.order}</td>
              <td className="py-3 px-4 flex gap-2">
                <button
                  onClick={() => onEdit(member)}
                  className="text-sm text-primary hover:underline"
                >
                  编辑
                </button>
                <button
                  onClick={() => setDeletingId(member.id)}
                  className="text-sm text-destructive hover:underline"
                >
                  删除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 删除确认弹窗 */}
      <ConfirmDialog
        isOpen={deletingId !== null}
        title="确认删除成员"
        description="删除后无法恢复，确定要继续吗？"
        onConfirm={() => {
          if (deletingId) {
            deleteMember.mutate(deletingId)
            setDeletingId(null)
          }
        }}
        onCancel={() => setDeletingId(null)}
      />
    </>
  )
}
```

---

### 7.4 MemberDrawer 组件（侧边抽屉）

```tsx
'use client'

import { useState } from 'react'
import { useCreateMember, useUpdateMember } from '@/lib/hooks/useMembers'
import ImageUploader from '@/components/shared/ImageUploader'
import type { Member, MemberFormData } from '@/lib/types/admin.types'

interface Props {
  isOpen: boolean
  onClose: () => void
  member: Member | null
}

export default function MemberDrawer({ isOpen, onClose, member }: Props) {
  const isEditing = member !== null
  const createMember = useCreateMember()
  const updateMember = useUpdateMember()

  const [formData, setFormData] = useState<MemberFormData>({
    name: member?.name ?? '',
    title: member?.title ?? '',
    deptId: member?.department.id ?? '',
    order: member?.order ?? 0,
    photoUrl: member?.photoUrl ?? '',
    photoId: member?.photoId ?? '',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (isEditing) {
      await updateMember.mutateAsync({ id: member.id, data: formData })
    } else {
      await createMember.mutateAsync(formData)
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    // 遮罩层
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
      {/* 抽屉面板 */}
      <div className="w-[480px] bg-white h-full shadow-xl flex flex-col">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {isEditing ? '编辑成员信息' : '添加新成员'}
          </h2>
          <button onClick={onClose} className="text-muted-foreground">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          <div>
            <label className="text-sm font-medium">姓名</label>
            <input
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">职位 Title</label>
            <input
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">头像照片</label>
            <ImageUploader
              value={formData.photoUrl}
              onChange={(url, id) => setFormData({ ...formData, photoUrl: url, photoId: id })}
              hint="建议 1:1 正方形图片，JPG/PNG 格式"
            />
          </div>

          <button
            type="submit"
            disabled={createMember.isPending || updateMember.isPending}
            className="w-full bg-primary text-white py-2 rounded-md disabled:opacity-50"
          >
            {createMember.isPending || updateMember.isPending ? '提交中...' : '保存'}
          </button>
        </form>
      </div>
    </div>
  )
}
```

---

### 7.5 SchemaBuilder — 动态表单构造器（最复杂的组件）

这个是创建活动时，用来配置"报名表单收集哪些字段"的可视化编辑器。

```
用户看到的效果：
┌──────────────────────────────────────┐
│ 报名表单字段配置                       │
├──────────────────────────────────────┤
│ [文本] 姓名      [必填 ✓]  [× 删除]  │
│ [文本] 微信号    [必填 ✓]  [× 删除]  │
│ [下拉] 年级      [必填 ✓]  [× 删除]  │
│   选项：大一 | 大二 | 大三 | 大四      │
├──────────────────────────────────────┤
│ [+ 添加输入项 ▼]                     │
└──────────────────────────────────────┘
```

```tsx
'use client'

import { useState } from 'react'
import type { FormField } from '@/lib/types/admin.types'

type FieldType = 'text' | 'number' | 'email' | 'tel' | 'select'

const TYPE_LABELS: Record<FieldType, string> = {
  text: '单行文本',
  number: '数字',
  email: '邮件',
  tel: '电话',
  select: '下拉选择',
}

interface Props {
  value: FormField[]
  onChange: (schema: FormField[]) => void
}

export default function SchemaBuilder({ value, onChange }: Props) {
  const [showTypeMenu, setShowTypeMenu] = useState(false)

  function addField(type: FieldType) {
    const newField: FormField = { field: '', label: '', type, required: false }
    onChange([...value, newField])
    setShowTypeMenu(false)
  }

  function updateField(index: number, update: Partial<FormField>) {
    const next = [...value]
    next[index] = { ...next[index], ...update }
    onChange(next)
  }

  function removeField(index: number) {
    onChange(value.filter((_, i) => i !== index))
  }

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <p className="text-sm font-medium text-muted-foreground">
        报名表单字段配置（前台用户填写的内容）
      </p>

      {/* 已添加的字段列表 */}
      {value.map((field, i) => (
        <div key={i} className="flex items-start gap-2 p-3 border rounded bg-muted/30">
          {/* 类型标签 */}
          <span className="text-xs bg-primary/10 text-primary rounded px-2 py-1 mt-1 shrink-0">
            {TYPE_LABELS[field.type as FieldType]}
          </span>

          <div className="flex-1 grid grid-cols-2 gap-2">
            {/* 字段 key（英文，存数据库用） */}
            <input
              placeholder="字段 key（如 wechat）"
              value={field.field}
              onChange={(e) => updateField(i, { field: e.target.value })}
              className="border rounded px-2 py-1 text-sm"
            />
            {/* 字段显示名（中文，给用户看） */}
            <input
              placeholder="显示名（如 微信号）"
              value={field.label}
              onChange={(e) => updateField(i, { label: e.target.value })}
              className="border rounded px-2 py-1 text-sm"
            />

            {/* 下拉选项（只有 type=select 时显示） */}
            {field.type === 'select' && (
              <div className="col-span-2">
                <input
                  placeholder="选项，用逗号分隔，如：大一,大二,大三,大四"
                  value={field.options?.join(',') ?? ''}
                  onChange={(e) =>
                    updateField(i, { options: e.target.value.split(',').map((s) => s.trim()) })
                  }
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              </div>
            )}
          </div>

          {/* 必填开关 */}
          <label className="flex items-center gap-1 text-sm shrink-0 mt-1 cursor-pointer">
            <input
              type="checkbox"
              checked={field.required}
              onChange={(e) => updateField(i, { required: e.target.checked })}
            />
            必填
          </label>

          {/* 删除按钮 */}
          <button
            onClick={() => removeField(i)}
            className="text-destructive text-sm mt-1"
          >
            ×
          </button>
        </div>
      ))}

      {/* 添加字段按钮 */}
      <div className="relative">
        <button
          onClick={() => setShowTypeMenu(!showTypeMenu)}
          className="border border-dashed rounded px-4 py-2 text-sm text-muted-foreground hover:text-foreground w-full"
        >
          + 添加输入项
        </button>

        {showTypeMenu && (
          <div className="absolute top-full mt-1 left-0 bg-white border rounded shadow-lg z-10 w-48">
            {(Object.entries(TYPE_LABELS) as [FieldType, string][]).map(([type, label]) => (
              <button
                key={type}
                onClick={() => addField(type)}
                className="w-full text-left px-4 py-2 text-sm hover:bg-muted"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
```

---

### 7.6 RegistrationsTable — 动态列表格（报名详情页的核心）

这个的特别之处：**列头是动态的**，根据每个活动的 `formSchema` 自动生成。

```tsx
'use client'

import { useUpdateRegistrationStatus } from '@/lib/hooks/useRegistrations'
import type { Registration, Event } from '@/lib/types/admin.types'

const STATUS_LABELS = {
  pending: '待审核',
  confirmed: '已确认',
  cancelled: '已取消',
}

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-gray-100 text-gray-500',
}

interface Props {
  event: Event
  registrations: Registration[]
  isLoading: boolean
}

export default function RegistrationsTable({ event, registrations, isLoading }: Props) {
  const updateStatus = useUpdateRegistrationStatus()

  if (isLoading) {
    return <div className="h-40 bg-muted rounded animate-pulse" />
  }

  if (registrations.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        暂无报名记录
      </div>
    )
  }

  // 从 formSchema 提取列头
  const schemaFields = event.formSchema ?? []

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-4 py-3 text-left">报名 ID</th>
            {/* 动态列头 */}
            {schemaFields.map((f) => (
              <th key={f.field} className="px-4 py-3 text-left">{f.label}</th>
            ))}
            <th className="px-4 py-3 text-left">提交时间</th>
            <th className="px-4 py-3 text-left">状态</th>
            <th className="px-4 py-3 text-left">操作</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((reg) => (
            <tr key={reg.id} className="border-b hover:bg-muted/20">
              <td className="px-4 py-3 text-muted-foreground">#{reg.id}</td>
              {/* 动态列数据：从 userInfo 里按 field key 取值 */}
              {schemaFields.map((f) => (
                <td key={f.field} className="px-4 py-3">
                  {String(reg.userInfo[f.field] ?? '—')}
                </td>
              ))}
              <td className="px-4 py-3 text-muted-foreground">
                {new Date(reg.createdAt).toLocaleString('zh-CN')}
              </td>
              <td className="px-4 py-3">
                <span className={`text-xs px-2 py-1 rounded-full ${STATUS_COLORS[reg.status]}`}>
                  {STATUS_LABELS[reg.status]}
                </span>
              </td>
              <td className="px-4 py-3">
                {reg.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus.mutate({ id: reg.id, status: 'confirmed' })}
                      className="text-xs border rounded px-2 py-1 hover:bg-green-50 hover:border-green-500"
                    >
                      确认
                    </button>
                    <button
                      onClick={() => updateStatus.mutate({ id: reg.id, status: 'cancelled' })}
                      className="text-xs text-destructive hover:underline"
                    >
                      取消
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

---

### 7.7 ImageUploader 组件

```tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { uploadMedia } from '@/lib/api/client'
import { toast } from 'sonner'

interface Props {
  value?: string
  onChange: (url: string, id: string) => void
  hint?: string
}

export default function ImageUploader({ value, onChange, hint }: Props) {
  const [preview, setPreview] = useState<string | null>(value ?? null)
  const [isUploading, setIsUploading] = useState(false)

  async function handleFile(file: File) {
    // 先用本地 URL 做临时预览（立刻看到效果）
    const localUrl = URL.createObjectURL(file)
    setPreview(localUrl)
    setIsUploading(true)

    try {
      const { url, id } = await uploadMedia(file)
      setPreview(url)  // 换成 Strapi 的真实 URL
      onChange(url, id)
    } catch {
      setPreview(null)
      toast.error('图片上传失败，请重试')
    } finally {
      setIsUploading(false)
      URL.revokeObjectURL(localUrl)  // 释放本地 URL，避免内存泄漏
    }
  }

  return (
    <div className="mt-1">
      {preview ? (
        // 已有图片：显示预览 + 更换按钮
        <div className="relative w-32 h-32 group">
          <Image src={preview} alt="预览" fill className="object-cover rounded-lg" />
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
              <span className="text-white text-xs">上传中...</span>
            </div>
          )}
          <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-lg cursor-pointer">
            <span className="text-white text-xs">更换图片</span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
          </label>
        </div>
      ) : (
        // 没有图片：显示上传区域
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary">
          <span className="text-sm text-muted-foreground">点击或拖拽上传图片</span>
          {hint && <span className="text-xs text-muted-foreground mt-1">{hint}</span>}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </label>
      )}
    </div>
  )
}
```

---

## 第八步：全局配置（别忘了！）

### 8.1 在根布局配置 TanStack Query Provider

在 `app/layout.tsx` 里包上 Provider，否则所有 `useQuery` 都不能用：

```tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { useState } from 'react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // useState 确保每个用户只创建一次 QueryClient
  const [queryClient] = useState(() => new QueryClient())

  return (
    <html lang="zh">
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster position="top-right" richColors />
        </QueryClientProvider>
      </body>
    </html>
  )
}
```

### 8.2 登录页（`app/login/page.tsx`）

登录逻辑：调用 Strapi Admin API，把返回的 token 存到 cookie，然后跳转到 `/admin`。

```tsx
// Strapi 管理员登录接口（注意：不是 /api，是 /admin）
const res = await fetch('http://localhost:1337/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
})
const data = await res.json()
// data.data.token 是 JWT token
document.cookie = `admin_token=${data.data.token}; path=/; max-age=86400`
window.location.href = '/admin'
```

---

## 常见报错和解决方法

| 报错信息 | 原因 | 解决办法 |
|---------|------|---------|
| `401 Unauthorized` | Token 过期或者没配 | 重新生成 token 填入 .env.local |
| `403 Forbidden` | 角色没有这个接口的权限 | 去 Strapi Admin → Settings → Roles 开权限 |
| `CORS error` | 后端没允许你的域名 | 后端 `config/middlewares.ts` 里加上 `http://localhost:3001` |
| `TypeError: Cannot read properties of undefined` | Strapi 响应里字段路径没读对 | 用 `?.` 可选链，或者检查是否漏了 `?populate=*` |
| 图片不显示 | `next/image` 不允许外部域名 | 在 `next.config.ts` 的 `images.domains` 里加上 `localhost` |
| `hydration error` | 服务端/客户端渲染不一致 | 相关组件加上 `'use client'` |

---

## 开发顺序建议（优先级）

```
Week 1:
  ✅ 环境配置 + 安装依赖
  ✅ admin.types.ts（类型定义）
  ✅ client.ts（API 客户端）
  ✅ 登录页
  ✅ 整体布局（侧边栏 + 顶部导航）

Week 2:
  🎯 成员管理（CRUD + 图片上传）
  🎯 部门管理
  🎯 仪表盘（统计卡片）

Week 3:
  🎯 活动管理 + SchemaBuilder
  🎯 报名详情 + RegistrationsTable + CSV 导出

Week 4:
  🔧 往期活动 + 赞助商 + 全站配置
  🔧 细节打磨、骨架屏、错误状态
```

---

## 联系 Austin

遇到以下情况直接找 Austin：
- 后端返回 403 → 可能是权限没开，他能帮你在 Strapi 里配
- API 返回结构不对 → 对照 `tech_repo/后端/联调说明-Simon（后台管理前端）.md`
- Token 过期 → 找他要新的，或者让他帮你在 Strapi Admin 里重新生成
