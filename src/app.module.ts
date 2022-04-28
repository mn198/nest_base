import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import configuration from './configuration';
import { CoreModule } from './core/core.module';
import { GatewaysModule } from './gateway/gateway.module';
import { UserModule } from './user/user.module';
import { McacheModule } from './mcache/mcache.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get(
          'MONGO_ROOT_USER',
        )}:${configService.get('MONGO_ROOT_PASSWORD')}@${configService.get(
          'MONGO_URI',
        )}:${configService.get('MONGO_PORT')}?authSource=admin`,
        dbName: configService.get('MONGO_DATABASE'),
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    CoreModule,
    AuthModule,
    UserModule,
    GatewaysModule,
    McacheModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
