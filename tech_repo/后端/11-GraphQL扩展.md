# Commit 11 — GraphQL Schema 扩展与自定义 Resolver

**对应文件：**
- `backend/strapi/src/extensions/graphql/schema.graphql`（追加 SDL）
- `backend/strapi/src/extensions/graphql/resolvers.ts`（新增）
- `backend/strapi/src/index.ts`（新增）

**Commit message：** `feat(strapi): 实现 registrationCountByEvent GraphQL resolver`

---

## 做了什么

为 Strapi GraphQL API 添加一个自定义聚合查询：`registrationCountByEvent`，
让前端/后台可以通过 GraphQL 直接查询某活动的当前有效报名人数，
而不需要拉取完整 registrations 列表再在客户端 count。

---

## 三个文件各自的职责

```
schema.graphql   ← 告诉 GraphQL "这个 Query 存在，参数和返回类型是什么"
resolvers.ts     ← 实现这个 Query 的实际逻辑（查数据库）
src/index.ts     ← 把 resolver 注册到 Strapi 的生命周期钩子里
```

三者缺一不可：只有 schema 没有 resolver 会报 "no resolver found"；
只有 resolver 没注册进 Strapi 则 GraphQL 根本不知道它的存在。

---

## schema.graphql — SDL 扩展

```graphql
extend type Query {
  registrationCountByEvent(eventId: ID!): Int
}
```

**为什么用 `extend type Query` 而不是 `type Query`：**
Strapi GraphQL 插件通过 shadowCRUD 已经生成了一个 `type Query { ... }`，
如果再写一个 `type Query` 会产生冲突（类型重复定义错误）。
`extend type Query` 的语义是"在已有的 Query 类型上追加字段"，不冲突。

---

## resolvers.ts — 实现逻辑

```typescript
registrationCountByEvent: async (_parent, args, context) => {
  return context.strapi.entityService.count(
    'api::registration.registration',
    {
      filters: {
        event: { id: args.eventId },
        status: { $ne: 'cancelled' },  // 已取消的不计入
      },
    }
  )
}
```

**为什么不直接用 `event.registrations.length`：**
`registrations` 是关联字段，Strapi 默认不 populate，需要额外请求。
`entityService.count` 直接发 COUNT SQL 查询，只返回数字，开销极小。
在活动列表页每个活动都需要这个数字时，N 次 count 比 N 次 populate 快得多。

---

## src/index.ts — 注册时机

```typescript
export default {
  register({ strapi }) {
    const extensionService = strapi.plugin('graphql').service('extension')
    extensionService.use({ resolvers })
  },
}
```

**register 钩子 vs bootstrap 钩子的区别：**
- `register`：插件加载后、HTTP 服务启动前 → 适合修改/扩展插件配置（如注册 resolver）
- `bootstrap`：应用完全启动后 → 适合初始化数据、建立外部连接

必须用 `register` 而不是 `bootstrap`，因为 GraphQL schema 在 HTTP 服务启动时就已经编译固定，之后无法修改。

---

## 验证方法

Strapi 启动后，打开 GraphQL Playground（`http://localhost:1337/graphql`）：

```graphql
query {
  registrationCountByEvent(eventId: "1")
}
```

**预期返回：**
```json
{
  "data": {
    "registrationCountByEvent": 0
  }
}
```

（活动 ID 1 的非取消报名数，初始为 0）
