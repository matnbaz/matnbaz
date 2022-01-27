import { Module } from '@nestjs/common';
import { MarkdownModule } from '../markdown/markdown.module';
import { PostProcessor } from './post.processor';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
  imports: [MarkdownModule],
  providers: [PostService, PostResolver, PostProcessor],
  exports: [PostService],
})
export class PostModule {}
