# Commit 02 — Strapi 核心配置

**对应文件：**
- `backend/strapi/config/database.ts`
- `backend/strapi/config/plugins.ts`
- `backend/strapi/config/middlewares.ts`

**Commit message：** `feat(strapi): 实现数据库、插件、中间件配置`

---

## 做了什么

实现 Strapi 的三个核心配置文件，让 Strapi 能：
1. 连接 PostgreSQL 数据库
2. 启用 GraphQL API（前台查询用）
3. 允许前台（3000）和后台（3001）跨域请求

---

## database.ts — 数据库连接

### 关键设计

```typescript
export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host:     env('DATABASE_HOST',     'localhost'),
      port:     env('DATABASE_PORT',     5432),
      database: env('DATABASE_NAME',     'cssa_web_dev'),
      user:     env('DATABASE_USERNAME', 'postgres'),
      password: env('DATABASE_PASSWORD', 'postgres'),
    },
    pool: { min: 2, max: 10 },   // 连接池，避免频繁建立/断开连接
  },
})
```

**为什么用 `env()` 而不是直接写值：**  
开发环境密码可以写 `postgres`，但生产环境必须用强密码。  
如果直接写死，生产部署时要改代码，有安全风险。  
用环境变量，只需要在部署平台（Railway/Heroku）设置一次，代码不变。

---

## plugins.ts — 插件配置

### GraphQL 插件

```typescript
graphql: {
  enabled: true,
  config: {
    endpoint: '/graphql',
    shadowCRUD: true,      // 自动生成所有 Content Type 的 GraphQL 类型和 CRUD 操作
    depthLimit: 7,         // 防止 query { a { b { c { d { e { f { g } } } } } } } 类型攻击
    amountLimit: 100,      // 单次最多返回 100 条，防止全量拉取拖垮数据库
    playgroundAlwaysEnable: env('NODE_ENV') !== 'production',
  }
}
```

**shadowCRUD 是什么：**  
开启后，Strapi 自动为每个 Content Type 生成 GraphQL 的 `Query`（查询）和 `Mutation`（增删改）。  
不需要手动写 resolver，Emilia 可以直接在 GraphQL Playground 里查询数据。

---

## middlewares.ts — 中间件（重点：CORS）

### 什么是 CORS 以及为什么重要

当前台页面（`localhost:3000`）向 Strapi（`localhost:1337`）发请求时，  
浏览器会检查：Strapi 是否允许来自 `localhost:3000` 的请求？  
如果没有配置 CORS，浏览器会拒绝这个请求，前台数据加载不出来。

```typescript
{
  name: 'strapi::cors',
  config: {
    origin: [
      'http://localhost:3000',    // 客户端前台
      'http://localhost:3001',    // 后台前端
      process.env.CLIENT_URL,    // 生产域名
      process.env.ADMIN_FRONTEND_URL,
    ].filter(Boolean),           // 过滤 undefined（未设置的环境变量）
  },
}
```

---

## 验证成功的标志

启动 Strapi 后访问 `http://localhost:1337/graphql`，  
应该看到 GraphQL Playground 界面（开发环境）。

```bash
cd backend/strapi
npm install
npm run develop
# 访问 http://localhost:1337/admin 完成初始化
```
