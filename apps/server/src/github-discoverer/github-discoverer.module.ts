import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { OctokitModule } from '../octokit/octokit.module';
import { GITHUB_QUEUE } from '../queue';
import { GithubDiscoverByOrgPresenceService } from './discover-by-org-presence.service';
import { GithubDiscoverByOwnerSearchService } from './discover-by-owner-search.service';
import { GithubDiscoverByRepoSearchService } from './discover-by-repo-search.service';
import { GithubDiscoverCommand } from './github-discoverer.command';
import { GithubDiscovererScheduler } from './github-discoverer.scheduler';
import { GithubDiscovererService } from './github-discoverer.service';
import { GithubDiscoveryProcessor } from './github-discovery.processor';

@Module({
  imports: [BullModule.registerQueue({ name: GITHUB_QUEUE }), OctokitModule],
  providers: [
    GithubDiscoveryProcessor,
    GithubDiscovererScheduler,
    GithubDiscovererService,
    GithubDiscoverCommand,

    // Discoverers:
    GithubDiscoverByRepoSearchService,
    GithubDiscoverByOwnerSearchService,
    GithubDiscoverByOrgPresenceService,
  ],
  exports: [],
})
export class GithubDiscovererModule {}
