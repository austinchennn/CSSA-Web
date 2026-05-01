/**
 * ============================================================
 * FILE: backend/microservice/src/common/guards/rate-limit.guard.ts
 * ============================================================
 *
 * 【作用】
 * 报名接口的速率限制守卫（Rate Limiter）。防止同一 IP 在短时间内
 * 大量刷单提交报名，保护系统在招新高峰期的稳定性。
 *
 * 【依赖关系】
 * Used by:
 *   - src/registration/registration.controller.ts : @UseGuards(RateLimitGuard)
 *
 * 【关键常量】
 * - RATE_LIMIT = 5      — 每分钟最多提交 5 次
 * - WINDOW_SECONDS = 60 — 时间窗口 60 秒
 *
 * 【注意】
 * - IP 需从 X-Forwarded-For 获取，因为生产环境在 Nginx 反向代理后面
 * - 生产环境可考虑 IP + 设备指纹组合，防止 IP 共享场景误限
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
  private readonly redis: Redis

  constructor(private config: ConfigService) {
    // 独立 Redis 连接，复用 BullMQ 的 Redis 配置
    this.redis = new Redis({
      host: config.get('REDIS_HOST', 'localhost'),
      port: config.get<number>('REDIS_PORT', 6379),
    })
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    // 优先从 X-Forwarded-For 获取真实 IP（生产环境经过 Nginx 代理）
    const ip: string =
      (request.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ??
      request.ip ??
      'unknown'

    // Redis key 格式：rate_limit:registration:127.0.0.1
    const key = `rate_limit:registration:${ip}`

    // INCR 是原子操作：先加 1 再返回新值，避免并发竞争
    const count = await this.redis.incr(key)

    // 首次请求时设置过期时间（60 秒后自动清零）
    if (count === 1) {
      await this.redis.expire(key, WINDOW_SECONDS)
    }

    if (count > RATE_LIMIT) {
      throw new HttpException(
        { message: `提交过于频繁，请 ${WINDOW_SECONDS} 秒后再试`, statusCode: 429 },
        HttpStatus.TOO_MANY_REQUESTS,
      )
    }

    return true
  }
}
