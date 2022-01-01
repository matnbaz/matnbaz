import { Command, CommandRunner, Option } from 'nest-commander';
import { GithubDiscovererProcessor } from './github-discoverer.processor';
import { GithubDiscovererScheduler } from './github-discoverer.scheduler';

@Command({ name: 'discover' })
export class GithubDiscovererCommand implements CommandRunner {
  constructor(
    private readonly githubDiscovererProcessor: GithubDiscovererProcessor,
    private readonly githubDiscovererScheduler: GithubDiscovererScheduler
  ) {}

  async run(
    passedParams: string[],
    options?: Record<string, any>
  ): Promise<void> {
    options.schedule
      ? await this.githubDiscovererScheduler.discover()
      : await this.githubDiscovererProcessor.discoverProcess();
  }

  @Option({
    flags: '-s, --schedule',
    description: 'Schedules the job instead of running it immediately',
  })
  parseSchedule(val: string) {
    return true;
  }
}
