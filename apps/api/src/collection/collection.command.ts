import { Command, CommandRunner, Option } from 'nest-commander';
import { CollectionProcessor } from './collection.processor';
import { CollectionScheduler } from './collection.scheduler';

@Command({ name: 'collect' })
export class CollectionCommand implements CommandRunner {
  constructor(
    private readonly collectionProcessor: CollectionProcessor,
    private readonly collectionScheduler: CollectionScheduler
  ) {}

  async run(
    passedParams: string[],
    options?: Record<string, any>
  ): Promise<void> {
    options.schedule
      ? await this.collectionScheduler.collect()
      : await this.collectionProcessor.collectProcess();
  }

  @Option({
    flags: '-s, --schedule',
    description: 'Schedules the job instead of running it immediately',
  })
  parseSchedule(val: string) {
    return true;
  }
}
