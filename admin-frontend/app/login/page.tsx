/**
 * ============================================================
 * FILE: admin-frontend/app/login/page.tsx
 * ============================================================
 *
 * 【作用】
 * 管理员登录页（路由 `/login`）。不使用 Admin Layout（无侧边栏），
 * 独立的居中布局登录表单。通过 Strapi 管理员 API 验证凭据后，
 * 将 JWT token 存入 HttpOnly Cookie 并重定向至 /admin。
 *
 * 【依赖关系】
 * Imports from:
 *   - lib/api/client.ts            : 登录 API 调用
 *   - components/ui/Input.tsx      : 邮箱/密码输入框
 *   - components/ui/Button.tsx     : 登录按钮
 *   - lib/schemas/auth.schema.ts   : Zod 校验（邮箱格式，密码非空）
 *   - next/navigation (useRouter)  : 登录成功后 router.push('/admin')
 *
 * 【组件】
 * export default function LoginPage(): JSX.Element
 *   - 全屏居中布局（flex items-center justify-center min-h-screen）
 *   - 登录卡片（w-96）：CSSA Logo + "管理员登录" 标题 + 表单
 *   - 表单字段：邮箱（email）、密码（password，type="password"）
 *   - 表单使用 React Hook Form + Zod 校验
 *   - handleLogin(data): Promise<void>
 *       调用 POST /api/admin/auth/local（Strapi 认证端点）
 *       成功：将 jwt token 存入 cookie，router.push('/admin')
 *       失败：表单底部显示 "邮箱或密码错误" 错误提示
 *   - 登录按钮 isLoading 状态防重复提交
 *
 * 【关键变量】
 * - form: UseFormReturn<LoginFormData>
 * - isLoading: boolean
 * - loginError: string | null — API 返回的错误信息
 */

export {}
