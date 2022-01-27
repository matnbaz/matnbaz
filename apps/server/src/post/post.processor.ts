import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { PrismaService } from 'nestjs-prisma';
import { MarkdownService } from '../markdown/markdown.service';
import { MAIN_PROCESSES, MAIN_QUEUE } from '../queue';

@Processor(MAIN_QUEUE)
export class PostProcessor {
  constructor(
    private readonly prisma: PrismaService,
    private readonly markdownService: MarkdownService
  ) {}

  @Process(MAIN_PROCESSES.PARSE_POST_README)
  async parseMarkdownProcess(job: Job<{ id: string }>) {
    const post = await this.prisma.post.findUnique({
      where: { id: job.data.id },
    });
    await this.prisma.post.update({
      where: { id: job.data.id },
      data: {
        contentHtml: this.markdownService.parse(post.content, {
          openLinksInNewTab: true,
        }),
      },
    });
  }
}
