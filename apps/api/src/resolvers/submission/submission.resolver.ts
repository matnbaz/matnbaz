import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Throttle } from '@nestjs/throttler';
import { PrismaService } from 'nestjs-prisma';
import { Submission } from '../../models/submission.model';

@Resolver(() => Submission)
export class SubmissionResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Throttle(5)
  @Mutation(() => Submission)
  submissionSubmit(@Args('content') content: string) {
    return this.prisma.submission.create({
      data: { content },
    });
  }
}
