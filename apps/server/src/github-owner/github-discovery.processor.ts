import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { GITHUB_PROCESSES, GITHUB_QUEUE } from '../queue';
import { GithubDiscoverByLocationService } from './discover-by-location.service';
import { GithubDiscoverByOrgLocationService } from './discover-by-org-location.service';
import { GithubDiscoverByOrgPresenceService } from './discover-by-org-presence.service';
import { GithubDiscoverByRepoSearchService } from './discover-by-repo-search.service';
import { GithubOwnerService } from './github-owner.service';

@Processor(GITHUB_QUEUE)
export class GithubDiscoveryProcessor {
  constructor(
    private readonly discoverByLocation: GithubDiscoverByLocationService,
    private readonly discoverByOrgLocation: GithubDiscoverByOrgLocationService,
    private readonly discoverByOrgPresence: GithubDiscoverByOrgPresenceService,
    private readonly discoverByRepoSearch: GithubDiscoverByRepoSearchService,
    private readonly ownerService: GithubOwnerService
  ) {}
  private logger = new Logger(GithubDiscoveryProcessor.name);

  // Runes all the discover methods
  @Process(GITHUB_PROCESSES.DISCOVER)
  async discoverProcess() {
    await this.discoverByRepoSearchProcess();
    await this.discoverByLocationProcess();
    await this.discoverByOrgLocationProcess();
    await this.discoverByOrgPresenceProcess();
  }

  @Process(GITHUB_PROCESSES.DISCOVER_BY_REPO_SEARCH)
  async discoverByRepoSearchProcess() {
    this.logger.log('Starting "discover by repo search" process...');
    await this.discoverByRepoSearch.discoverByPredefinedTerms();
  }

  @Process(GITHUB_PROCESSES.DISCOVER_BY_LOCATION)
  async discoverByLocationProcess() {
    this.logger.log('Starting "discover by location" process...');
    await this.discoverByLocation.getIranianOwnersVoraciously();
  }

  @Process(GITHUB_PROCESSES.DISCOVER_BY_ORG_LOCATION)
  async discoverByOrgLocationProcess() {
    this.logger.log('Starting "discover by org location" process...');
    await this.discoverByOrgLocation.discover();
  }

  @Process(GITHUB_PROCESSES.DISCOVER_BY_ORG_PRESENCE)
  async discoverByOrgPresenceProcess() {
    this.logger.log('Starting "discover by org presence" process...');
    await this.discoverByOrgPresence.discover();
  }

  @Process(GITHUB_PROCESSES.EXTRACT_OWNERS)
  async extractOwnersProcess() {
    this.logger.log('Starting the extraction of owners (statistics)...');

    await this.ownerService.updateAllOwnersStatistics();
  }
}
