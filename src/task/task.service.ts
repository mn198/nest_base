import { Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
// import { Cron, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  constructor(private userService: UserService) {}

  private logger = new Logger(TaskService.name);

  // @Cron('45 * * * * *')
  // handleCron() {
  //   this.logger.debug('Called when the second is 45');
  // }
}
