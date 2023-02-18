import { Module } from '@nestjs/common';
import { GithubDiscovererModule } from '../github-discoverer/github-discoverer.module';
import { SubmissionResolver } from './submission.resolver';

@Module({
  imports: [GithubDiscovererModule],
  providers: [SubmissionResolver],
})
export class SubmissionModule {}
