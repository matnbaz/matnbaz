import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { OctokitModule } from '../octokit/octokit.module';
import { GITHUB_QUEUE } from '../queue';
import { GithubDiscoverByLocationService } from './discover-by-location.service';
import { GithubDiscoverByOrgLocationService } from './discover-by-org-location.service';
import { GithubDiscoverByOrgPresenceService } from './discover-by-org-presence.service';
import { GithubDiscoverByRepoSearchService } from './discover-by-repo-search.service';
import { GithubDiscoveryProcessor } from './github-discovery.processor';
import { GithubOwnerCommand } from './github-owner.command';
import { GithubOwnerScheduler } from './github-owner.scheduler';
import { GithubOwnerService } from './github-owner.service';

@Module({
  imports: [BullModule.registerQueue({ name: GITHUB_QUEUE }), OctokitModule],
  providers: [
    GithubDiscoveryProcessor,
    GithubOwnerScheduler,
    GithubOwnerService,
    GithubOwnerCommand,

    // Discoverers:
    GithubDiscoverByRepoSearchService,
    GithubDiscoverByLocationService,
    GithubDiscoverByOrgLocationService,
    GithubDiscoverByOrgPresenceService,
  ],
  exports: [],
})
export class GithubOwnerModule {}
