import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { GithubModule } from '../github/github.module';
import { OctokitModule } from '../octokit/octokit.module';
import { GITHUB_QUEUE } from '../queue';
import { GithubOwnerCommand } from './github-owner.command';
import { GithubOwnerProcessor } from './github-owner.processor';
import { GithubOwnerScheduler } from './github-owner.scheduler';
import { GithubOwnerService } from './github-owner.service';

@Module({
  imports: [
    BullModule.registerQueue({ name: GITHUB_QUEUE }),
    OctokitModule,
    GithubModule,
  ],
  providers: [
    GithubOwnerProcessor,
    GithubOwnerScheduler,
    GithubOwnerService,
    GithubOwnerCommand,
  ],
  exports: [],
})
export class GithubOwnerModule {}
