import { MonomediaService } from '@matnbaz/monomedia';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { PrismaService } from 'nestjs-prisma';
import { MarkdownService } from '../markdown/markdown.service';
import { MAIN_PROCESSES, MAIN_QUEUE } from '../queue';

@Processor(MAIN_QUEUE)
export class PostProcessor {
  constructor(
    private readonly prisma: PrismaService,
    private readonly markdownService: MarkdownService,
    private readonly monomedia: MonomediaService
  ) {}

  @Process(MAIN_PROCESSES.PUBLISH_POST)
  async publishPostProcess(job: Job<{ id: string }>) {
    const post = await this.prisma.post.update({
      where: { id: job.data.id },
      data: { publishedAt: new Date() },
      include: { Tags: true },
    });

    // TODO: implement a link shortener?

    if (post.image) {
      await this.monomedia.discord.sendPhoto(
        post.image,
        `پست جدید: **${post.title}**\nhttps://matnbaz.net/blog/${post.slug}`
      );

      await this.monomedia.telegram.sendPhoto(
        post.image,

        `پست جدید: **${post.title}**${
          post.Tags.length > 0
            ? `\n${post.Tags.map((tag) => '#' + tag.name)}`
            : ''
        }\nmatnbaz.net/blog/${post.slug}`
      );
    }
  }

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
