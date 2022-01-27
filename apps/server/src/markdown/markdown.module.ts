import { Module } from '@nestjs/common';
import { MarkdownService } from './markdown.service';

@Module({
  providers: [MarkdownService],
  exports: [MarkdownService],
})
export class MarkdownModule {}
