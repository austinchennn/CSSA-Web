# 后端联调说明 — Emilia（客户端前台）

> 更新时间：2026-05-01  
> 适用分支：`dev`（合并后）  
> 前置条件：后端已按启动顺序运行（Docker + Strapi + 微服务）

---

## 你需要对接的两个服务

| 服务 | 地址 | 用途 |
|------|------|------|
| Strapi GraphQL | `http://localhost:1337/graphql` | 查询所有页面数据 |
| NestJS 微服务 | `http://localhost:3002` | 提交报名表单 |

---

## 1. GraphQL 数据查询

所有页面内容（部门、成员、活动、赞助商、全站配置）均通过 GraphQL 获取。

**Playground 测试地址：** `http://localhost:1337/graphql`

### 常用查询示例

**查询所有部门：**
```graphql
query {
  departments {
    data {
      id
      attributes {
        name
        leader_name
        introduction
      }
    }
  }
}
```

**查询所有成员：**
```graphql
query {
  members {
    data {
      id
      attributes {
        name
        role
        department
        photo {
          data {
            attributes {
              url
            }
          }
        }
        introduction
        major
      }
    }
  }
}
```

**查询进行中的活动（含报名人数）：**
```graphql
query {
  events(filters: { status: { eq: "active" } }) {
    data {
      id
      attributes {
        title
        description
        location
        start_time
        capacity
        status
        form_schema
        registrationCount
      }
    }
  }
}
```

**查询全站配置（社交链接、关于我们文案等）：**
```graphql
query {
  siteConfig {
    data {
      attributes {
        social_links
        about_description
        join_us_description
      }
    }
  }
}
```

**查询往期活动：**
```graphql
query {
  pastEvents {
    data {
      id
      attributes {
        title
        date
        description
        cover_image {
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

> GraphQL 不需要 Authorization header，Public 权限已开放。

---

## 2. 报名表单提交

活动报名通过 NestJS 微服务的 REST 接口提交，**不走 Strapi**。

### 接口信息

```
POST http://localhost:3002/api/v1/registrations
Content-Type: application/json
```

### 请求 Body

```json
{
  "eventId": "1",
  "userInfo": {
    "name": "张三",
    "email": "zhangsan@example.com"
  }
}
```

> `eventId` 是 Strapi 活动的 `id`（从 GraphQL 查询结果里取）。  
> `userInfo` 的字段由活动的 `form_schema` 动态决定，按 schema 里的 `field` 名称作为 key。

### 成功响应

```json
{ "success": true, "id": "1" }
```

### 错误响应

| HTTP 状态码 | 含义 |
|------------|------|
| `400` | 请求参数格式错误（缺字段） |
| `409` | 活动已结束 / 名额已满 |
| `429` | 提交过于频繁（60 秒内超过 5 次），请提示用户稍后再试 |
| `503` | 后端服务暂时不可达 |

### 前端处理建议

```typescript
const res = await fetch('http://localhost:3002/api/v1/registrations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ eventId, userInfo }),
});

const data = await res.json();

if (res.status === 429) {
  // 显示："提交过于频繁，请稍后再试"
} else if (res.status === 409) {
  // 显示：data.message（活动已结束 or 名额已满）
} else if (data.success) {
  // 显示报名成功提示
}
```

---

## 3. 动态表单渲染

活动的 `form_schema` 是一个 JSON 数组，描述表单字段，前端需要根据它动态渲染报名表单：

```json
[
  { "field": "name",  "label": "姓名", "type": "text",  "required": true },
  { "field": "email", "label": "邮箱", "type": "email", "required": true }
]
```

| 属性 | 类型 | 说明 |
|------|------|------|
| `field` | string | 对应 `userInfo` 里的 key |
| `label` | string | 表单标签显示文字 |
| `type` | string | `text` / `email` / `number` / `select` |
| `required` | boolean | 是否必填 |

---

## 4. 图片 URL

Strapi 返回的图片 `url` 是相对路径（如 `/uploads/photo.jpg`），完整地址需加上 Strapi 域名：

```typescript
const imageUrl = `http://localhost:1337${attributes.photo.data.attributes.url}`;
```

生产环境图片走 Cloudinary，URL 会是完整的 `https://res.cloudinary.com/...`，无需拼接。

---

## 5. 环境变量建议

在 `client/.env.local` 里配置：

```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:1337/graphql
NEXT_PUBLIC_MICROSERVICE_URL=http://localhost:3002
```
