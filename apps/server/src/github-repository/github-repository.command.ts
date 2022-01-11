import { Command, CommandRunner, Option } from 'nest-commander';
import { GithubRepositoryProcessor } from './github-repository.processor';
import { GithubRepositoryScheduler } from './github-repository.scheduler';

@Command({ name: 'extract-repos' })
export class GithubRepositoryCommand implements CommandRunner {
  constructor(
    private readonly githubRepositoryProcessor: GithubRepositoryProcessor,
    private readonly githubRepositoryScheduler: GithubRepositoryScheduler
  ) {}

  async run(
    passedParams: string[],
    options?: Record<string, any>
  ): Promise<void> {
    options.schedule
      ? await this.githubRepositoryScheduler.extract()
      : await this.githubRepositoryProcessor.extractProcess();
  }

  @Option({
    flags: '-s, --schedule',
    description: 'Schedules the job instead of running it immediately',
  })
  parseSchedule(val: string) {
    return true;
  }
}
