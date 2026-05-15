# Commit 03 — 6 个 Content Type Schema（数据表定义）

**对应文件：** `backend/strapi/src/api/*/content-types/*/schema.json` × 6  
**Commit message：** `feat(strapi): 实现 6 个 Content Type schema 和 config 配置`

---

## 做了什么

将 6 张数据表从设计文档（只有注释的 JSON）转换为真正的 Strapi schema 格式，  
Strapi 启动时会自动读取这些文件，在 PostgreSQL 里创建对应的数据库表。

---

## 什么是 Content Type

Content Type = Strapi 里的一张数据表。  
你在 `schema.json` 里定义字段，Strapi 自动帮你：
- 在 PostgreSQL 里建表
- 生成 REST API（GET/POST/PUT/DELETE）
- 生成 GraphQL 类型和查询

---

## 6 张表的完整结构

### 1. Site_Configs（全站配置）— Single Type

```
类型：singleType（全站只有一条记录）
文件：backend/strapi/src/api/site-config/content-types/site-config/schema.json
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `hero_title` | string | ✅ | 首页 Hero 大标题 |
| `hero_subtitle` | text | ❌ | 首页副标题 |
| `contact_email` | email | ✅ | 联系邮箱 |
| `instagram_url` | string | ❌ | Instagram 链接 |
| `wechat_id` | string | ❌ | 微信公众号 ID |
| `about_description` | text | ❌ | 关于我们页面描述 |
| `join_us_description` | text | ❌ | 加入我们页面描述 |

---

### 2. Departments（部门）— Collection Type

```
类型：collectionType（多条记录）
文件：backend/strapi/src/api/department/content-types/department/schema.json
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `name` | string | ✅ | 部门名称（唯一） |
| `leader_name` | string | ✅ | 现任部长姓名 |
| `introduction` | text | ❌ | 部门职能描述 |
| `members` | relation | — | 反向关联：该部门的所有成员 |

---

### 3. Members（成员）— Collection Type

```
类型：collectionType
文件：backend/strapi/src/api/member/content-types/member/schema.json
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `name` | string | ✅ | 成员姓名 |
| `title` | string | ✅ | 职位（如"主席"） |
| `photo` | media（图片）| ✅ | 头像，强制必填 |
| `order` | integer | ❌ | 排序权重，越大越靠前 |
| `department` | relation | ✅ | 外键，关联 Departments |

---

### 4. Events（活动）— Collection Type ⭐

```
类型：collectionType
文件：backend/strapi/src/api/event/content-types/event/schema.json
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | ✅ | 活动名称 |
| `start_time` | datetime | ✅ | 活动时间 |
| `location` | string | ❌ | 活动地点 |
| `description` | richtext | ❌ | 活动详情（富文本）|
| `cover_image` | media | ❌ | 活动封面图 |
| `capacity` | integer | ❌ | 人数上限，null = 不限 |
| `form_schema` | **json** | ✅ | 动态表单结构（见下方说明）|
| `status` | enum | ✅ | upcoming / active / closed |
| `registrations` | relation | — | 反向关联：该活动所有报名 |

**form_schema 格式（重要）：**
```json
[
  { "key": "name",  "label": "姓名", "type": "text",   "required": true  },
  { "key": "email", "label": "邮箱", "type": "email",  "required": true  },
  { "key": "year",  "label": "年级", "type": "select", "required": false,
    "options": ["大一", "大二", "大三", "大四"] }
]
```

---

### 5. Past_Events（往期活动）— Collection Type

```
类型：collectionType
文件：backend/strapi/src/api/past-event/content-types/past-event/schema.json
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `event_name` | string | ✅ | 活动名称 |
| `introduction` | richtext | ✅ | 活动介绍与总结 |
| `photo` | media | ✅ | 封面图（强制必填）|
| `event_date` | date | ✅ | 举办日期 |

前台 Timeline 按 `event_date` 倒序（最新在上）。

---

### 6. Registrations（报名记录）— Collection Type

```
类型：collectionType
文件：backend/strapi/src/api/registration/content-types/registration/schema.json
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `event` | relation | ✅ | 外键，关联 Events |
| `user_info` | **json** | ✅ | 动态表单答案（见下方）|
| `status` | enum | ✅ | pending / confirmed / cancelled |

**user_info 格式：**  
Key 对应 `Events.form_schema` 中的 `key` 字段：
```json
{ "name": "张三", "email": "zhangsan@test.com", "year": "大一" }
```

---

## Strapi Schema 文件结构说明

每个 `schema.json` 的顶层结构：

```json
{
  "kind": "collectionType",        // 或 "singleType"
  "collectionName": "events",      // 数据库表名
  "info": {
    "singularName": "event",       // API 单数名（URL 用）
    "pluralName": "events",        // API 复数名
    "displayName": "活动 Event"    // Strapi Admin UI 显示名
  },
  "options": {
    "draftAndPublish": true        // 是否启用草稿/发布状态
  },
  "attributes": { ... }           // 字段定义
}
```

---

## 验证成功的标志

Strapi 启动后，进入 `http://localhost:1337/admin`：
- Content-Type Builder 里能看到 6 个 Content Type
- 每个 Content Type 的字段和上面定义的一致
