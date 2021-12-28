import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { marked, Renderer } from 'marked';
import { PrismaService } from 'nestjs-prisma';
import * as emoji from 'node-emoji';

@Injectable()
export class GithubReadmeExtractorService {
  constructor(private readonly prisma: PrismaService) {}
  private logger = new Logger(GithubReadmeExtractorService.name);

  async extractAllReadmes() {
    const repos = await this.prisma.repository.findMany({
      where: { blockedAt: null },
      select: { id: true },
    });

    for (const repo of repos) await this.extractReadme(repo.id);
  }

  async extractReadme(id: string) {
    const { Owner, defaultBranch, name } =
      await this.prisma.repository.findUnique({
        where: { id },
        select: {
          name: true,
          defaultBranch: true,
          Owner: { select: { login: true } },
        },
      });
    // `https://raw.githubusercontent.com/alitnk/monopay/main/README.md`
    try {
      const response = await axios.get(
        `https://raw.githubusercontent.com/${Owner.login}/${name}/${defaultBranch}/README.md`
      );
      const readme = response.data;

      await this.prisma.repository.update({
        where: { id },
        data: {
          readme,
          readmeHtml: this.renderReadme(
            readme,
            `${Owner.login}/${name}`,
            defaultBranch
          ),
        },
      });
    } catch (e) {
      this.logger.error(
        `Could not extract the README for ${Owner.login}/${name}. error message: ${e.message}`
      );
    }
  }

  renderReadme(readme: string, fullName: string, defaultBranch: string) {
    const repoRawUrl = `https://github.com/${fullName}/raw/${defaultBranch}`;

    const renderer = new Renderer();
    const ogImageRender = renderer.image.bind(renderer);
    const ogHtmlRender = renderer.html.bind(renderer);
    renderer.image = (href, ...rest) => {
      return ogImageRender(
        href.startsWith('http')
          ? href
          : repoRawUrl + (href.startsWith('/') ? href : '/' + href),
        ...rest
      );
    };
    renderer.html = (html) =>
      ogHtmlRender(
        html.replace(/src="(?!https?:\/\/)/g, `src="${repoRawUrl}/`)
      );

    const readmeHtml = marked.parse(emoji.emojify(readme), {
      gfm: true,
      baseUrl: repoRawUrl,
      renderer,
    });

    return readmeHtml;
  }
}
