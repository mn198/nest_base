import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

import { MessageGateway } from './message.gateway';

@Module({
  imports: [UserModule, AuthModule],
  providers: [MessageGateway],
})
export class GatewaysModule {}
