import { InjectQueue } from '@nestjs/bull';
import { Controller, Get } from '@nestjs/common';
import { Queue } from 'bull';
import { MAIN_QUEUE } from '../queue';

@Controller('collections')
export class CollectionController {
  constructor(@InjectQueue(MAIN_QUEUE) private readonly queue: Queue) {}

  @Get('/collect')
  discover() {
    if (process.env.NODE_ENV === 'production') return 'nah';
    this.queue.add('collect');
  }
}
