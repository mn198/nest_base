import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TasksService {
  constructor(private readonly userService: UserService) {}

  private readonly logger = new Logger(TasksService.name);

  // @Cron('45 * * * * *')
  // handleCron() {
  //   this.logger.debug('Called when the second is 45');
  // }

  // @Interval(10000)
  // handleInterval() {
  //   this.logger.debug('Called every 10 seconds');
  // }

  // @Timeout(1000)
  // handleInterval() {
  //   this.crawlerService.crawlWholePageWithCache();
  // }

  // @Timeout(1000)
  // async handleInterval() {
  //   const totalAccount = await this.userService.count();
  //   if (totalAccount == 0) {
  //     const account = {
  //       displayName: 'Admin',
  //       username: 'admin123',
  //       password: 'admin123',
  //     };
  //     return this.userService.create(account);
  //   }
  // }
}
