import { Module } from '@nestjs/common';
import { SubmissionResolver } from './submission.resolver';

@Module({
  providers: [SubmissionResolver],
})
export class SubmissionModule {}
