import { Module } from '@nestjs/common';
import { PostTagResolver } from './post-tag.resolver';

@Module({
  providers: [PostTagResolver],
})
export class PostTagModule {}
