import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { GithubModule } from '../github/github.module';
import { OctokitModule } from '../octokit/octokit.module';
import { GITHUB_QUEUE } from '../queue';
import { GithubDiscovererController } from './github-discoverer.controller';
import { GithubDiscovererProcessor } from './github-discoverer.processor';
import { GithubDiscovererScheduler } from './github-discoverer.scheduler';
import { GithubDiscovererService } from './github-discoverer.service';

@Module({
  imports: [
    BullModule.registerQueue({ name: GITHUB_QUEUE }),
    OctokitModule,
    GithubModule,
  ],
  providers: [
    GithubDiscovererProcessor,
    GithubDiscovererScheduler,
    GithubDiscovererService,
  ],
  controllers: [GithubDiscovererController],
  exports: [],
})
export class GithubDiscovererModule {}
