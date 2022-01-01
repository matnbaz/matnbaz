import { Command, CommandRunner, Option } from 'nest-commander';
import { GithubLocationProcessor } from './github-location.processor';
import { GithubLocationScheduler } from './github-location.scheduler';

@Command({ name: 'discover-by-location' })
export class GithubLocationCommand implements CommandRunner {
  constructor(
    private readonly githubLocationProcessor: GithubLocationProcessor,
    private readonly githubLocationScheduler: GithubLocationScheduler
  ) {}

  async run(
    passedParams: string[],
    options?: Record<string, any>
  ): Promise<void> {
    options.schedule
      ? await this.githubLocationScheduler.discoverByLocation()
      : await this.githubLocationProcessor.discoverByLocationProcess();
  }

  @Option({
    flags: '-s, --schedule',
    description: 'Schedules the job instead of running it immediately',
  })
  parseSchedule(val: string) {
    return true;
  }
}
