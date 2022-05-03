import { Injectable, Logger } from '@nestjs/common';
// import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TaskService {
  constructor(private userService: UserService) {}

  private logger = new Logger(TaskService.name);

  // @Cron('45 * * * * *')
  // handleCron() {
  //   this.logger.debug('Called when the second is 45');
  // }
}
