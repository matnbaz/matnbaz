import { Module } from '@nestjs/common';
import { ReportResolver } from './report.resolver';

@Module({
  providers: [ReportResolver],
})
export class ReportModule {}
