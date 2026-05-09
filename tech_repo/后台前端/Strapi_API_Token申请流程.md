# Strapi API Token 申请与配置流程

---

## 先搞清楚两个"后台"的区别

| | Strapi Admin | admin-frontend（你在做的）|
|---|---|---|
| 地址 | `localhost:1337/admin` | `localhost:3001` |
| 是什么 | Strapi 自带的内容管理界面 | 你在开发的自定义管理后台 |
| 谁管 | Austin | Simon |
| 用来干嘛 | 管数据库内容、生成 API Token | 给 CSSA 管理员日常用 |

**你的代码通过 API Token 调用 Strapi，Token 由 Austin 在 Strapi Admin 里生成给你。**

---

## Simon 需要做的（申请 Token）

直接发消息给 Austin，说：

> "我需要一个 Strapi Full Access API Token 用来开发 admin-frontend，帮我生成一下"

拿到 Token 之后，在 `admin-frontend/` 目录下新建 `.env.local` 文件（没有就自己建）：

```env
NEXT_PUBLIC_API_URL=http://localhost:1337
NEXT_PUBLIC_MICROSERVICE_URL=http://localhost:3002
STRAPI_API_TOKEN=这里填你拿到的token
```

> ⚠️ `.env.local` 不会被 git 追踪，每个人本地都要自己建，**不要提交到 git**。  
> ⚠️ Token 不要加 `NEXT_PUBLIC_` 前缀，否则会暴露在浏览器端。

---

## Austin 需要做的（生成 Token）

1. 启动 Strapi：`cd backend && npm run develop`
2. 打开 `http://localhost:1337/admin`，用管理员账号登录
3. 左侧菜单 → **Settings** → **API Tokens** → 右上角 **Create new API Token**
4. 填写：
   - **Name**：`simon-dev`（方便识别是谁的）
   - **Token type**：`Full Access`
   - **Token duration**：`Unlimited`（开发期间不用担心过期）
5. 点 **Save**，把生成的 Token 复制发给 Simon

> Token 只显示一次，保存之后就看不到原文了，直接复制给 Simon，不要关页面。

---

## 验证是否配置成功

Simon 配置好 `.env.local` 后，可以在终端跑这个命令验证 Token 是否有效：

```bash
curl -H "Authorization: Bearer 你的token" http://localhost:1337/api/members
```

返回 JSON 数据说明配置正确，返回 `403 Forbidden` 说明 Token 权限不对，返回 `401 Unauthorized` 说明 Token 填错了。

---

## 常见问题

**Q：Token 泄露了怎么办？**  
A：Austin 去 Strapi Admin → Settings → API Tokens，找到对应 Token 点删除，重新生成一个发给 Simon。

**Q：我本地没有 Strapi 数据库怎么办？**  
A：找 Austin 要一份数据库种子数据，或者 Austin 部署一个测试环境给你连。
