import { Command, CommandRunner, Option } from 'nest-commander';
import { GithubExtractorProcessor } from './github-extractor.processor';
import { GithubExtractorScheduler } from './github-extractor.scheduler';

@Command({ name: 'extract' })
export class GithubExtractorCommand implements CommandRunner {
  constructor(
    private readonly githubExtractorProcessor: GithubExtractorProcessor,
    private readonly githubExtractorScheduler: GithubExtractorScheduler
  ) {}

  async run(
    passedParams: string[],
    options?: Record<string, any>
  ): Promise<void> {
    options.schedule
      ? await this.githubExtractorScheduler.extract()
      : await this.githubExtractorProcessor.extractProcess();
  }

  @Option({
    flags: '-s, --schedule',
    description: 'Schedules the job instead of running it immediately',
  })
  parseSchedule(val: string) {
    return true;
  }
}
