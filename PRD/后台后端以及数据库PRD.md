### 三、 后台后端 (Admin Backend)

数据与内容管理中心，负责接口生成、复杂业务拦截以及高并发/耗时任务处理。

- **核心** **CMS** **引擎**：Strapi (Node.js)。提供数据建模功能，并**自动生成 RESTful 与 GraphQL** **API** **接口**供前端调用。
    
- **逻辑微服务**：NestJS / Fastify (采用 TypeScript 保证扩展逻辑的类型安全)。
    
    - 承载复杂后置业务：由于 CMS 自带 API 较为底层，微服务层需负责如表单提交防刷（Rate Limit）、鉴权拦截等。
        
- **异步任务队列**：BullMQ + Redis。
    
    - 削峰填谷：在招新高峰期处理大量 Registrations 表单入库操作；
        
    - 处理耗时任务：如大批量的报名数据导出，或者自动化触发的邮件发送通知任务。
        
- **数据统计引擎**：基于收集入库的 `Registrations` (报名记录表)，后台可通过执行 SQL COUNT 及相关聚合函数，为管理层生成数据看板 (Dashboard)。
    

---

### 四、 数据库设计 (Database Schema)

底层采用 **PostgreSQL**，存储全站结构化数据及动态表单的 JSON Schema。实体模型结构需与 Strapi 完全对应。

#### 5.1 全站配置表 (Site_Configs) - Single Type

负责管理前端静态内容大纲。

- `key` (String): **Unique, Required**。配置键值（例如 `home_hero_title`）。
    
- `value` (JSON / Text): **Required**。存储具体的文案内容或 JSON 结构数据。
    
- `description` (String): Optional。供后台编辑人员查看的字段说明。
    

#### 5.2 部门表 (Departments) - Collection Type

- `id` (UUID/Int): **Primary Key**。
    
- `name` (String): **Required, Unique**。部门名称。
    
- `leader_name` (String): **Required**。现任负责人姓名。
    
- `introduction` (Text): Optional。部门职能描述。
    

#### 5.3 社员表 (Members) - Collection Type

- `id` (UUID/Int): **Primary Key**。
    
- `name` (String): **Required**。姓名。
    
- `title` (String): **Required**。职位 Title。
    
- `photo_url` (Media): **Required (Image)**。成员展示图片。
    
- `dept_id` (Relation): **Required**。外键，关联 Departments 表。
    
- `order` (Integer): Default: `0`。排序权重（前端列表渲染时倒序排列显示）。
    

#### 5.4 当前/报名活动表 (Events) - Collection Type

作为前端动态渲染表单的核心引擎。

- `id` (UUID/Int): **Primary Key**。
    
- `title` (String): **Required**。活动标题。
    
- `start_time` (DateTime): **Required**。举办时间。
    
- `capacity` (Integer): Optional。报名人数容量上限。
    
- `form_schema` (JSON): **Required**。动态表单渲染结构（定义该活动需要收集哪些信息）。
    
- `status` (Enum): Default: `upcoming`。状态控制，枚举值限制为 `upcoming`, `active`, `closed`。
    

#### 5.5 往期活动回顾表 (Past_Events) - Collection Type

- `id` (UUID/Int): **Primary Key**。
    
- `event_name` (String): **Required**。往期活动名称。
    
- `introduction` (Rich Text): **Required**。活动介绍与总结富文本。
    
- `photo` (Media): **Required (Image)**。精选活动封面，**强制约束为单图**。
    
- `event_date` (Date): **Required**。举办日期（为前端 Timeline 组件提供倒序渲染的时间依据）。
    

#### 5.6 活动报名记录表 (Registrations) - Collection Type

- `id` (UUID/Int): **Primary Key**。报名流水号。
    
- `event_id` (Relation): **Required**。外键，关联 Events 表，说明是哪个活动的报名。
    
- `user_info` (JSON): **Required**。动态表单提交的数据载体（根据 form_schema 填写的具体答案）。
    
- `status` (Enum): Default: `pending`。处理状态，枚举值为 `pending`, `confirmed`, `cancelled`。