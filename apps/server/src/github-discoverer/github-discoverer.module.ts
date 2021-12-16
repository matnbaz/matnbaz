import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { OctokitModule } from '../octokit/octokit.module';
import { GITHUB_DISCOVERER_QUEUE } from './constants';
import { GithubDiscovererController } from './github-discoverer.controller';
import { GithubDiscovererProcessor } from './github-discoverer.processor';
import { GithubDiscovererScheduler } from './github-discoverer.scheduler';
import { GithubDiscovererService } from './github-discoverer.service';

@Module({
  imports: [
    BullModule.registerQueue({ name: GITHUB_DISCOVERER_QUEUE }),
    OctokitModule,
  ],
  providers: [
    GithubDiscovererProcessor,
    GithubDiscovererScheduler,
    GithubDiscovererService,
  ],
  controllers: [GithubDiscovererController],
  exports: [GithubDiscovererScheduler],
})
export class GithubDiscovererModule {}
