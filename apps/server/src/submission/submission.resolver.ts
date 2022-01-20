import { Logger } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Throttle } from '@nestjs/throttler';
import { PrismaService } from 'nestjs-prisma';
import { GithubDiscovererService } from '../github-discoverer/github-discoverer.service';
import { PlatformType } from '../models/enums/platform-type.enum';
import { Submission } from '../models/submission.model';
import { SubmissionPayload } from './submission.payload';

@Resolver(() => Submission)
export class SubmissionResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly githubDiscovererService: GithubDiscovererService
  ) {}

  logger = new Logger(SubmissionResolver.name);

  @Throttle(20)
  @Mutation(() => SubmissionPayload)
  async sendSubmission(
    @Args('username') username: string,
    @Args('platform', { type: () => PlatformType }) platform: PlatformType
  ) {
    if (!username.match(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i))
      return {
        userErrors: [{ message: 'نام‌کاربری معتبر نیست.' }],
      };

    const owner = await this.prisma.owner.findFirst({
      where: {
        platform,
        login: { mode: 'insensitive', equals: username },
      },
    });

    if (owner) {
      return {
        userErrors: [{ message: 'این کاربر در حال حاضر در سایت وجود دارد.' }],
      };
    }

    if (
      await this.prisma.submission.findFirst({
        where: {
          platform: 'GitHub',
          username: { equals: username, mode: 'insensitive' },
        },
      })
    ) {
      return {
        userErrors: [
          {
            message:
              'در حال حاضر درخواستی برای اضافه شدن این کاربر ثبت شده است.',
          },
        ],
      };
    }

    if (!(await this.githubDiscovererService.validateOwner(username))) {
      this.logger.log(
        `Rejecting submitted user "${username}" due to validation failure`
      );

      return {
        userErrors: [
          {
            message: 'این کاربر شرایط مورد نیاز برای ثبت شدن در سایت را ندارد.',
          },
        ],
      };
    }

    return {
      submission: await this.prisma.submission.upsert({
        where: {
          platform_username: { username, platform },
        },
        create: { username, platform },
        update: {},
      }),
    };
  }
}
