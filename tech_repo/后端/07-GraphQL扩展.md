# Commit 07 — GraphQL Schema 扩展

**对应文件：** `backend/strapi/src/extensions/graphql/schema.graphql`  
**Commit message：** `feat(strapi): 实现 GraphQL schema 扩展和前端查询示例`

---

## 做了什么

在 Strapi 自动生成的 GraphQL Schema 基础上，添加了：
1. 自定义 Query：`registrationCountByEvent`（报名人数统计）
2. 前端所有查询的完整示例代码（供 Emilia 联调时直接参考）

---

## Strapi GraphQL 是怎么工作的

```
你写 schema.json（定义表结构）
    ↓
Strapi 启动时自动生成：
    - GraphQL 类型（type Event { ... }）
    - 查询（query { events { ... } }）
    - 增删改（mutation { createEvent / updateEvent / deleteEvent }）
    ↓
前端直接用 GraphQL 查数据，不需要后端写额外 API
```

这个 `schema.graphql` 文件是用来「扩展」自动生成的部分，添加 Strapi 生成不了的自定义逻辑。

---

## 自定义 Query：registrationCountByEvent

```graphql
extend type Query {
  registrationCountByEvent(eventId: ID!): Int
}
```

**用途：** 后台活动列表页显示「已报名 23 / 上限 50」，  
需要知道每个活动当前有多少报名记录。

**注意：** 这里只定义了 Query 的签名（接受 eventId 参数，返回 Int），  
实际的 resolver 逻辑需要 Mike 在 Strapi 的 `extensions` 文件里实现。

---

## Emilia 前端需要的 4 个 GraphQL 查询

### 查询 1：全站配置（首页 Hero、联系信息等）

```graphql
query GetSiteConfig {
  siteConfig {
    data {
      attributes {
        heroTitle
        heroSubtitle
        contactEmail
        instagramUrl
        wechatId
        joinUsDescription
      }
    }
  }
}
```

**使用位置：** 首页 Hero 区域、Contact 页联系信息、Join Us 页说明文案

---

### 查询 2：所有部门及成员（Team 页）

```graphql
query GetTeam {
  departments(sort: "name:asc", populate: "members.photo") {
    data {
      id
      attributes {
        name
        leaderName
        introduction
        members(sort: "order:desc") {
          data {
            id
            attributes {
              name
              title
              order
              photo {
                data {
                  attributes {
                    url
                    alternativeText
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

**使用位置：** Team 页，按部门分组展示成员卡片

---

### 查询 3：当前开放报名的活动（Join Us 页）

```graphql
query GetActiveEvents {
  events(
    filters: { status: { eq: "active" } }
    sort: "startTime:asc"
  ) {
    data {
      id
      attributes {
        title
        startTime
        location
        capacity
        formSchema
        status
        coverImage {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
  }
}
```

**注意：** `formSchema` 是 JSON 字段，返回的是一个数组对象，  
Emilia 需要用 `JSON.parse()` 处理后再渲染动态表单。

---

### 查询 4：往期活动（Events 页 Timeline）

```graphql
query GetPastEvents {
  pastEvents(sort: "eventDate:desc") {
    data {
      id
      attributes {
        eventName
        introduction
        eventDate
        photo {
          data {
            attributes {
              url
              alternativeText
            }
          }
        }
      }
    }
  }
}
```

**`sort: "eventDate:desc"`** = 最新的活动排在最上面

---

## 如何在 Strapi 里测试这些查询

1. 启动 Strapi：`cd backend/strapi && npm run develop`
2. 打开 `http://localhost:1337/graphql`（GraphQL Playground）
3. 在 Strapi Admin 先创建一些测试数据
4. 把上面的查询粘贴进 Playground 左侧，点击运行
5. 右侧看到数据说明 GraphQL 工作正常

---

## 验证成功的标志

GraphQL Playground 里运行 `GetTeam` 查询，返回包含部门和成员数据的 JSON。
