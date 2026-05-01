# 后端联调说明 — Simon（后台管理前端）

> 更新时间：2026-05-01  
> 适用分支：`dev`（合并后）  
> 前置条件：后端已按启动顺序运行（Docker + Strapi + 微服务）

---

## 你需要对接的服务

| 服务 | 地址 | 用途 |
|------|------|------|
| Strapi REST API | `http://localhost:1337` | 报名管理、内容管理 |
| NestJS 微服务 | `http://localhost:3002` | CSV 导出 |

---

## 1. 认证方式

所有调用 Strapi 的请求都需要携带 API Token：

```
Authorization: Bearer <STRAPI_API_TOKEN>
```

> Token 由 Austin 提供，或自行在 Strapi 后台 Settings → API Tokens 生成。  
> 在 `.env` 里配置：`STRAPI_API_TOKEN=xxxxxxx`

---

## 2. 报名管理接口

### 查询报名列表

```
GET http://localhost:1337/api/registrations?populate=event&pagination[pageSize]=25&pagination[page]=1
Authorization: Bearer <token>
```

**筛选特定活动的报名：**
```
GET http://localhost:1337/api/registrations?filters[event][id][$eq]=1&populate=event
```

**按状态筛选：**
```
GET http://localhost:1337/api/registrations?filters[status][$eq]=pending&populate=event
```

**响应结构：**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "status": "pending",
        "user_info": { "name": "张三", "email": "zs@test.com" },
        "createdAt": "2026-05-01T22:00:00.000Z",
        "event": {
          "data": {
            "id": 1,
            "attributes": { "title": "UTMCSSA 年会" }
          }
        }
      }
    }
  ],
  "meta": {
    "pagination": { "page": 1, "pageSize": 25, "pageCount": 1, "total": 5 }
  }
}
```

---

### 更新报名状态

只允许修改 `status` 字段（Strapi controller 层已限制，其他字段更新会被忽略）。

```
PUT http://localhost:1337/api/registrations/<id>
Authorization: Bearer <token>
Content-Type: application/json

{
  "data": {
    "status": "confirmed"
  }
}
```

**status 可选值：**

| 值 | 含义 |
|----|------|
| `pending` | 待审核（默认） |
| `confirmed` | 已确认 |
| `cancelled` | 已取消 |

**成功响应：** `200 OK`，返回更新后的报名记录。

---

### 删除报名记录

```
DELETE http://localhost:1337/api/registrations/<id>
Authorization: Bearer <token>
```

---

## 3. CSV 导出

通过 NestJS 微服务导出指定活动的所有报名数据为 CSV 文件。

```
GET http://localhost:3002/api/v1/registrations/export?eventId=<活动ID>
```

> 注意：此接口**不需要** Authorization header，由微服务内部携带 token 调用 Strapi。

**前端触发下载：**
```typescript
const res = await fetch(`http://localhost:3002/api/v1/registrations/export?eventId=${eventId}`);
const blob = await res.blob();
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = `registrations-event-${eventId}.csv`;
a.click();
URL.revokeObjectURL(url);
```

**CSV 格式示例：**
```
报名ID,状态,姓名,邮箱
1,pending,张三,zs@test.com
2,confirmed,李四,ls@test.com
```

> 文件含 UTF-8 BOM，Excel 直接打开中文不乱码。

---

## 4. 活动管理接口

### 查询活动列表

```
GET http://localhost:1337/api/events?populate=registrations
Authorization: Bearer <token>
```

**响应中含 `registrationCount`：**
```json
{
  "id": 1,
  "attributes": {
    "title": "UTMCSSA 年会",
    "capacity": 50,
    "status": "active",
    "registrationCount": 5
  }
}
```

### 更新活动状态

```
PUT http://localhost:1337/api/events/<id>
Authorization: Bearer <token>
Content-Type: application/json

{
  "data": {
    "status": "closed"
  }
}
```

**status 可选值：** `active`（报名中）/ `upcoming`（即将开始）/ `closed`（已结束）

---

## 5. 其他内容管理接口

| 资源 | 端点 | 说明 |
|------|------|------|
| 部门 | `GET/POST/PUT /api/departments` | 6 个部门 |
| 成员 | `GET/POST/PUT /api/members` | 9 名成员 |
| 往期活动 | `GET/POST/PUT /api/past-events` | 历史活动存档 |
| 全站配置 | `GET/PUT /api/site-config` | 社交链接、关于我们等 |
| 赞助商 | `GET/POST/PUT /api/sponsors` | 赞助商信息 |

所有接口均需 `Authorization: Bearer <token>` header。

查询时加 `?populate=*` 可展开关联字段。

---

## 6. 环境变量建议

在 `admin-frontend/.env.local` 里配置：

```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=你的token（服务端用，不加NEXT_PUBLIC_前缀）
NEXT_PUBLIC_MICROSERVICE_URL=http://localhost:3002
```

> `STRAPI_API_TOKEN` 不要加 `NEXT_PUBLIC_` 前缀，避免 token 暴露到浏览器端。  
> 在 Next.js API Route 或 Server Component 里调用 Strapi，不要在客户端直接调用。
