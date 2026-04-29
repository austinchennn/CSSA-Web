# 【PRD】测试规范与任务说明书
> 本文档解释「为什么要测试」「测什么」「怎么写」「文件放哪」。  
> 每一节都有具体代码示例，请对照自己负责的模块完成对应的测试任务。

---

## 零、测试文件放在哪里？怎么创建？（完整流程）

### 0.1 最重要的一句话

**测试代码放在项目目录里，不要开新仓库，不要建新项目。**  
测试文件和源代码是一家人，它们住在同一个仓库里。

---

### 0.2 完整目录结构（这就是你要亲手建出来的样子）

```
CSSA-Web/
├── client/
│   ├── app/                          ← 源代码（不动）
│   ├── components/                   ← 源代码（不动）
│   ├── lib/                          ← 源代码（不动）
│   │
│   ├── __tests__/                    ← ✅ 你要新建这个文件夹
│   │   ├── unit/                     ← ✅ 你要新建这个文件夹（放工具函数测试）
│   │   │   ├── formatDate.test.ts    ← ✅ 你要新建这个文件
│   │   │   └── formatters.test.ts    ← ✅ 你要新建这个文件
│   │   └── components/               ← ✅ 你要新建这个文件夹（放组件测试）
│   │       ├── Button.test.tsx       ← ✅ 你要新建这个文件
│   │       └── Navbar.test.tsx       ← ✅ 你要新建这个文件
│   │
│   └── e2e/                          ← ✅ 你要新建这个文件夹（放 Playwright 测试）
│       └── join-flow.spec.ts         ← ✅ 你要新建这个文件
│
├── admin-frontend/
│   ├── app/                          ← 源代码（不动）
│   ├── components/                   ← 源代码（不动）
│   ├── lib/                          ← 源代码（不动）
│   │
│   ├── __tests__/                    ← ✅ 你要新建这个文件夹
│   │   ├── unit/                     ← ✅ 你要新建这个文件夹
│   │   │   ├── exportCSV.test.ts     ← ✅ 你要新建这个文件
│   │   │   ├── member.schema.test.ts ← ✅ 你要新建这个文件
│   │   │   ├── event.schema.test.ts  ← ✅ 你要新建这个文件
│   │   │   └── formatters.test.ts    ← ✅ 你要新建这个文件
│   │   └── components/               ← ✅ 你要新建这个文件夹
│   │       └── MemberForm.test.tsx   ← ✅ 你要新建这个文件
│   │
│   └── e2e/                          ← ✅ 你要新建这个文件夹
│       └── admin-login.spec.ts       ← ✅ 你要新建这个文件
│
└── backend/
    └── microservice/
        └── src/
            ├── registration/
            │   ├── registration.service.ts          ← 源代码（不动）
            │   └── registration.service.spec.ts     ← ✅ 你要新建，紧挨着源文件
            └── common/
                └── guards/
                    ├── rate-limit.guard.ts          ← 源代码（不动）
                    └── rate-limit.guard.spec.ts     ← ✅ 你要新建，紧挨着源文件
```

---

### 0.3 命名规则（必须严格遵守，否则 Jest 找不到你的测试）

Jest 会自动扫描项目里符合命名规则的文件并执行，**规则不对 = 测试永远不会跑**。

| 场景 | 文件后缀 | 例子 |
|------|---------|------|
| 工具函数测试（TypeScript） | `.test.ts` | `formatDate.test.ts` |
| 组件测试（含 JSX） | `.test.tsx` | `Button.test.tsx` |
| NestJS 后端测试 | `.spec.ts` | `registration.service.spec.ts` |
| Playwright E2E 测试 | `.spec.ts` | `join-flow.spec.ts` |

**常见错误命名（这些 Jest 找不到，永远不会执行）：**
```
❌ formatDate.test.js        ← 用了 .js 而不是 .ts
❌ test-formatDate.ts        ← 没有 .test 或 .spec 关键词
❌ formatDate.ts             ← 没有任何测试标记
❌ formatDateTest.ts         ← Test 大写且没有点号分隔
```

---

### 0.4 一个测试文件的基本结构（你只需要照抄这个框架）

每一个测试文件，不管测什么，都长这个样子：

```typescript
// 第一行：从你要测试的源文件导入
import { 你要测的函数或组件 } from '@/lib/utils/xxx'

// describe = 测试分组，里面放一组相关的测试
describe('这一组测试在测什么', () => {

  // it = 一个具体的测试用例，用一句话描述「它应该做什么」
  it('输入正常值时，返回正确结果', () => {
    const result = 你要测的函数('正常输入')
    expect(result).toBe('期望的输出')   // ← 断言：结果应该等于什么
  })

  it('输入空字符串时，不报错', () => {
    expect(() => 你要测的函数('')).not.toThrow()
  })

})
```

**三个关键词记住：**
- `describe(...)` — 给一组测试起个名字，像文件夹一样
- `it(...)` — 一个具体的测试用例，「it（它）应该……」
- `expect(...).toBe(...)` — 断言，「我期望结果是……」

---

### 0.5 手把手：创建你的第一个测试文件（以 `formatDate` 为例）

**第一步：在 VS Code 里找到源文件**

打开 `client/lib/utils/formatDate.ts`，先读懂这个函数做了什么，接收什么参数，返回什么。

**第二步：手动创建文件夹**

在 VS Code 左侧文件树里：
1. 右键点击 `client/` 文件夹 → New Folder → 输入 `__tests__`
2. 右键点击 `__tests__/` → New Folder → 输入 `unit`

**注意：** `__tests__` 两边各有两个下划线 `_`，不是一个。

**第三步：创建测试文件**

右键点击 `unit/` → New File → 输入 `formatDate.test.ts`

**第四步：写测试内容**（直接复制本文档第三章的代码粘贴进去）

**第五步：在终端运行**

```bash
cd client
npm test -- formatDate
```

你会看到：
```
PASS __tests__/unit/formatDate.test.ts
  formatDate
    ✓ 正常日期返回正确格式 (3ms)
    ✓ 日期为空字符串时返回 "-" (1ms)
    ✓ 日期为 null 时不报错 (1ms)

Tests: 3 passed, 3 total
```

如果看到绿色 `✓` 就说明测试通过了。如果看到红色 `✗` 就说明有问题，读错误信息找原因。

---

### 0.6 NestJS 后端测试文件放哪里（和前端不一样）

NestJS 有自己的约定：**测试文件放在和源文件完全相同的目录里，后缀从 `.ts` 改成 `.spec.ts`**。

```
backend/microservice/src/registration/
    ├── registration.controller.ts       ← 源文件
    ├── registration.service.ts          ← 源文件
    ├── registration.controller.spec.ts  ← 测试文件（你新建）
    └── registration.service.spec.ts     ← 测试文件（你新建）
```

为什么 NestJS 这样设计？因为测试文件紧挨着源文件，改源文件时能立刻看到对应的测试，不容易忘记更新。

运行 NestJS 测试：
```bash
cd backend/microservice
npm test
# 或者只跑某一个文件：
npm test -- registration.service
```

---

### 0.7 测试文件要不要提交到 Git？

**要，必须提交。** 测试代码和源代码同等重要。

提交规则和普通代码一样：
- 在自己的 `feature` 分支写测试
- 测试通过后提交 PR 到 `dev`
- PR 里必须包含测试文件，负责人 review 时会检查

**不需要提交的：**
- 测试运行产生的 `coverage/` 文件夹（会自动加入 `.gitignore`）

---

## 一、为什么要写测试？（背景知识）

想象你改了一个工具函数，没有测试，你怎么知道没有破坏其他地方？  
你只能手动点一遍整个网站——这很慢，也很容易漏。

**测试 = 自动化的质量检查员**，你写一次，以后每次改代码它都帮你检查。

### 三种测试类型（由小到大）

```
单元测试（Unit Test）
    测一个函数 / 一个组件，完全隔离，速度极快
    工具：Jest + React Testing Library

集成测试（Integration Test）
    测一组模块配合工作，比如「Service + 数据库」
    工具：Jest + Supertest

端到端测试（E2E Test）
    模拟真实用户在浏览器里点击，测完整流程
    工具：Playwright
```

**本项目的测试策略：**
- 工具函数、Zod Schema → 单元测试（必须写）
- React 组件 → 组件测试（必须写关键组件）
- NestJS Service → 集成测试（必须写）
- 核心用户流程 → E2E 测试（必须写 2 个流程）

---

## 二、工具安装

### client/ 和 admin-frontend/ 安装 Jest + React Testing Library

在 `client/` 目录下运行：
```bash
npm install --save-dev jest @types/jest jest-environment-jsdom
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

在 `client/` 根目录新建 `jest.config.ts`：
```typescript
import type { Config } from 'jest'

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',   // 让 @/ 路径别名能用
  },
}

export default config
```

新建 `jest.setup.ts`：
```typescript
import '@testing-library/jest-dom'
```

在 `package.json` 里加：
```json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch"
}
```

`admin-frontend/` 做同样的操作。

### client/ 和 admin-frontend/ 安装 Playwright（E2E）

```bash
npm install --save-dev @playwright/test
npx playwright install
```

新建 `playwright.config.ts`：
```typescript
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
  },
})
```

### backend/microservice/ 安装测试（NestJS 已自带 Jest）

```bash
cd backend/microservice
npm install --save-dev @nestjs/testing supertest @types/supertest
```

---

## 三、单元测试任务（client/）

### 任务 A：测试 `lib/utils/formatDate.ts`

**为什么测这个：** 日期格式化出错会导致活动时间显示混乱，用户看到错误日期。

打开文件 `client/lib/utils/formatDate.ts` 看它的实现，然后在 `client/__tests__/unit/formatDate.test.ts` 写以下测试：

```typescript
import { formatDate } from '@/lib/utils/formatDate'

describe('formatDate', () => {
  it('正常日期返回正确格式', () => {
    expect(formatDate('2026-05-15')).toBe('May 15, 2026')
    // 根据你的实际实现调整期望值
  })

  it('日期为空字符串时返回 "-"', () => {
    expect(formatDate('')).toBe('-')
  })

  it('日期为 null 时不报错', () => {
    expect(() => formatDate(null as any)).not.toThrow()
  })

  it('同一天的两次调用结果相同', () => {
    const result1 = formatDate('2026-01-01')
    const result2 = formatDate('2026-01-01')
    expect(result1).toBe(result2)
  })
})
```

**运行：** `npm test -- formatDate`

---

### 任务 B：测试 `lib/utils/formatters.ts`

在 `client/__tests__/unit/formatters.test.ts` 里，为 `formatters.ts` 里每一个导出的函数写至少 3 个测试用例：
1. 正常输入 → 期望输出
2. 边界值（空字符串、0、很长的字符串）
3. 错误输入不报错（传 null / undefined）

---

## 四、Zod Schema 测试任务（admin-frontend/）

### 任务 C：测试 `lib/schemas/member.schema.ts`

**为什么测 Zod Schema：** Schema 是表单验证的核心，一旦写错，用户会提交无效数据或被错误拦截。

打开 `admin-frontend/lib/schemas/member.schema.ts`，然后在 `admin-frontend/__tests__/unit/member.schema.test.ts` 写：

```typescript
import { memberSchema } from '@/lib/schemas/member.schema'

describe('memberSchema', () => {
  // 构造一个完全合法的成员对象
  const validMember = {
    name: '张三',
    title: 'President',
    department: 'dept-123',
    bio: '负责学生活动',
    display_order: 1,
  }

  it('合法数据通过验证', () => {
    const result = memberSchema.safeParse(validMember)
    expect(result.success).toBe(true)
  })

  it('name 为空时验证失败', () => {
    const result = memberSchema.safeParse({ ...validMember, name: '' })
    expect(result.success).toBe(false)
    // 验证错误信息是否合理
    expect(result.error?.issues[0].path).toContain('name')
  })

  it('display_order 为负数时验证失败', () => {
    const result = memberSchema.safeParse({ ...validMember, display_order: -1 })
    expect(result.success).toBe(false)
  })

  it('缺少必填字段 title 时验证失败', () => {
    const { title, ...withoutTitle } = validMember
    const result = memberSchema.safeParse(withoutTitle)
    expect(result.success).toBe(false)
  })
})
```

### 任务 D：测试其他三个 Schema

用同样的模式，为以下三个 Schema 各写一个测试文件：
- `lib/schemas/event.schema.ts` → `__tests__/unit/event.schema.test.ts`
- `lib/schemas/department.schema.ts` → `__tests__/unit/department.schema.test.ts`
- `lib/schemas/sponsor.schema.ts` → `__tests__/unit/sponsor.schema.test.ts`

每个文件至少测：合法数据通过 / 必填字段缺失失败 / 非法值类型失败。

---

## 五、工具函数测试（admin-frontend/）

### 任务 E：测试 `lib/utils/exportCSV.ts`

**为什么测这个：** CSV 导出格式错误，社团管理员下载的数据会乱掉，无法统计报名人数。

在 `admin-frontend/__tests__/unit/exportCSV.test.ts` 写：

```typescript
import { exportCSV } from '@/lib/utils/exportCSV'

describe('exportCSV', () => {
  it('空数组时不报错', () => {
    expect(() => exportCSV([], 'test.csv')).not.toThrow()
  })

  it('单条数据生成正确的 CSV 内容', () => {
    const rows = [{ name: '张三', email: 'zhang@test.com', status: 'approved' }]
    // 根据你的实现，验证生成的 CSV 字符串包含正确的表头和数据
    // 例如你的函数返回字符串而不是直接下载时：
    // const csv = generateCSVString(rows)
    // expect(csv).toContain('name,email,status')
    // expect(csv).toContain('张三,zhang@test.com,approved')
  })

  it('数据包含逗号时正确转义（用引号包裹）', () => {
    const rows = [{ name: '张三，李四', email: 'test@test.com' }]
    // CSV 中含逗号的字段应被引号包裹：
    // expect(csv).toContain('"张三，李四"')
  })
})
```

---

## 六、组件测试任务（client/）

### 任务 F：测试 `components/ui/Button.tsx`

**为什么测组件：** 按钮是全站最高频使用的组件，任何回归都会影响很多地方。

在 `client/__tests__/components/Button.test.tsx` 写：

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui/Button'

describe('Button 组件', () => {
  it('正常渲染按钮文字', () => {
    render(<Button>点击我</Button>)
    expect(screen.getByText('点击我')).toBeInTheDocument()
  })

  it('点击时触发 onClick 回调', async () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>点击我</Button>)
    await userEvent.click(screen.getByText('点击我'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('disabled 状态下点击不触发 onClick', async () => {
    const handleClick = jest.fn()
    render(<Button disabled onClick={handleClick}>点击我</Button>)
    await userEvent.click(screen.getByText('点击我'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('disabled 状态有正确的 disabled 属性', () => {
    render(<Button disabled>点击我</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

---

### 任务 G：测试 `components/layout/Navbar.tsx`

在 `client/__tests__/components/Navbar.test.tsx` 写：

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Navbar } from '@/components/layout/Navbar'

describe('Navbar 组件', () => {
  it('包含所有导航链接', () => {
    render(<Navbar />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Events')).toBeInTheDocument()
    expect(screen.getByText('Team')).toBeInTheDocument()
    // 根据你的实际导航链接调整
  })

  it('移动端默认不显示菜单', () => {
    render(<Navbar />)
    // 假设移动菜单有 data-testid="mobile-menu"
    // expect(screen.queryByTestId('mobile-menu')).not.toBeVisible()
  })

  it('点击汉堡菜单后显示移动菜单', async () => {
    render(<Navbar />)
    const menuButton = screen.getByRole('button', { name: /menu/i })
    await userEvent.click(menuButton)
    // expect(screen.getByTestId('mobile-menu')).toBeVisible()
  })
})
```

---

### 任务 H：测试 `components/members/MemberForm.tsx`（admin-frontend）

在 `admin-frontend/__tests__/components/MemberForm.test.tsx` 写：

```typescript
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemberForm } from '@/components/members/MemberForm'

describe('MemberForm 组件', () => {
  it('初始状态下表单为空', () => {
    render(<MemberForm onSubmit={jest.fn()} />)
    expect(screen.getByLabelText('姓名')).toHaveValue('')
  })

  it('提交空表单显示错误信息', async () => {
    render(<MemberForm onSubmit={jest.fn()} />)
    await userEvent.click(screen.getByRole('button', { name: /提交|保存/i }))
    await waitFor(() => {
      expect(screen.getByText(/姓名.*必填|请填写姓名/i)).toBeInTheDocument()
    })
  })

  it('填写合法数据后提交调用 onSubmit', async () => {
    const handleSubmit = jest.fn()
    render(<MemberForm onSubmit={handleSubmit} />)

    await userEvent.type(screen.getByLabelText('姓名'), '张三')
    await userEvent.type(screen.getByLabelText('职位'), 'President')
    // 根据表单的实际字段继续填写

    await userEvent.click(screen.getByRole('button', { name: /提交|保存/i }))
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1)
    })
  })
})
```

---

## 七、后端集成测试任务（backend/microservice/）

### 任务 I：测试 `registration.service.ts`

在 `backend/microservice/src/registration/registration.service.spec.ts` 写：

```typescript
import { Test, TestingModule } from '@nestjs/testing'
import { RegistrationService } from './registration.service'

describe('RegistrationService', () => {
  let service: RegistrationService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegistrationService,
        // 如果 Service 依赖其他东西（如数据库），在这里 mock 掉
        // {
        //   provide: getRepositoryToken(Registration),
        //   useValue: { save: jest.fn(), find: jest.fn() },
        // },
      ],
    }).compile()

    service = module.get<RegistrationService>(RegistrationService)
  })

  it('service 能正常实例化', () => {
    expect(service).toBeDefined()
  })

  it('提交合法报名数据时成功', async () => {
    const dto = {
      eventId: 'event-123',
      userInfo: { name: '张三', email: 'zhang@test.com' },
    }
    // 根据你的实现调整：
    // const result = await service.create(dto)
    // expect(result.status).toBe('pending')
  })

  it('eventId 不存在时抛出错误', async () => {
    // await expect(service.create({ eventId: 'non-exist', userInfo: {} }))
    //   .rejects.toThrow()
  })
})
```

---

### 任务 J：测试 `rate-limit.guard.ts`

在 `backend/microservice/src/common/guards/rate-limit.guard.spec.ts` 写：

```typescript
import { RateLimitGuard } from './rate-limit.guard'
import { ExecutionContext } from '@nestjs/common'

describe('RateLimitGuard', () => {
  let guard: RateLimitGuard

  beforeEach(() => {
    guard = new RateLimitGuard(/* 传入依赖 */)
  })

  it('guard 能正常实例化', () => {
    expect(guard).toBeDefined()
  })

  it('第一次请求放行', async () => {
    // 构造一个假的 ExecutionContext
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({ ip: '127.0.0.1' }),
      }),
    } as ExecutionContext

    // const result = await guard.canActivate(mockContext)
    // expect(result).toBe(true)
  })

  it('超过限频次数后拒绝请求', async () => {
    // 模拟同一 IP 快速发送超过限额的请求
    // 期望第 N+1 次请求返回 false 或抛出 ThrottlerException
  })
})
```

---

## 八、端到端测试任务（Playwright）

E2E 测试模拟真实用户在浏览器里操作，需要先把本地服务全部跑起来。

### 任务 K：测试报名流程（client/e2e/join-flow.spec.ts）

```typescript
import { test, expect } from '@playwright/test'

test.describe('报名流程', () => {
  test('用户能成功提交活动报名', async ({ page }) => {
    // 第一步：进入 Join Us 页面
    await page.goto('/join')
    await expect(page).toHaveTitle(/Join|加入/)

    // 第二步：选择一个活动（假设有活动可报名）
    await page.click('text=立即报名')  // 根据实际按钮文字调整

    // 第三步：填写报名表单
    await page.fill('input[name="name"]', '测试用户')
    await page.fill('input[name="email"]', 'test@test.com')

    // 第四步：提交
    await page.click('button[type="submit"]')

    // 第五步：验证成功提示出现
    await expect(page.locator('text=报名成功')).toBeVisible({ timeout: 5000 })
  })

  test('必填字段为空时显示错误', async ({ page }) => {
    await page.goto('/join')
    await page.click('text=立即报名')

    // 直接点提交不填内容
    await page.click('button[type="submit"]')

    // 应该出现错误提示
    await expect(page.locator('text=必填')).toBeVisible()
  })
})
```

**运行：** `npx playwright test e2e/join-flow.spec.ts`

---

### 任务 L：测试管理员登录和成员管理（admin-frontend/e2e/admin-login.spec.ts）

```typescript
import { test, expect } from '@playwright/test'

test.describe('管理员后台', () => {
  test('使用正确凭据能登录后台', async ({ page }) => {
    await page.goto('http://localhost:3001/login')

    await page.fill('input[type="email"]', 'admin@cssa.com')
    await page.fill('input[type="password"]', 'test-password')
    await page.click('button[type="submit"]')

    // 登录成功后应该跳转到仪表盘
    await expect(page).toHaveURL('/') 
    await expect(page.locator('text=仪表盘')).toBeVisible()
  })

  test('错误密码显示错误提示', async ({ page }) => {
    await page.goto('http://localhost:3001/login')

    await page.fill('input[type="email"]', 'admin@cssa.com')
    await page.fill('input[type="password"]', '错误密码')
    await page.click('button[type="submit"]')

    await expect(page.locator('text=密码错误')).toBeVisible()
    await expect(page).toHaveURL('/login')  // 没有跳转
  })

  test('能新增一个成员', async ({ page }) => {
    // 先登录
    await page.goto('http://localhost:3001/login')
    await page.fill('input[type="email"]', 'admin@cssa.com')
    await page.fill('input[type="password"]', 'test-password')
    await page.click('button[type="submit"]')

    // 进入成员管理
    await page.click('text=成员管理')
    await page.click('text=新增成员')

    // 填写表单
    await page.fill('input[name="name"]', 'E2E测试成员')
    await page.fill('input[name="title"]', 'Test Role')
    await page.click('button[type="submit"]')

    // 新成员出现在列表里
    await expect(page.locator('text=E2E测试成员')).toBeVisible()

    // 清理：删除刚才创建的测试成员
    await page.click('text=E2E测试成员')
    await page.click('text=删除')
    await page.click('text=确认')
  })
})
```

---

## 九、测试完成标准（如何判断「测完了」）

每个模块的测试负责人在合并 PR 之前必须满足以下标准：

| 检查项 | 标准 |
|--------|------|
| 所有测试通过 | `npm test` 运行无报错，0 failures |
| 工具函数覆盖 | `client/lib/utils/` 和 `admin-frontend/lib/utils/` 下所有函数有测试 |
| Zod Schema 覆盖 | `admin-frontend/lib/schemas/` 下所有 schema 有测试 |
| 关键组件覆盖 | Button, Navbar, MemberForm 有测试 |
| 后端 Service 覆盖 | `registration.service.spec.ts` 和 `rate-limit.guard.spec.ts` 有测试 |
| E2E 流程覆盖 | 报名流程 + 管理员登录 E2E 测试通过 |

---

## 十、常见错误与解决方法

### 错误 1：`Cannot find module '@/lib/...'`
原因：路径别名 `@/` 没配置。  
解决：检查 `jest.config.ts` 里的 `moduleNameMapper`，确认 `'^@/(.*)$': '<rootDir>/$1'` 存在。

### 错误 2：`document is not defined`
原因：Jest 默认运行在 Node 环境，没有浏览器 API。  
解决：确认 `jest.config.ts` 里 `testEnvironment: 'jsdom'` 已设置。

### 错误 3：`Warning: An update to X inside a test was not wrapped in act(...)`
原因：测试里有异步更新没有等待完成。  
解决：用 `await waitFor(() => { ... })` 包裹断言，而不是直接断言。

### 错误 4：E2E 测试找不到元素
原因：selector 写的是中文文字，但组件没有渲染出来 / 文字不匹配。  
解决：用 Playwright 的 `page.pause()` 暂停测试，手动看页面里实际有什么元素。

### 错误 5：后端测试找不到依赖
原因：NestJS Service 有依赖注入，测试里没有 mock。  
解决：在 `Test.createTestingModule` 的 `providers` 里用 `useValue: { methodName: jest.fn() }` 替换真实依赖。

---

> 文档维护：Austin  
> 最后更新：2026-04-29
