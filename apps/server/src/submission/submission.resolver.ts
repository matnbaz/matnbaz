import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Throttle } from '@nestjs/throttler';
import { PrismaService } from 'nestjs-prisma';
import { PlatformType } from '../models/enums/platform-type.enum';
import { Submission } from '../models/submission.model';
import { SubmissionPayload } from './submission.payload';

@Resolver(() => Submission)
export class SubmissionResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Throttle(20)
  @Mutation(() => SubmissionPayload)
  async sendSubmission(
    @Args('username') username: string,
    @Args('platform', { type: () => PlatformType }) platform: PlatformType
  ) {
    const owner = await this.prisma.owner.findUnique({
      where: {
        platform_login: { platform, login: username },
      },
    });

    if (owner) {
      return {
        userErrors: [{ message: 'این کاربر در حال حاضر در سایت وجود دارد.' }],
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
