import { Injectable, Logger } from '@nestjs/common';
import * as matter from 'gray-matter';
import { marked, Renderer } from 'marked';
import * as emoji from 'node-emoji';

@Injectable()
export class MarkdownService {
  private logger = new Logger(MarkdownService.name);
  matter = matter;

  parseForGithub(
    markdown: string,
    owner: string,
    repo: string,
    defaultBranch = 'main',
    path?: string
  ) {
    const repoFullName = `${owner}/${repo}`;
    const repoRawUrl = `https://github.com/${repoFullName}/raw/${defaultBranch}${
      path ? `/${path}` : ''
    }`;

    const renderer = this.applyDirectionRenderer(new Renderer());
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

    const readmeHtml = marked.parse(emoji.emojify(markdown), {
      gfm: true,
      baseUrl: repoRawUrl,
      renderer,
    });

    return readmeHtml;
  }

  parse(markdown: string) {
    const renderer = this.applyDirectionRenderer(new Renderer());

    return marked.parse(emoji.emojify(markdown), {
      gfm: true,
      renderer,
    });
  }

  private applyDirectionRenderer(renderer: Renderer) {
    const ogHeadingRender = renderer.heading.bind(renderer);
    const ogListRender = renderer.list.bind(renderer);
    const ogParagraphRender = renderer.paragraph.bind(renderer);

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

    return renderer;
  }
}
