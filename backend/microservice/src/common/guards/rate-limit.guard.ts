/**
 * ============================================================
 * FILE: backend/microservice/src/common/guards/rate-limit.guard.ts
 * ============================================================
 *
 * 【作用】
 * 报名接口的速率限制守卫（Rate Limiter）。防止同一 IP 在短时间内
 * 大量刷单提交报名，保护系统在招新高峰期的稳定性。
 * PRD 明确要求此功能，是微服务存在的核心价值之一。
 *
 * 【依赖关系】
 * Imports from:
 *   - @nestjs/common : CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus
 *   - redis / ioredis : RedisClient（通过 BullMQ 的 Redis 连接复用）
 *
 * Used by:
 *   - src/registration/registration.controller.ts : @UseGuards(RateLimitGuard)
 *
 * 【守卫实现】
 * @Injectable()
 * export class RateLimitGuard implements CanActivate
 *
 * async canActivate(context: ExecutionContext): Promise<boolean>
 *   - 从 HTTP 请求获取客户端 IP：request.ip 或 X-Forwarded-For 头
 *   - 构建 Redis key：`rate_limit:registration:{ip}`
 *   - 使用 Redis INCR 命令递增计数：
 *       const count = await redis.incr(key)
 *   - 若 count === 1（首次请求）：设置 TTL = 60 秒（EXPIRE key 60）
 *   - 若 count > LIMIT（默认 5 次/分钟）：
 *       throw new HttpException('提交过于频繁，请稍后再试', HttpStatus.TOO_MANY_REQUESTS)
 *   - 通过：return true
 *
 * 【关键常量】
 * - RATE_LIMIT: number = 5     — 每分钟最多提交 5 次
 * - WINDOW_SECONDS: number = 60 — 时间窗口 60 秒
 *
 * 【注意】
 * - IP 获取需考虑反向代理（Nginx/Vercel）传递的 X-Forwarded-For 头
 * - 生产环境应考虑 IP + 用户标识的组合作为限流 key，防止 IP 共享场景误限
 */

import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Redis from 'ioredis'

// 每个 IP 在 WINDOW_SECONDS 内最多提交 RATE_LIMIT 次
const RATE_LIMIT = 5
const WINDOW_SECONDS = 60

@Injectable()
export class RateLimitGuard implements CanActivate {
  private redis: Redis

  constructor(private config: ConfigService) {
    // 独立 Redis 连接，复用 BullMQ 的 Redis 配置
    this.redis = new Redis({
      host: config.get('REDIS_HOST', 'localhost'),
      port: config.get<number>('REDIS_PORT', 6379),
    })
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    // 优先从 X-Forwarded-For 获取真实 IP（反向代理场景），其次用 request.ip
    const ip =
      (request.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      request.ip

    const key = `rate_limit:registration:${ip}`

    // INCR 原子递增，首次写入时 count=1
    const count = await this.redis.incr(key)

    // 首次请求时设置过期时间，确保时间窗口到期后自动重置
    if (count === 1) {
      await this.redis.expire(key, WINDOW_SECONDS)
    }

    if (count > RATE_LIMIT) {
      throw new HttpException(
        `提交过于频繁，请 ${WINDOW_SECONDS} 秒后再试`,
        HttpStatus.TOO_MANY_REQUESTS
      )
    }

    return true
  }
}
