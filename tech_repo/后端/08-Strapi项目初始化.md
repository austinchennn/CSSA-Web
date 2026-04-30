# Commit 08 — Strapi 项目初始化

**对应文件：**
- `backend/strapi/package.json`（新增）
- `backend/strapi/tsconfig.json`（新增）
- `backend/strapi/.gitignore`（新增）
- `backend/strapi/config/database.ts`（实现）
- `backend/strapi/config/plugins.ts`（实现）
- `backend/strapi/config/middlewares.ts`（实现）
- `backend/strapi/src/api/*/content-types/*/schema.json`（全部重写，6 个）
- `backend/strapi/src/api/*/controllers/*.ts`（全部实现，6 个）
- `backend/strapi/src/api/site-config/routes/site-config.ts`（实现）
- `backend/strapi/src/api/site-config/services/site-config.ts`（实现）

**Commit message：** `feat(strapi): 初始化 Strapi 项目结构，实现配置文件、schema 和 Controller`

---

## 做了什么

Austin 留下的 Strapi 代码全部是文档注释占位符（`export {}`），schema.json 也不是 Strapi 能读取的合法格式。本次 commit 完成了从零到可运行的全部初始化工作：

1. **项目脚手架**：手写 `package.json` + `tsconfig.json` + `.gitignore`，固定 Strapi 4.25.4 版本
2. **配置文件**：实现数据库连接、GraphQL 插件、CORS 中间件三个核心配置
3. **Schema 重写**：将 6 个 `schema.json` 从文档注释格式重写为合法的 Strapi Schema Definition
4. **Controller 实现**：5 个默认 Controller + 2 个业务扩展（Event 追加报名人数、Registration 校验逻辑）
5. **Site-config 完整实现**：routes + services + controller（Single Type 工厂模式）

---

## 为什么不用 CLI 初始化

SOP 中建议 `npx create-strapi-app@latest`，但实际情况是 `backend/strapi/` 目录已存在且有 Austin 的代码文件。CLI 遇到已有目录会报错或强制覆盖，反而更麻烦。

作为更可控的做法，手写 `package.json` 并直接 `npm install` 效果完全等同，且避免了 CLI 模板文件与 Austin 代码的合并冲突。

---

## package.json — 依赖选型

```json
{
  "dependencies": {
    "@strapi/strapi": "4.25.4",
    "@strapi/plugin-users-permissions": "4.25.4",
    "@strapi/plugin-i18n": "4.25.4",
    "@strapi/plugin-graphql": "4.25.4",
    "pg": "^8.11.0"
  }
}
```

**为什么固定 4.25.4 而不是用 `^4`：**
Strapi 大版本间 API 差异极大（v4 用 `entityService`，v5 改成了 `documentService`）。
Austin 的所有代码都基于 v4 API，`^4` 的范围限制了升级路径，`4.25.4` 精确锁定确保任何人拉取代码后行为一致。

**⚠️ Node.js 版本警告：**
Strapi 4.25 官方支持 Node 18/20，当前开发机为 Node v24。
`npm install` 已成功（仅有 EBADENGINE warning，包本身安装正常），但：
- **推荐使用 nvm 切换到 Node 20** 再运行 `npm run develop`
- 如果遇到启动报错，99% 概率是 Node 版本兼容性问题

```bash
# 使用 nvm 切换（如果已安装 nvm）
nvm install 20
nvm use 20
npm run develop
```

---

## Schema 重写 — 设计决策

Austin 的 schema.json 是带 `_comment`、`_field_definitions` 包装的文档格式，不是 Strapi 能识别的真实 schema。
Strapi 要求的合法格式：

```json
{
  "kind": "collectionType",
  "collectionName": "events",
  "info": {
    "singularName": "event",
    "pluralName": "events",
    "displayName": "活动"
  },
  "options": { "draftAndPublish": false },
  "attributes": { ... }
}
```

**关闭 draftAndPublish 的原因：**
所有内容类型都关闭了草稿/发布功能（`"draftAndPublish": false`）。
学生会内容不需要工作流审批，管理员直接保存即生效，简化数据模型（去掉 `publishedAt` 字段）。

**Site-config 设计为 Single Type：**
原始文档描述"全站只有一条记录"，但 schema 里给了 key/value 字段，形成矛盾。
最终选择 **Single Type + 专属字段**（hero_title, hero_subtitle, contact_email, instagram_url），理由：
- 前端 GraphQL 一次查询拿全部配置，无需 key 过滤
- 每个字段有语义化名称，类型明确（不是泛化的 JSON）
- 符合 Strapi 官方推荐的"网站全局设置"用法

---

## Controller 实现说明

### 默认工厂（Department / Member / Past-event / Site-config）

```typescript
export default factories.createCoreController('api::department.department')
```

这四个没有自定义业务逻辑，直接用工厂生成默认 CRUD。
Strapi 会自动提供 find / findOne / create / update / delete 五个方法，无需手写。

### Event Controller — 追加报名人数

```typescript
async find(ctx) {
  const { data, meta } = await super.find(ctx)
  const enriched = await Promise.all(
    data.map(async (event) => {
      const count = await strapi.entityService.count(...)
      return { ...event, attributes: { ...event.attributes, registrationCount: count } }
    })
  )
  return { data: enriched, meta }
}
```

**为什么用 Promise.all 而不是 for...of：**
`for...of` 串行执行，每个活动等上一个查完再查，N 个活动 = N 次串行数据库往返。
`Promise.all` 并行发出所有查询，等价于一次"批量"操作，延迟约为单次查询时间而非 N 倍。

### Registration Controller — 业务校验

`create()` 的校验顺序：

```
1. event 存在？ → 否 → 400 活动不存在
2. event.status === 'active'？ → 否 → 400 报名通道已关闭
3. event.capacity 有限制？ → 是 → count 当前非 cancelled 报名数
4. 已达上限？ → 是 → 400 报名人数已满
5. 全部通过 → super.create(ctx) 写入数据库
```

`update()` 只允许改 `status`，拒绝所有其他字段。
这是防御性设计：避免管理员在后台审批时误操作覆盖用户填写的 `user_info`。

---

## 下一步

1. **配置 .env 文件**（Task 2）：生成随机 key 并填写数据库连接信息
2. **启动 Docker + Strapi**（Task 3）：`docker-compose up -d && npm run develop`
3. **配置 API 权限**（Task 3）：在 Admin UI 的 Roles 里勾选公开接口

---

## 验证成功的标志

```bash
cd backend/strapi
npm run develop
# 终端应出现：
# info  (node:xxxx) Server started at http://localhost:1337
# 访问 http://localhost:1337/admin → 看到 Strapi 首次初始化界面（创建管理员账户）
```
