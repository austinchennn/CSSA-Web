# 代码合并冲突总结 (Conflict Summary)

## 背景
在合并代码到当前分支 (`feature-austin-backend-infra` 或与其他人的代码合并) 时，产生了大量的冲突（例如 `backend/microservice/src/main.ts`、`app.module.ts` 以及数个 Controller/schema 文件等）。

## 冲突产生的原因分析

本次核心冲突源于以下两波不同任务同时对相同上下文的代码进行了修改：

1. **初始化/基础架构更新 (Austin)**：
   主打基础骨架搭建，例如给微服务提供基础入口文件 (`main.ts`, `app.module.ts`)、基础设施模块 (`queue` 和 `registration`) 以及基础保护如 `Rate-Limit Guard` 等。这部分代码中常常会添加大量标准化的说明头部注释（File DocBlocks）以及具体的安全过滤规则和类型转换。
   
2. **后端具体功能实现扩展 (Mike/Origin)**：
   同步进行的另一份工作中（如 `origin/dev`），其他开发者为了能够跑通业务逻辑（Task 4, 5 等），在此基础上独立写入了具体的 `bootstrap` 逻辑、Controller 方法体以调用对应的服务等。例如 `main.ts` 中直接硬编码了特定的 CORS 源和校验管道 (`ValidationPipe`) 以完成业务对接。由于两边都直接触碰了微服务的**核心入口**及**公用注册模块**，所以在 `merge` 或 `pull` 的时候 Git 无法自动裁决（例如在导入语句、文件顶部注、以及相似却有细节差异的服务注册代码上）。

## 如何解决
以 `backend/microservice/src/main.ts` 为例，我们采取了以下合并策略：
- **保留结构化文档注释**：采用 `origin/dev` 提供的较丰富的方法/变量注视为骨架，融合我们在 `HEAD` 中的上下文规范。
- **保留健壮的代码实现**：采用 `HEAD` 这里的细粒度实现方式（比如用 `.filter(Boolean) as string[]` 保障本地测试环境与环境变量的兼容），以及启用 `transform: true` 进行自动 DTO 数据变形，提升整体系统的工程健壮性。

请其他同事留意，未来处理相交的代码区域时，建议在 Slack 或群里提前沟通接口参数和注册管道，尽量避免并行修改核心配置（如：`app.module.ts`, `main.ts`, Strapi 的 config），减少此类结构性冲突的发生。
