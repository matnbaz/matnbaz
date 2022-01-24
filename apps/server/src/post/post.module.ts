import { Module } from '@nestjs/common';
import { MarkdownModule } from '../markdown/markdown.module';
import { PostAuthorResolver } from './post-author.resolver';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
  imports: [MarkdownModule],
  providers: [PostService, PostResolver, PostAuthorResolver],
  exports: [PostService],
})
export class PostModule {}
