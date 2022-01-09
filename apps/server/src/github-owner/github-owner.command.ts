import { Command, CommandRunner, Option } from 'nest-commander';
import { GithubDiscoveryProcessor } from './github-discovery.processor';
import { GithubOwnerScheduler } from './github-owner.scheduler';

@Command({ name: 'discover' })
export class GithubOwnerCommand implements CommandRunner {
  constructor(
    private readonly githubOwnerProcessor: GithubDiscoveryProcessor,
    private readonly githubOwnerScheduler: GithubOwnerScheduler
  ) {}

  async run(
    passedParams: string[],
    options?: Record<string, any>
  ): Promise<void> {
    options.schedule
      ? await this.githubOwnerScheduler.discover()
      : await this.githubOwnerProcessor.discoverAll();
  }

  @Option({
    flags: '-s, --schedule',
    description: 'Schedules the job instead of running it immediately',
  })
  parseSchedule(val: string) {
    return true;
  }
}
