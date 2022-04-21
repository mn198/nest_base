import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { TasksService } from './tasks.service';

@Module({
  imports: [UserModule],
  providers: [TasksService],
})
export class TasksModule {}
