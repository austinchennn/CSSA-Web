// 此模块已删除。BullMQ 队列（邮件发送 / 异步导出）在 Phase 1 不需要：
// - CSV 导出由同步接口 GET /registrations/export 直接返回，报名量级不需要队列
// - 邮件发送不在本阶段功能范围内
// Redis 仍由 RateLimitGuard 通过 ioredis 直连使用
export {}
