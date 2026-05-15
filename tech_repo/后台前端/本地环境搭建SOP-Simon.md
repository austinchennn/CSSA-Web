# 本地环境搭建 SOP — Simon

本文档手把手教你在本地把 CSSA-Web 前后端全部跑通。

---

## 第一步：安装前置工具

需要装两个东西。装之前先检查自己有没有：

```bash
node --version   # 需要 18.x ~ 22.x
docker --version # 有版本号就行
```

### 1.1 安装 Node.js

打开 https://nodejs.org，下载 **LTS 版本**（目前是 22.x），一路 Next 安装。

安装完再跑一次 `node --version`，看到版本号就成功了。

### 1.2 安装 Docker Desktop

打开 https://www.docker.com/products/docker-desktop，下载 Mac 版（注意选 Apple Silicon 还是 Intel，看你的 Mac 型号）。

安装完打开 Docker Desktop 应用，等到顶部状态栏小鲸鱼图标变绿（Running）才算启动成功。

---

## 第二步：克隆代码仓库

打开终端，`cd` 到你想放项目的目录，然后：

```bash
git clone https://github.com/austinchennn/CSSA-Web.git
cd CSSA-Web
```

---

## 第三步：配置环境变量

项目有两个 `.env` 文件需要手动创建，因为里面有密钥所以没有提交到 git。

### 3.1 Strapi 后端的 `.env`

```bash
cd backend/strapi
```

在这个目录下新建一个名为 `.env` 的文件，内容如下（直接复制粘贴）：

```
HOST=0.0.0.0
PORT=1337
APP_KEYS=GTo+rh5DLw3k1198hvIKf9/YLARG7E0uK7CYn/E8MjQ=,b4VOTkzD4LQIUSVX+pdDZ0XEoonf2KYHckMpwfdt3PI=
API_TOKEN_SALT=N6kvL9ru0ljaLN1UF1PJ2M7affLqBLapCWTB1RagzYw=
ADMIN_JWT_SECRET=qD8r7bD51N5IP9N5LAx8D96dWNmALSMMdSu0MsMHgJM=
TRANSFER_TOKEN_SALT=local-dev-only
JWT_SECRET=local-dev-only-jwt

DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=cssa_web_dev
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_SSL=false
```

保存文件。

### 3.2 客户端前端的 `.env.local`

```bash
cd ../../client
```

在这个目录下新建一个名为 `.env.local` 的文件，内容如下：

```
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:1337/graphql
```

保存文件。

---

## 第四步：启动数据库和 Redis

数据库跑在 Docker 里，不用本地安装 PostgreSQL。

```bash
cd ../backend
docker-compose up -d
```

第一次运行会自动拉取镜像，耐心等一下（大约 1~2 分钟）。

完成后验证容器是否正常：

```bash
docker ps
```

应该能看到两个容器在跑：

```
cssa_postgres   Up ...
cssa_redis      Up ...
```

两个都是 `Up` 状态就成功了。

---

## 第五步：启动 Strapi 后端

**新开一个终端窗口**（不要关掉上一个），然后：

```bash
cd CSSA-Web/backend/strapi
npm install
npm run develop
```

`npm install` 第一次会比较慢，耐心等。

等到终端出现类似这样的输出就说明启动成功了：

```
Project information
...
One more thing...
Create your first administrator 💻 by going to the administration panel at:
http://localhost:1337/admin
```

---

## 第六步：创建 Strapi 管理员账号（只需做一次）

打开浏览器，访问 **http://localhost:1337/admin**

第一次会提示你注册管理员账号，随便填一个邮箱和密码（这是本地开发账号，不影响生产环境）。

注册完成后你就能进入 Strapi 后台管理界面了。后台里有所有数据表（活动、成员、部门等），可以在里面增删查改内容。

---

## 第七步：启动客户端前端

**再开一个新终端窗口**，然后：

```bash
cd CSSA-Web/client
npm install
npm run dev
```

等到出现：

```
▲ Next.js
- Local: http://localhost:3000
```

打开浏览器访问 **http://localhost:3000**，官网就出现了。

---

## 验证全部跑通

| 服务 | 地址 | 预期效果 |
|------|------|----------|
| 客户端官网 | http://localhost:3000 | 看到 CSSA 官网页面 |
| Strapi 后台 | http://localhost:1337/admin | 看到后台管理界面 |
| GraphQL API | http://localhost:1337/graphql | 看到 GraphQL Playground |

三个地址都能访问就全部跑通了。

---

## 日常开发启动流程

每次开发前按顺序跑这三步（后两步各自开一个终端窗口）：

```bash
# 终端 1：启动数据库（如果 docker 没在跑）
cd CSSA-Web/backend
docker-compose up -d

# 终端 2：启动 Strapi
cd CSSA-Web/backend/strapi
npm run develop

# 终端 3：启动客户端前端
cd CSSA-Web/client
npm run dev
```

关闭时：
- 终端 2、3 直接 `Ctrl + C`
- 数据库不用每次关，让它在后台跑就行。要关的话：`docker-compose down`

---

## 常见问题

### 问：`npm install` 报错

检查 Node.js 版本是否在 18~22 之间：

```bash
node --version
```

如果版本不对，重新装 Node.js。

### 问：Strapi 启动时报数据库连接失败

确认 Docker 容器在跑：

```bash
docker ps
```

没看到 `cssa_postgres`，重新执行：

```bash
cd backend
docker-compose up -d
```

### 问：`docker-compose up` 报端口占用（5432 already in use）

说明你本地装了 PostgreSQL 并且在跑。关掉本地 PostgreSQL 服务，或者修改 `docker-compose.yml` 里的端口映射（联系 Austin）。

### 问：http://localhost:3000 页面空白或数据加不出来

先确认 Strapi 在跑（终端 2 没报错）。然后检查 Strapi 后台里有没有数据，可以手动在后台添加几条活动或成员信息来测试。
