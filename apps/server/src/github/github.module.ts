import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { OctokitModule } from '../octokit/octokit.module';
import { GITHUB_QUEUE } from '../queue';
import { GithubProcessor } from './github.processor';
import { GithubService } from './github.service';

@Module({
  imports: [BullModule.registerQueue({ name: GITHUB_QUEUE }), OctokitModule],
  providers: [GithubService, GithubProcessor],
  exports: [GithubService],
})
export class GithubModule {}
