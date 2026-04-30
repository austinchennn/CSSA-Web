// 报名模块：将 Controller、Service、Guard 组装在一起
import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { RegistrationController } from './registration.controller'
import { RegistrationService } from './registration.service'

@Module({
  imports: [
    // 注入 email 队列，供 RegistrationService 使用
    BullModule.registerQueue({ name: 'email' }),
  ],
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class RegistrationModule {}
