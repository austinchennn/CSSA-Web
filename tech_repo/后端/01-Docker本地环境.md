# Commit 01 — Docker 本地开发环境

**对应文件：** `backend/docker-compose.yml`  
**Commit message：** `feat(backend): 添加本地开发 Docker Compose 配置`

---

## 做了什么

用 Docker Compose 把 PostgreSQL 和 Redis 打包成一个可以一键启动的本地开发环境，所有开发成员使用同一个数据库配置，不会出现「在我电脑上能跑」的问题。

---

## 为什么这样设计

| 决策 | 原因 |
|------|------|
| 用 Docker 而不是本地安装 | 保证所有人数据库版本一致，不污染本机环境 |
| `postgres:15-alpine` | Alpine 版体积小（约 80MB vs 标准版 400MB），功能完整 |
| `redis:7-alpine` | BullMQ 任务队列依赖 Redis；同样用 Alpine 减少体积 |
| volume 持久化 | 容器重启不丢数据（`postgres_data` / `redis_data`） |
| healthcheck | 防止 Strapi 启动时数据库还没准备好就连接失败 |

---

## 文件结构说明

```yaml
services:
  postgres:
    image: postgres:15-alpine
    container_name: cssa_postgres
    environment:
      POSTGRES_DB: cssa_web_dev      # 开发库名
      POSTGRES_USER: postgres        # 用户名
      POSTGRES_PASSWORD: postgres    # 本地开发密码
    ports:
      - '5432:5432'                  # 宿主机:容器
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U postgres']

  redis:
    image: redis:7-alpine
    ports:
      - '6379:6379'
    volumes:
      - redis_data:/data
```

---

## 如何使用

```bash
# 进入后端目录
cd backend

# 后台启动（-d = detached，不占用终端）
docker-compose up -d

# 查看是否正常运行（STATUS 应该显示 healthy）
docker-compose ps

# 停止（数据保留）
docker-compose down

# 停止并清除所有数据（重置数据库）
docker-compose down -v
```

---

## 验证成功的标志

```bash
docker-compose ps
# 输出应该是：
# NAME             STATUS
# cssa_postgres    Up (healthy)
# cssa_redis       Up (healthy)
```

---

## 常见问题

**Q：5432 端口被占用？**  
说明本机已经安装了 PostgreSQL。先停止本地 PostgreSQL：
```bash
# macOS
brew services stop postgresql
# Windows
net stop postgresql
```

**Q：`docker: command not found`？**  
需要先安装 Docker Desktop：[docker.com/products/docker-desktop](https://docker.com/products/docker-desktop)
