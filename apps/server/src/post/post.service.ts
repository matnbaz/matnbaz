import { Injectable } from '@nestjs/common';
import { OctokitService } from 'nestjs-octokit';
import { PrismaService } from 'nestjs-prisma';
import { MarkdownService } from '../markdown/markdown.service';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly octokit: OctokitService,
    private readonly markdownService: MarkdownService
  ) {}

  async extractPosts() {
    const mainTreeResponse = await this.octokit.rest.git.getTree({
      owner: 'matnbaz',
      repo: 'blog',
      tree_sha: 'main',
    });

    const postsTreeObject = mainTreeResponse.data.tree.find(
      (obj) => obj.path === 'posts' && obj.type === 'tree'
    );

    if (!postsTreeObject) throw new Error('No posts tree found.');

    const postsTreeResponse = await this.octokit.rest.git.getTree({
      owner: 'matnbaz',
      repo: 'blog',
      tree_sha: postsTreeObject.sha,
    });

    const posts = [];

    for (const postObject of postsTreeResponse.data.tree) {
      posts.push(await this.extractPost(postObject.path));
    }

    return posts;
  }

  async extractPost(postRepoId: string) {
    const postPath = `posts/${postRepoId}`;
    const repositoryId = this.getPostId(postPath);

    const post = await this.prisma.post.findUnique({
      where: {
        repositoryId: postRepoId,
      },
    });

    const commitsResponse = await this.octokit.rest.repos.listCommits({
      owner: 'matnbaz',
      repo: 'blog',
      path: `${postPath}/content.md`,
    });
    const lastCommitDate = new Date(commitsResponse.data[0].commit.author.date);

    if (post) {
      if (post.updatedAt > lastCommitDate) {
        return post;
      }

      await this.prisma.postAuthor.deleteMany({
        where: { postId: post.id },
      });
    }

    const postMarkdownResponse = await this.octokit.rest.repos.getContent({
      owner: 'matnbaz',
      repo: 'blog',
      path: `${postPath}/content.md`,
    });

    const content = Buffer.from(
      (postMarkdownResponse.data as any).content,
      'base64'
    ).toString();

    const parsedContent = await this.markdownService.matter(content);

    parsedContent.content = await this.markdownService.renderForGithub(
      content,
      'matnbaz',
      'blog',
      'main',
      postPath
    );

    const authors = await this.extractPostAuthors(commitsResponse.data);
    await this.prisma.post.upsert({
      where: {
        repositoryId,
      },
      create: {
        content,
        contentHtml: parsedContent.content,
        title: parsedContent.data.title,
        repositoryId: repositoryId,
        slug: parsedContent.data.slug,
        PostAuthor: {
          createMany: {
            data: Object.values(authors),
          },
        },
      },
      update: {
        content,
        contentHtml: parsedContent.content,
        title: parsedContent.data.title,
        repositoryId: repositoryId,
        slug: parsedContent.data.slug,
        PostAuthor: {
          createMany: {
            data: Object.values(authors),
          },
        },
      },
    });

    return { post, authors };
  }

  async extractPostAuthors(
    postCommits: Awaited<
      ReturnType<OctokitService['rest']['repos']['listCommits']>
    >['data']
  ) {
    const authors: Record<
      string,
      { additions: number; deletions: number; ownerId: string }
    > = {};

    for (const commit of postCommits) {
      const commitResponse = await this.octokit.rest.repos.getCommit({
        owner: 'matnbaz',
        repo: 'blog',
        ref: commit.sha,
      });

      if (authors[commit.author.id]) {
        authors[commit.author.id].additions +=
          commitResponse.data.stats.additions;
        authors[commit.author.id].deletions +=
          commitResponse.data.stats.deletions;
      } else {
        const owner = await this.prisma.owner.findUnique({
          where: {
            platform_platformId: {
              platform: 'GitHub',
              platformId: commit.author.id.toString(),
            },
          },
        });

        if (owner) {
          authors[commit.author.id] = {
            additions: commitResponse.data.stats.additions,
            deletions: commitResponse.data.stats.deletions,
            ownerId: owner.id,
          };
        }
      }
    }
    return authors;
  }

  /**
   * Returns directory's name
   */
  private getPostId(path: string) {
    const split = path.split('/');
    return split[split.length - 1];
  }
}
