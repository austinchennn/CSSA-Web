# CSSA-Web 项目开发 Timeline

**总周期：** 2026-04-27 → 2026-05-31（5 周）  
**DDL：** 2026-05-24 全功能测试完成，2026-05-31 正式上线

---

## 开发策略说明

**前端采用「硬编码先行」策略：**

| 阶段 | Emilia（客户端）| Yeon（后台前端）| Austin + Mike（后端）|
|------|--------------|----------------|----------------------|
| 第一周 | 先用假数据写死页面，跑通 UI | 先用 Mock 数据做骨架和核心页面 | 搭环境、Strapi 初始化 |
| 第二周 | 响应式收尾，等待联调 | 继续剩余页面，等待联调 | API 全部跑通 |
| 第三周 | **替换假数据** → 接真实 GraphQL | **替换 Mock** → 接真实 API | 支持联调，补充 CSV 导出 |

这样做的好处：前端不被后端进度卡住，第一周就能看到完整 UI。

---

## 第一周 4.27 - 5.3｜启动 + 硬编码页面 + 后台骨架

### 目标
项目正式启动。Emilia 完成 7 个客户端页面（假数据写死）；Yeon 搭出后台布局框架和核心页面；Mike 开始按 SOP 跑通 Strapi；Simon 搭好测试环境。

---

### Emilia — 客户端页面（硬编码版）

**策略：假数据直接写在组件文件里，不用变量抽象，跑通 UI 就行。第三周统一替换成 GraphQL。**

**4.28 - 5.1 — 开发**

| 页面 | 包含内容 | 状态 |
|------|---------|------|
| 首页 `Home` | Hero 区域、社团简介、精选活动预览（硬编码 2-3 条）、赞助商 Logo、CTA | |
| 关于我们 `About` | 组织定位、使命、价值观（文字写死） | |
| 管理层 `Team` | 按部门分组卡片（头像用占位图，姓名/职位硬编码 3-5 人） | |
| 活动 `Events` | 活动卡片 + 竖向 Timeline（硬编码 3-4 条往期数据）、Framer Motion 滚动动效 | |
| 赞助合作 `Sponsors` | 赞助价值说明、档位介绍、Logo 占位图 | |
| 联系我们 `Contact` | 邮箱、社媒链接（写死）、联系表单 UI（不接后端） | |
| 加入我们 `Join Us` | 招新说明 + 报名表单（固定字段：姓名、邮箱、年级，第三周替换为动态 form_schema） | |

**技术要求：**
- Desktop + Mobile 响应式（每完成一个页面立即检查 375px）
- 严格遵守 Design Token：主色 `#BA1C21`，背景 `#FAF8F5`，文字 `#2A2424`
- 假数据可以直接 `const data = [{ name: '张三', ... }]` 写在组件里

**5.2 - 5.3 — PR 提交**
- [ ] 提交 PR 到 `dev`，等待 Austin Review
- [ ] 本周 Demo：浏览器里过一遍所有页面，确认 UI 还原度

---

### Yeon — 后台前端骨架

**策略：先用 Mock 对象假装有数据，跑通页面结构和交互逻辑，第三周接真实 API。**

**4.28 - 5.1 — 开发**
- [ ] `(admin)/layout.tsx` — 左侧 Sidebar + 顶部 Header 整体布局框架
- [ ] `login/page.tsx` — 登录页，Zod 表单校验，错误提示（不接真实 API，假装登录成功跳转）
- [ ] `(admin)/page.tsx` — 仪表盘，Mock 数据显示成员数/活动数/报名数统计卡片
- [ ] `(admin)/members/page.tsx` — 成员列表（Mock 数据），新增/编辑/删除流程跑通（UI 层）
- [ ] `(admin)/events/page.tsx` — 活动列表（Mock 数据），发布/下线 Toggle UI
- [ ] SchemaBuilder 原型 — 最难，第一周先做出能添加/删除字段行的基础版本

**5.2 - 5.3 — PR 提交**
- [ ] 提交 PR 到 `dev`
- [ ] 本周 Demo：能在后台增删成员（Mock），能构造一个简单的报名表单 schema

---

### Austin + Mike — 后端环境搭建

**Mike 按 SOP 操作，Austin 负责答疑和 Code Review。**

**4.28 - 5.1**
- [ ] `docker-compose up -d` 启动 PostgreSQL + Redis，确认连接正常（Mike）
- [ ] Strapi 初始化 (`yarn create strapi-app`)，连上 PostgreSQL（Mike）
- [ ] 创建 6 个 Content Type（Departments/Members/Events/PastEvents/Registrations/SiteConfig）（Mike）
- [ ] 配置 Strapi GraphQL 插件，打开 Playground（Mike）
- [ ] 配置 Strapi 公开权限（注册接口对外开放）（Mike）
- [ ] NestJS `npm run start:dev` 跑通，确认 3002 端口响应（Austin）

**5.2 - 5.3**
- [ ] Strapi Playground 能查到 Members/Events 数据（哪怕是空的）
- [ ] 本周 Demo：`localhost:1337/graphql` Playground 跑通

---

### Simon — 测试环境搭建

**4.28 - 5.1**
- [ ] 安装 Playwright：`npx playwright install`，在 `client/e2e/` 下初始化
- [ ] 创建测试目录结构（参考测试规范 PRD）
- [ ] 写出第一个冒烟测试骨架：`e2e/smoke.spec.ts`（打开首页，断言 title 不为空）
- [ ] 安装 Jest + React Testing Library，确认 `npm test` 能跑起来

**5.2 - 5.3**
- [ ] Emilia 完成 Button 组件后，立即写 `Button.test.tsx`

---

### 第一周交付物
- ✅ Emilia：7 个客户端页面硬编码 UI，Desktop + Mobile 适配，合并进 `dev`
- ✅ Yeon：后台布局框架 + 登录页 + 仪表盘 + 成员/活动列表（Mock 数据）
- ✅ Mike：Strapi 跑通，6 张表建完，GraphQL Playground 可用
- ✅ Simon：测试环境搭好，第一个冒烟测试跑通

---

## 第二周 5.4 - 5.10｜后端 API 就绪 + 后台前端继续

### 目标
Mike 完成 Strapi 权限配置和 seed 数据；Austin 补完 NestJS 剩余接口；Yeon 完成剩余后台页面；Simon 开始写组件测试。

---

### Emilia — 响应式收尾 + 等待联调

**5.4 - 5.6**
- [ ] 修复第一周 PR Review 的问题
- [ ] 补完所有页面的 Mobile 适配（如果第一周没全做完）
- [ ] 整理 `client/lib/graphql/queries/` 目录，提前写好 GraphQL query 文件（不调用，仅定义好 query 字符串，等第三周对接）

**5.7 - 5.10**
- [ ] 等 Austin/Mike 通知 API 就绪
- [ ] 提前阅读后端接口文档，确认 form_schema 格式与 Join Us 页面的解析逻辑一致

---

### Yeon — 后台前端剩余页面

**5.4 - 5.7**
- [ ] `(admin)/departments/page.tsx` — 部门管理（Mock 数据）
- [ ] `(admin)/events/[id]/registrations/page.tsx` — 报名详情表格，审核状态切换
- [ ] `(admin)/past-events/page.tsx` — 往期活动列表，图片上传 UI
- [ ] `(admin)/config/page.tsx` — 全站配置编辑表单
- [ ] `shared/ExportCSVButton.tsx` — CSV 导出按钮（调用 Austin 的 `/api/v1/registrations/export?eventId=xxx`）

**5.8 - 5.10**
- [ ] 所有 Zod Schema 完善（member/event/department/sponsor）
- [ ] TanStack Query hooks 骨架创建（先 mock，第三周替换真实请求）
- [ ] 提交 PR 到 `dev`

---

### Austin — NestJS CSV 导出接口

**5.4 - 5.6**
- [ ] 实现 `GET /api/v1/registrations/export?eventId=xxx`
  - 调用 Strapi 分页拉取所有报名记录
  - 根据 `form_schema` 生成 CSV 列头
  - 返回带 BOM 头的 UTF-8 CSV 文件流（Excel 可正确打开中文）
- [ ] 提交到 `feature-austin-csv-export`，PR → `dev`

**5.7 - 5.10**
- [ ] 为 Yeon 写好前端调用示例（放在 `tech_repo/后端/` 文档里）
- [ ] 协助 Mike 排查 Strapi 配置问题

---

### Mike — Strapi 完善

**5.4 - 5.7**
- [ ] 配置完整的 Strapi 权限（注册接口公开，其余需要 token）
- [ ] 写 Seed 数据（至少 2 个部门、5 个成员、2 个活动、3 条往期活动）
- [ ] 测试所有 GraphQL query 在 Playground 跑通

**5.8 - 5.10**
- [ ] GraphQL 自定义 resolver：`registrationCountByEvent`

---

### Simon — 组件测试

**5.4 - 5.10**
- [ ] `Button.test.tsx` — 渲染、点击、disabled 状态
- [ ] `Navbar.test.tsx` — 导航链接、移动端菜单开关
- [ ] `member.schema.test.ts` — Zod schema 合法/非法数据
- [ ] `event.schema.test.ts`
- [ ] `exportCSV.test.ts` — 空数据不报错，含逗号字段正确转义

---

### 第二周交付物
- ✅ Strapi 数据库 6 张表建完，有 Seed 数据，GraphQL 全部可查
- ✅ NestJS CSV 导出接口跑通
- ✅ 后台前端全部页面完成（Mock 数据版），合并进 `dev`
- ✅ Simon：5 个测试文件完成

---

## 第三周 5.11 - 5.17｜前后端联调（替换假数据）+ 功能收尾

### 目标
Emilia 把硬编码假数据全部替换成真实 GraphQL 查询；Yeon 把 Mock 替换成真实 API 调用；完整报名流程端到端跑通。

---

### Emilia — 替换假数据（接真实 API）

**5.11 - 5.13**
- [ ] `team/page.tsx` — 替换假成员数据 → 接 `Members + Departments` GraphQL query
- [ ] `events/page.tsx` — 替换假活动数据 → 接 `Events + PastEvents` GraphQL query
- [ ] `sponsors/page.tsx` → 接 `SiteConfig` 动态 Logo
- [ ] 首页 Hero、精选活动、赞助商 Logo → 全部接 CMS

**5.14 - 5.15**
- [ ] `join/page.tsx` — 把固定表单字段替换为 `Events.form_schema` 动态渲染
- [ ] 报名提交接 `/api/v1/registrations`（NestJS 微服务）
- [ ] `contact/page.tsx` — 联系表单接后端（如有）

**注意：** 替换后立即在本地测试，确认数据正确显示再提交 PR。

---

### Yeon — 替换 Mock 数据（接真实 API）

**5.11 - 5.13**
- [ ] 把所有 `useQuery` hooks 从 Mock 数据切换为真实 Strapi API 调用
- [ ] 测试成员/部门/活动的增删改查全流程
- [ ] SchemaBuilder 保存的 form_schema 能正确写入 Strapi Events 表

**5.14 - 5.15**
- [ ] 报名详情页接真实数据，审核状态切换（PATCH `/api/registrations/:id`）
- [ ] CSV 导出按钮接 Austin 的 `/api/v1/registrations/export?eventId=xxx`
- [ ] TipTap 富文本编辑器接入往期活动描述字段

**5.16 - 5.17 — PR + 集成验证**
- [ ] 所有功能提交 PR，合并进 `dev`
- [ ] 本周 Demo：完整报名流程端到端（Join Us 填表 → 提交 → 后台看到记录 → 审核 → CSV 导出）

---

### Austin + Mike — 支持联调

**5.11 - 5.17**
- [ ] 保持 Strapi 和 NestJS 本地服务稳定运行，随时支持 Emilia/Yeon 联调
- [ ] 排查接口错误、CORS 问题、数据格式不匹配
- [ ] Rate Limit 防刷验证（模拟高频请求确认 429 正确返回）
- [ ] 鉴权中间件：后台 API 请求 Token 校验

---

### Simon — 集成测试 + E2E 骨架

**5.11 - 5.17**
- [ ] `registration.service.spec.ts` — 报名逻辑、错误处理（活动已关闭、已满员）
- [ ] `rate-limit.guard.spec.ts` — 限频是否生效
- [ ] E2E 骨架：`join-flow.spec.ts`（打开页面 → 填表 → 提交 → 成功提示）
- [ ] E2E 骨架：`admin-login.spec.ts`（登录 → 新增成员 → 删除成员）

---

### 第三周交付物
- ✅ 客户端全部接真实数据，无 hardcode
- ✅ 后台前端所有页面功能完整，增删改查跑通
- ✅ 完整报名流程端到端跑通
- ✅ Simon：后端集成测试 + E2E 骨架完成

---

## 第四周 5.18 - 5.24｜全面测试 + Bug 修复（DDL 5.24）

### 目标
全面测试所有功能，修复 Bug，达到可上线标准。

### 任务清单

**5.18 周一 — 测试计划评审会**
- [ ] 列出所有需要测试的功能点
- [ ] 分配测试负责人
- [ ] 确认上线前 checklist

**5.18 - 5.21 — 功能测试**

| 测试范围 | 测试内容 | 负责人 |
|---------|---------|--------|
| 客户端 UI | 所有页面 Desktop + Mobile，Chrome / Safari 兼容性 | Simon + Emilia |
| 客户端数据 | CMS 改数据后前台是否正确更新 | Simon |
| 报名流程 | 填写表单 → 提交 → 后台收到 → 审核 → 邮件通知 | Simon + 全员 |
| 后台功能 | 增删改查各数据表，富文本编辑，图片上传 | Simon + Yeon |
| 防刷测试 | 短时间大量请求触发 Rate Limit，确认 429 正确拦截 | Austin |
| CSV 导出 | 报名数据 CSV 格式验证，中文不乱码 | Austin + Yeon |
| 边界情况 | 空数据状态、网络断开、表单必填校验 | Simon |

**5.21 - 5.23 — Bug 修复**
- [ ] 严重 Bug（功能不可用）：当天修复
- [ ] 一般 Bug（UI 错位等）：5.23 前修复
- [ ] 性能优化：图片懒加载、GraphQL query 精简

**5.24 周日 — DDL：测试全部通过**
- [ ] 所有功能测试通过，无严重 Bug
- [ ] 代码全部合并进 `dev`
- [ ] 部署到 Staging 环境，最终验收

### 第四周交付物
- ✅ 全功能测试完成（DDL 5.24）
- ✅ 无 P0/P1 级别 Bug
- ✅ Staging 环境部署完成

---

## 第五周 5.25 - 5.31｜正式上线

### 目标
生产环境部署，上线发布，完成文档交接。

### 任务清单

**5.25 - 5.26 — 上线准备**
- [ ] `dev` → `main` 合并（PR + 最终 Review）
- [ ] 生产环境变量配置（Vercel 环境变量、数据库连接）
- [ ] Vercel 部署客户端前端，确认构建成功
- [ ] Vercel 部署后台前端
- [ ] Docker 部署后端（Strapi + NestJS + PostgreSQL + Redis）
- [ ] 域名 DNS 配置，SSL 证书验证

**5.27 - 5.28 — 上线后验证**
- [ ] 生产环境完整走一遍报名流程
- [ ] 验证 ISR 缓存在生产环境正常工作
- [ ] 确认 CMS 内容在生产环境可以正常更新
- [ ] 监控第一批用户访问，观察是否有报错

**5.29 - 5.31 — 收尾与交接**
- [ ] 编写 CMS 维护交接文档（供非技术管理员使用）
- [ ] 编写部署运维文档
- [ ] 项目总结会议

### 第五周交付物
- ✅ 官网正式上线
- ✅ CMS 交接文档
- ✅ 部署运维文档

---

## 里程碑总览

| 里程碑 | 日期 | 标准 |
|--------|------|------|
| M1：硬编码 UI 完成 | 5.3 | 7 个客户端页面 UI + 后台骨架，合并进 dev |
| M2：后端 API 就绪 | 5.10 | Strapi 建表 + Seed 数据，GraphQL 可查；NestJS CSV 接口跑通 |
| M3：联调完成 | 5.17 | 完整报名流程端到端跑通，所有假数据替换为真实 API |
| M4：测试通过 | 5.24 | 无 P0/P1 Bug，Staging 验收通过 |
| M5：正式上线 | 5.31 | 生产环境部署成功，域名可访问 |

---

## 风险提示

| 风险 | 概率 | 应对 |
|------|------|------|
| 联调阶段出现大量接口不匹配 | 中 | 第一周就确定好 form_schema 格式，提前对齐 |
| 某成员进度落后影响整体 | 中 | 每周 Demo 强制检查进度，及时 replan |
| 上线前发现严重 Bug | 低 | 第四周预留 3 天专门修 Bug，不新增功能 |
| 域名/部署配置耗时超预期 | 中 | 5.25 开始上线准备，留足 2 天缓冲 |
| 硬编码假数据格式与真实 API 不一致 | 低 | 提前共享 form_schema 格式（第一周开会就定死） |
