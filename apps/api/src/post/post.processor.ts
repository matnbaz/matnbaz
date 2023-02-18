// import { MonomediaService } from '@matnbaz/monomedia';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { PrismaService } from '../persistence/prisma/prisma.service';
import { MarkdownService } from '../markdown/markdown.service';
import { MAIN_PROCESSES, MAIN_QUEUE } from '../queue';

@Processor(MAIN_QUEUE)
export class PostProcessor {
  constructor(
    private readonly prisma: PrismaService,
    private readonly markdownService: MarkdownService,
    // private readonly monomedia: MonomediaService
  ) {}

  @Process(MAIN_PROCESSES.PUBLISH_POST)
  async publishPostProcess(job: Job<{ id: string }>) {
    const post = await this.prisma.post.update({
      where: { id: job.data.id },
      data: { publishedAt: new Date() },
      include: { Tags: true, User: { select: { name: true, avatar: true } } },
    });

    // TODO: implement a link shortener?

    // if (post.image) {
    //   try {
    //     await this.monomedia.discord.sendPhoto(
    //       post.image,
    //       `پست جدید: **${post.title}**`,
    //       {
    //         url: `https://matnbaz.net/blog/${post.slug}`,
    //         color: 2003199,
    //         author: {
    //           name: post.User.name,
    //           image: post.User.avatar,
    //         },
    //         withTimestamp: true,
    //         footer: 'بلاگ متن‌باز',
    //       }
    //     );
    //   } catch (e) {
    //     console.log(e);
    //   }

    //   await this.monomedia.telegram.sendPhoto(
    //     post.image,

    //     `پست جدید: **${post.title}**${
    //       post.Tags.length > 0
    //         ? `\n${post.Tags.map((tag) => '#' + tag.name)}`
    //         : ''
    //     }\nmatnbaz.net/blog/${post.slug}`
    //   );
    // }
  }

  @Process(MAIN_PROCESSES.PARSE_POST_README)
  async parseMarkdownProcess(job: Job<{ id: string }>) {
    const post = await this.prisma.post.findUnique({
      where: { id: job.data.id },
    });

    const parsedData = this.markdownService.matter(post.content);
    const tags = parsedData.data.tags?.split(' ') || [];

    await this.prisma.post.update({
      where: { id: job.data.id },
      data: {
        Tags: {
          connectOrCreate: tags.map((tag) => ({
            create: { name: tag },
            where: { name: tag },
          })),
        },
        contentHtml: this.markdownService.parse(parsedData.content, {
          openLinksInNewTab: true,
        }),
      },
    });
  }
}
