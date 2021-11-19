import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { GITHUB_QUEUE } from './constants';
import { OperatorGhController } from './operator-gh.controller';
import { OperatorGhScheduler } from './operator-gh.scheduler';

@Module({
  imports: [BullModule.registerQueue({ name: GITHUB_QUEUE })],
  providers: [OperatorGhScheduler],
  controllers: [OperatorGhController],
})
export class OperatorGhModule {}
