import { Module } from '@nestjs/common';
import { OperatorGhController } from './operator-gh.controller';
import { OperatorGhScheduler } from './operator-gh.scheduler';
import { OperatorGhService } from './operator-gh.service';

@Module({
  providers: [OperatorGhService, OperatorGhScheduler],
  controllers: [OperatorGhController],
})
export class OperatorGhModule {}
