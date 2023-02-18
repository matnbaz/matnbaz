import { Module } from '@nestjs/common';
import { TopicResolver } from './topic.resolver';

@Module({
  providers: [TopicResolver],
})
export class TopicModule {}
