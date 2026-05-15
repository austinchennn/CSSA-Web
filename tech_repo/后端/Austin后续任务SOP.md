# Austin 后续任务 SOP
> 本文档覆盖 Strapi Admin UI 中需要手动完成的三项任务：
> 获取 API Token（T2 剩余）、配置 API 权限（T3）、录入种子数据（T7）。
> **前提：本地环境已启动（Docker + Strapi 在跑）。如果还没启动，先看 `依赖以及后端使用说明.md`。**

---

## 准备工作 — 确认 Strapi 正在运行

打开浏览器，访问：
```
http://localhost:1337/admin
```

- 如果看到**注册/登录页面** → 正常，继续
- 如果浏览器显示「无法访问此页面」→ Strapi 没启动，先去看 `依赖以及后端使用说明.md`

---

## 第一次启动：创建管理员账号

如果你是第一次打开 Strapi Admin，会看到一个注册表单。

填入以下内容（随便填，仅本地开发用）：

| 字段 | 填什么 |
|------|--------|
| First name | Admin |
| Last name | CSSA |
| Email | admin@cssa.com |
| Password | Cssa1234! |
| Confirm password | Cssa1234! |

点击 **「Let's start」** 按钮完成注册。

> ⚠️ 记住这个密码，后续每次进入 Admin 都要用它登录。

---

## Task 2 剩余 — 获取 STRAPI_API_TOKEN

### 这是什么？为什么要做？

NestJS 微服务需要一个 Token 才能调用 Strapi 的 API 写入报名数据。
这个 Token 只有 Strapi 运行后才能生成，必须手动获取。

### 步骤

**第一步：进入 API Tokens 页面**

左侧菜单找到 **Settings**（设置图标，在左侧底部）→ 点击进入。

在 Settings 页面左侧，找到 **「API Tokens」**，点击。

**第二步：创建新 Token**

点击右上角蓝色按钮 **「Create new API Token」**。

填写表单：

| 字段 | 填什么 |
|------|--------|
| Name | microservice-full-access |
| Description | （不填也行） |
| Token duration | Unlimited |
| Token type | **Full access** |

> ⚠️ Token type 必须选 **Full access**，选其他的微服务会报 403。

点击右上角 **「Save」** 按钮。

**第三步：复制 Token**

保存后页面顶部会出现一个绿色提示框，显示生成的 Token（一长串字母数字）。

> ⚠️ **这个 Token 只显示一次，关掉页面就看不到了！** 必须马上复制。

用鼠标选中整个 Token，Ctrl+C 复制。

**第四步：填入 .env 文件**

打开文件 `backend/microservice/.env`，找到这一行：

```
STRAPI_API_TOKEN=待填入：启动 Strapi 后从 Admin → Settings → API Tokens 获取
```

把整行替换成（把 `你复制的token` 换成刚才复制的内容）：

```
STRAPI_API_TOKEN=你复制的token
```

保存文件。

**验证：**

打开终端，在 `backend/microservice/` 目录运行：
```bash
npm run start:dev
# 应该看到：微服务已启动，端口：3002
# 如果看到 401 Unauthorized 错误，说明 Token 填错了
```

---

## Task 3 — 配置 API 权限

### 这是什么？为什么要做？

Strapi 默认所有接口都是私有的（需要登录才能访问）。
但前台用户不需要登录就能查看活动列表、提交报名，所以要把部分接口设为公开。

### 步骤

**第一步：进入权限配置**

左侧菜单点 **Settings** → 左侧找到 **「Users & Permissions plugin」** 这个分组 → 点击 **「Roles」**。

页面会列出两个角色：
- **Authenticated**（已登录用户）
- **Public**（未登录用户，即普通访客）

点击 **「Public」** 进入编辑。

**第二步：配置各个 Content Type 的权限**

页面中间会列出所有 Content Type。对每一个，点击左侧的箭头展开，然后勾选对应的操作。

> 勾选 = 公开可访问（不需要 Token）
> 不勾 = 需要登录才能访问

按下表操作（**严格按表勾，多勾少勾都会出问题**）：

---

**Site-config**（点击展开）

勾选：
- [x] `find`

其他全部**不勾**（update 只有管理员能改）

---

**Department**（点击展开）

勾选：
- [x] `find`
- [x] `findOne`

其他全部**不勾**

---

**Member**（点击展开）

勾选：
- [x] `find`
- [x] `findOne`

其他全部**不勾**

---

**Event**（点击展开）

勾选：
- [x] `find`
- [x] `findOne`

其他全部**不勾**

---

**Past-event**（点击展开）

勾选：
- [x] `find`
- [x] `findOne`

其他全部**不勾**

---

**Registration**（点击展开）⚠️ 这个最重要，最容易出错

勾选：
- [x] `create`（**只勾这一个！**）

其他全部**不勾**（find、findOne、update、delete 都不勾）

> 为什么 Registration 只勾 create？
> 前台用户可以**提交**报名，但不能**查看**别人的报名记录。
> 如果勾了 find，任何人都能看到所有人的报名信息，是严重的隐私问题。

---

**第三步：保存**

全部勾完后，点击页面右上角的 **「Save」** 按钮。

等出现绿色成功提示。

**第四步：验证（用浏览器）**

打开新标签，访问下面两个地址：

✅ **应该返回数据（不是报错）：**
```
http://localhost:1337/api/events
```
正常结果：`{"data":[],"meta":{...}}`（data 可能是空数组，但不是错误）

❌ **应该返回 403（权限不足）：**
```
http://localhost:1337/api/registrations
```
正常结果：`{"data":null,"error":{"status":403,...}}`

如果两个结果都符合预期，权限配置成功。

---

## Task 7 — 录入种子数据

### 这是什么？为什么要做？

前端同学（Emilia、Yeon）需要有真实数据才能调试 UI。
现在数据库是空的，她们什么都看不到，无法开发。

### 顺序很重要

必须按这个顺序创建，因为 Member 依赖 Department，Event 不依赖任何东西：

```
1. 全站配置（1条）
2. 部门（先建，3个）
3. 成员（后建，每个部门至少2个，共6个）
4. 活动（2个）
5. 往期活动（3个）
```

### 如何进入内容管理

左侧菜单最上面有 **「Content Manager」**，点击展开后会看到所有 Content Type。

---

### 7.1 创建全站配置

左侧点 **「Site-config」**（在 Single Types 分组下，不是 Collection Types）。

页面会显示一个空白的表单，直接填入：

| 字段 | 内容 |
|------|------|
| Hero title | 欢迎来到 UTMCSSA |
| Hero subtitle | 多伦多大学密西沙加校区中国学生学者联合会 |
| Contact email | utmcssa@gmail.com |
| Instagram url | https://instagram.com/utmcssa |

点右上角 **「Save」**。

> 注意：Site-config 是 Single Type，只有一条记录，不需要点「Create new entry」。

---

### 7.2 创建部门（3个）

左侧点 **「Department」**（在 Collection Types 分组下）。

点右上角 **「Create new entry」**，依次创建 3 个部门：

**部门 1：**

| 字段 | 内容 |
|------|------|
| Name | 主席团 |
| Leader name | 张三 |
| Introduction | 学生会最高领导机构，负责整体战略规划和对外代表。 |

点 **「Save」** → 点 **「Publish」**（如果有这个按钮的话，点一下确保发布）。

**部门 2：**

| 字段 | 内容 |
|------|------|
| Name | 市场部 |
| Leader name | 李四 |
| Introduction | 负责社交媒体运营、活动宣传和品牌推广。 |

点 **「Save」**。

**部门 3：**

| 字段 | 内容 |
|------|------|
| Name | 学术部 |
| Leader name | 王五 |
| Introduction | 组织学术讲座、升学分享和职业发展活动。 |

点 **「Save」**。

---

### 7.3 创建成员（每个部门 2 个，共 6 个）

左侧点 **「Member」**，点 **「Create new entry」**。

每次创建都要：
1. 填写字段
2. 上传照片（**必填**，随便找一张图片，比如自己头像截图都行）
3. 关联部门

**成员 1（主席团）：**

| 字段 | 内容 |
|------|------|
| Name | 张三 |
| Title | 主席 |
| Photo | 上传任意图片 |
| Order | 10 |
| Department | 选择「主席团」 |

点 **「Save」**。

**成员 2（主席团）：**

| 字段 | 内容 |
|------|------|
| Name | 赵六 |
| Title | 副主席 |
| Photo | 上传任意图片 |
| Order | 9 |
| Department | 选择「主席团」 |

点 **「Save」**。

**成员 3（市场部）：**

| 字段 | 内容 |
|------|------|
| Name | 李四 |
| Title | 市场部部长 |
| Photo | 上传任意图片 |
| Order | 8 |
| Department | 选择「市场部」 |

点 **「Save」**。

**成员 4（市场部）：**

| 字段 | 内容 |
|------|------|
| Name | 孙七 |
| Title | 市场部干事 |
| Photo | 上传任意图片 |
| Order | 7 |
| Department | 选择「市场部」 |

点 **「Save」**。

**成员 5（学术部）：**

| 字段 | 内容 |
|------|------|
| Name | 王五 |
| Title | 学术部部长 |
| Photo | 上传任意图片 |
| Order | 6 |
| Department | 选择「学术部」 |

点 **「Save」**。

**成员 6（学术部）：**

| 字段 | 内容 |
|------|------|
| Name | 周八 |
| Title | 学术部干事 |
| Photo | 上传任意图片 |
| Order | 5 |
| Department | 选择「学术部」 |

点 **「Save」**。

---

### 7.4 创建活动（2个）

左侧点 **「Event」**，点 **「Create new entry」**。

**活动 1（开放报名，active 状态）：**

| 字段 | 内容 |
|------|------|
| Title | 2025 秋季迎新晚会 |
| Start time | 2025-09-15 18:00:00 |
| Capacity | 100 |
| Status | **active**（下拉选择） |
| Form schema | 见下方 |

Form schema 字段填入以下 JSON（直接复制粘贴）：

```json
[
  { "field": "name", "label": "姓名", "type": "text", "required": true },
  { "field": "email", "label": "邮箱", "type": "email", "required": true },
  { "field": "student_id", "label": "学号", "type": "text", "required": true },
  { "field": "grade", "label": "年级", "type": "select", "required": true, "options": ["大一", "大二", "大三", "大四", "研究生"] },
  { "field": "wechat", "label": "微信号", "type": "text", "required": false }
]
```

点 **「Save」**。

---

**活动 2（即将开始，upcoming 状态）：**

| 字段 | 内容 |
|------|------|
| Title | 2025 秋季招新 |
| Start time | 2025-10-01 10:00:00 |
| Capacity | 50 |
| Status | **upcoming**（下拉选择） |
| Form schema | 见下方 |

Form schema 填入：

```json
[
  { "field": "name", "label": "姓名", "type": "text", "required": true },
  { "field": "email", "label": "邮箱", "type": "email", "required": true },
  { "field": "department", "label": "意向部门", "type": "select", "required": true, "options": ["主席团", "市场部", "学术部"] },
  { "field": "reason", "label": "为什么想加入", "type": "textarea", "required": true }
]
```

点 **「Save」**。

---

### 7.5 创建往期活动（3个）

左侧点 **「Past-event」**，点 **「Create new entry」**。

**往期活动 1：**

| 字段 | 内容 |
|------|------|
| Event name | 2025 春季游园活动 |
| Introduction | 本次游园活动在多伦多植物园举行，共 80 名同学参加，大家在游览园区的同时认识了新朋友，留下了美好回忆。 |
| Photo | 上传任意图片 |
| Event date | 2025-04-20 |

点 **「Save」**。

**往期活动 2：**

| 字段 | 内容 |
|------|------|
| Event name | 2024 冬季联谊晚会 |
| Introduction | 年度最重磅活动！来自不同专业的同学欢聚一堂，共同庆祝 2024 年的收获与成长。 |
| Photo | 上传任意图片 |
| Event date | 2024-12-15 |

点 **「Save」**。

**往期活动 3：**

| 字段 | 内容 |
|------|------|
| Event name | 2024 秋季学术分享会 |
| Introduction | 邀请三位学长学姐分享申研经验和求职心得，现场反响热烈，Q&A 环节持续了一个小时。 |
| Photo | 上传任意图片 |
| Event date | 2024-10-08 |

点 **「Save」**。

---

## 完成确认清单

全部做完后，逐项打勾：

- [ ] `http://localhost:1337/api/events` 能返回 2 条活动数据
- [ ] `http://localhost:1337/api/departments` 能返回 3 个部门
- [ ] `http://localhost:1337/api/members` 能返回 6 个成员
- [ ] `http://localhost:1337/api/past-events` 能返回 3 条往期活动
- [ ] `http://localhost:1337/api/registrations` 返回 403（权限拦截正常）
- [ ] `backend/microservice/.env` 里的 `STRAPI_API_TOKEN` 已经填好真实 Token

---

> 遇到问题：截图发给 Mike，别自己扛超过 15 分钟
