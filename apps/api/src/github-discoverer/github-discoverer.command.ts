import { Command, CommandRunner, Option } from 'nest-commander';
import { GithubDiscovererScheduler } from './github-discoverer.scheduler';
import { GithubDiscoveryProcessor } from './github-discovery.processor';

@Command({ name: 'discover' })
export class GithubDiscoverCommand implements CommandRunner {
  constructor(
    private readonly githubOwnerProcessor: GithubDiscoveryProcessor,
    private readonly githubOwnerScheduler: GithubDiscovererScheduler
  ) {}

  async run(
    passedParams: string[],
    options?: Record<string, any>
  ): Promise<void> {
    options.schedule
      ? await this.githubOwnerScheduler.discover()
      : await this.githubOwnerProcessor.discoverProcess();
  }

  @Option({
    flags: '-s, --schedule',
    description: 'Schedules the job instead of running it immediately',
  })
  parseSchedule(val: string) {
    return true;
  }
}
