### 一、 客户端前端 (Client Frontend)

作为面向用户的核心层，前端需要兼顾高性能呈现、SEO 优化与严格的视觉还原。

1. #### 核心技术栈与工程化
    

- **核心框架**：Next.js (App Router)
    
- **开发语言**：TypeScript (Strict 强类型约束，强制定义 API 数据 Interface)
    
- **渲染策略**：基于 ISR（增量静态生成）与 `fetch` 缓存机制，实现页面数据秒级刷新与 SEO 优化。
    
- **状态管理**：Zustand (负责管理局部复杂交互状态，如表单进度、侧边栏状态)
    
- **动画引擎**：Framer Motion (实现页面切换、视差滚动、组件进出场等核心交互动效)
    
- **数据请求**：GraphQL + Next.js Fetch API (规避数据冗余，按需拉取)
    
- **工程化保障**：
    
    - **代码质量**：必须通过 ESLint 与 Prettier 格式化检查。配置 Husky pre-commit Hook 拦截不合规提交。
        
    - **性能优化**：图片资源强制使用 Next.js `next/image` 经过压缩与优化控制体积。
        
    - **可访问性**：遵循 Web 语义化 HTML，图片必须包含完整 `alt` 属性。
        
- **部署与运维**：依托 Vercel 实现 CI/CD 生产环境自动化部署与多分支 Preview 环境托管。
    

2. #### 全局色彩规范 (Design Tokens)
    

这是业务与设计层面的语义化定义，前端开发者在实际编写 UI 时需严格遵循此表的适用场景，禁止私自使用 Hex 硬编码。

|   |   |   |   |
|---|---|---|---|
|颜色角色|Hex 色值|CSS Variable 名|适用组件 / 场景|
|主背景色|#FAF8F5|--background|全局 body 级背景（米白）|
|卡片背景|#FFFFFF|--card|内容容器、弹窗背景|
|品牌主色|#BA1C21|--primary|核心 CTA 按钮、导航 Active 态、强调色|
|主色悬浮|#9E151A|--primary-hover|Button Hover 交互反馈|
|次要背景|#F5EEF8|--secondary|标签背景、次级区块隔离背景|
|主文本色|#2A2424|--foreground|标题、核心正文文字|
|次文本色|#736B6B|--muted-foreground|日期、说明性副文本|

  

3. #### CSS 样式规范与组件基建
    

- **样式引擎**：Tailwind CSS (原子化)
    
- **组件库**：shadcn/ui (提供底层无样式 Headless UI 组件，支持高度自定义)
    
- **全局样式配置 (****`app/globals.css`****)**：严格遵守给定的 Design Tokens：
    
- CSS
    

```Plain
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 36 25% 97%; /* #FAF8F5 */
    --foreground: 0 8% 15%; /* #2A2424 */

    --card: 0 0% 100%; /* #FFFFFF */
    --card-foreground: 0 8% 15%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 8% 15%;

    --primary: 358 74% 42%; /* #BA1C21 */
    --primary-foreground: 0 0% 100%;

    --secondary: 288 33% 95%; /* #F5EEF8 */
    --secondary-foreground: 358 74% 42%;

    --muted: 36 20% 92%; /* 副文本背景 */
    --muted-foreground: 0 4% 44%; /* #736B6B */

    --accent: 358 74% 94%;
    --accent-foreground: 358 74% 42%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;

    --border: 36 15% 88%;
    --input: 36 15% 88%;
    --ring: 358 74% 42%;

    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
```

- **Tailwind 框架配置 (****`tailwind.config.ts`****)**：
    
- TypeScript
    

```Plain
import type { Config } from "tailwindcss"const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "#9E151A", 
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
```

3. #### 业务页面拆分与细化实现逻辑 (Phase 1 MVP)
    

全站要求 100% 响应式适配，无布局错乱，100% 配置化（严禁硬编码文案）。暂不包含用户登录/注册、权限系统、支付系统和多语言。

- **公共基础设施层**：独立开发 Navbar, Footer, Layout, SEO/Meta 组件。
    
- **首页 (Home)**：
    
    - 包含：Hero区域、社团简介、服务说明、精选活动展示、亮点与赞助商展示、CTA 按钮。
        
    - 逻辑：数据依赖 Strapi `Site_Configs`，通过 `getStaticProps` / App Router Fetch 实现定时/触发式重建。
        
- **关于我们 (About)**：展示组织定位、新生/学术/活动等服务对象、使命及价值观。
    
- **管理层/部门 (Team)**：
    
    - UI：分组展示主席团及各部门结构，包含姓名、职位、统一风格照片。
        
    - 逻辑：前端请求 `Members` GraphQL API，利用关联字段按部门分类渲染。**当** **CMS** **触发人员删除后，前端数据列表 Array 长度改变，对应人员组件自动解除挂载。**
        
- **活动展示 (Events / Gallery)**：
    
    - UI：精选活动卡片 (Featured Events) + 竖向时间线式展示 (Timeline)。
        
    - 交互逻辑：**支持根据鼠标滚动触发 Timeline 更新**。
        
    - 数据逻辑：前端请求 `Past_Events` 数据流时，强制应用 GraphQL `sort: "event_date:desc"`；由于数据库层做了 `photo` 必填约束，前端 `<EventCard />` 渲染时可**跳过图片有效性校验**，直接渲染 UI。
        
- **赞助合作 (Sponsors)**：展示价值说明、触达数据、案例、权益及渠道。Logo 及信息通过 CMS 动态替换。
    
- **联系我们 (Contact)**：展示官方邮箱、社交媒体矩阵。若启用表单，**严禁纯前端静态表单**，必须真实调用后端逻辑。
    
- **加入我们 (Join Us)**：招新时间/方式、部门简介。包含动态的“报名表单”。
    
    - 表单逻辑：前端基于后端下发的 `Events.form_schema` (JSON)，通过通用 Form 组件**动态渲染输入项**。
        

4. #### 前端协作工作流
    

- 公共基础设施、通用 UI 组件（基于 shadcn/ui 二次封装）、业务页面层、接口对接层需**严格分层****解耦**开发。
    
- 特性开发严格采用 `feature/{模块名称}` 分支模型。
    
- 严禁本地直推 `main`，必须通过 PR 并至少触发 1 次 Code Review，验证代码规范与构建状态。