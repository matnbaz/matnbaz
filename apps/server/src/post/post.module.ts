import { Module } from '@nestjs/common';
import { MarkdownModule } from '../markdown/markdown.module';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
  imports: [MarkdownModule],
  providers: [PostResolver, PostService],
  exports: [PostService],
})
export class PostModule {}
