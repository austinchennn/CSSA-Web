# Commit 04 — NestJS 微服务入口与根模块

**对应文件：**
- `backend/microservice/src/main.ts`
- `backend/microservice/src/app.module.ts`

**Commit message：** `feat(microservice): 实现 NestJS 入口和根模块`

---

## 做了什么

实现 NestJS 微服务的启动入口（`main.ts`）和根模块（`app.module.ts`），  
微服务跑在 **3002 端口**，提供给前台调用的报名接口（POST /api/v1/registrations）。

---

## 为什么需要 NestJS 微服务？

Strapi 提供基础的 CRUD API，但有一个问题：  
**POST /api/registrations 是公开接口，任何人可以无限提交报名。**

NestJS 微服务的作用是在请求到达 Strapi 之前加一层拦截：
- Rate Limit 防刷（同 IP 每分钟最多 5 次）
- 请求格式校验（DTO）
- 异步任务触发（邮件通知进队列）

---

## main.ts 详解

```
端口分配：
  3000 → 客户端前台（Next.js，Emilia 负责）
  3001 → 后台前端（Next.js，Yeon 负责）
  1337 → Strapi CMS
  3002 → NestJS 微服务（Austin 负责）
```

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // 全局路由前缀：所有接口都以 /api/v1 开头
  // 例：POST /api/v1/registrations
  app.setGlobalPrefix('api/v1')

  // 全局 DTO 校验：自动拦截格式错误的请求体（返回 400）
  // whitelist: true → 剥离 DTO 中未声明的多余字段（防注入）
  // transform: true → 自动类型转换（如字符串数字转 number）
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  // CORS：和 Strapi 一样，必须显式允许来源
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001', ...],
  })

  await app.listen(3002)
}
```

---

## app.module.ts 详解

根模块 = 整个应用的目录，把所有子模块拼装在一起：

```typescript
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),  // 全局环境变量
    RegistrationModule,   // 报名模块（Controller + Service）
    QueueModule,          // BullMQ 队列（邮件 + 导出）
  ],
})
export class AppModule {}
```

**`isGlobal: true` 是什么意思：**  
ConfigModule 加了这个选项后，任何子模块都可以直接注入 `ConfigService` 来读取环境变量，  
不需要每个模块都 `import: [ConfigModule]`。

---

## NestJS 模块系统（新手必读）

NestJS 用「模块」来组织代码，和 Next.js 的「页面」概念类似：

```
AppModule（根）
  ├── ConfigModule（全局，读环境变量）
  └── RegistrationModule
        ├── RegistrationController（处理 HTTP 请求）
        └── RegistrationService（业务逻辑）
```

每个模块都是一个 `@Module()` 装饰的类，  
`imports` 是依赖的其他模块，  
`controllers` 是路由处理器，  
`providers` 是服务（可被注入）。

---

## 验证成功的标志

```bash
cd backend/microservice
npm install
npm run start:dev

# 终端应该显示：
# 微服务启动成功，端口：3002

# 测试接口存活：
curl http://localhost:3002/api/v1/registrations \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"eventId":"1","userInfo":{"name":"测试"}}'
```
