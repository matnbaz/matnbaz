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
      const response = await axios.get(
        `https://raw.githubusercontent.com/${ownerLogin}/${repoName}/${defaultBranch}/README.md`
      );
      return response.data;
    } catch (e) {
      try {
        const response = await axios.get(
          `https://raw.githubusercontent.com/${ownerLogin}/${repoName}/${defaultBranch}/readme.md`
        );
        return response.data;
      } catch (e) {
        try {
          const response = await axios.get(
            `https://raw.githubusercontent.com/${ownerLogin}/${repoName}/${defaultBranch}/Readme.md`
          );
          return response.data;
        } catch (e) {
          return null;
        }
      }
    }
  }

  renderReadme(readme: string, fullName: string, defaultBranch: string) {
    try {
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
    } catch (e) {
      this.logger.error(
        `There was a problem rendering markdown for ${fullName}.`
      );
      return 'مشکلی در هنگام تبدیل مارکداون به‌وجود آمد.';
    }
  }
}
