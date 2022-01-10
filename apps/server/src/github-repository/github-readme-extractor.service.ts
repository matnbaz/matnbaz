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
    try {
      const { Owner, defaultBranch, name } =
        await this.prisma.repository.findUnique({
          where: { id },
          select: {
            name: true,
            defaultBranch: true,
            Owner: { select: { login: true } },
          },
        });
      const readme = await this.getReadmeFromGithub(
        Owner.login,
        name,
        defaultBranch
      );
      await this.prisma.repository.update({
        where: { id },
        data: {
          readme,
          readmeHtml: readme
            ? this.renderReadme(readme, `${Owner.login}/${name}`, defaultBranch)
            : undefined,
        },
      });
    } catch (e) {
      //
    }
  }

  async getReadmeFromGithub(ownerLogin, repoName, defaultBranch) {
    try {
      const repoPageResponse = await axios.get(
        `https://github.com/${ownerLogin}/${repoName}`
      );

      // This name is anything that github recognizes as a standard readme file (README.md, Readme.md, README, README.txt, readme.markdown, etc.)
      const readmeFileName = repoPageResponse.data
        .split(`id="readme"`)[1]
        .split(`data-tagsearch-path="`)[1]
        .split(`"`)[0];
      if (!readmeFileName.toLowerCase().includes('readme')) return null;

      const response = await axios.get(
        `https://raw.githubusercontent.com/${ownerLogin}/${repoName}/${defaultBranch}/${readmeFileName}`
      );
      return response.data;
    } catch (e) {
      return null;
    }
  }

  renderReadme(readme: string, fullName: string, defaultBranch: string) {
    try {
      const repoRawUrl = `https://github.com/${fullName}/raw/${defaultBranch}`;

      const renderer = new Renderer();
      const ogImageRender = renderer.image.bind(renderer);
      const ogHtmlRender = renderer.html.bind(renderer);
      const ogHeadingRender = renderer.heading.bind(renderer);
      const ogListRender = renderer.list.bind(renderer);
      const ogParagraphRender = renderer.paragraph.bind(renderer);

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

      renderer.heading = (...args) => {
        const html = ogHeadingRender.call(this, ...args);
        return html.replace(/^<(h\d)/, '<$1 dir="auto"');
      };

      renderer.list = (...args) => {
        const html = ogListRender.call(this, ...args);
        return html.replace(/^<(ol|ul)/, '<$1 dir="auto"');
      };

      renderer.paragraph = (...args) => {
        const html = ogParagraphRender.call(this, ...args);
        return html.replace(/^<p/, '<p dir="auto"');
      };

      const readmeHtml = marked.parse(emoji.emojify(readme), {
        gfm: true,
        baseUrl: repoRawUrl,
        renderer,
      });

      return readmeHtml;
    } catch (e) {
      this.logger.error(
        `There was a problem rendering markdown for ${fullName}.`
      );
      return 'مشکلی در هنگام تبدیل مارکداون به‌وجود آمد.';
    }
  }
}
