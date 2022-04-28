import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { TaskService } from './task.service';

@Module({
  imports: [UserModule],
  providers: [TaskService],
})
export class TaskModule {}
