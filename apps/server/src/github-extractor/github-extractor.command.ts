import { Job } from 'bull';
import { Command, CommandRunner, Option } from 'nest-commander';
import { GithubExtractorProcessor } from './github-extractor.processor';
import { GithubExtractorScheduler } from './github-extractor.scheduler';

@Command({ name: 'extract-repos' })
export class GithubExtractorCommand implements CommandRunner {
  constructor(
    private readonly githubRepositoryProcessor: GithubExtractorProcessor,
    private readonly githubRepositoryScheduler: GithubExtractorScheduler
  ) {}

  async run(
    passedParams: string[],
    options?: Record<string, any>
  ): Promise<void> {
    options.schedule
      ? await this.githubRepositoryScheduler.extract()
      : await this.githubRepositoryProcessor.extractProcess({
          data: {},
        } as Job);
  }

  @Option({
    flags: '-s, --schedule',
    description: 'Schedules the job instead of running it immediately',
  })
  parseSchedule(val: string) {
    return true;
  }
}
