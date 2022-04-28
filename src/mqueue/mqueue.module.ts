import { Module } from '@nestjs/common';
import { MqueueProcessor } from './mqueue.processor';

@Module({
  imports: [
    // BullModule.registerQueue({ name: 'mqueue' })
  ],
  providers: [MqueueProcessor],
})
export class MqueueModule {}
