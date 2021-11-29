import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Throttle } from '@nestjs/throttler';
import * as P from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { DateObject } from '../../models/date.model';
import { Submission } from '../../models/submission.model';
import { createDateObject } from '../date/utils';

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

  @ResolveField(() => DateObject)
  recordUpdatedAt(@Parent() { createdAt }: P.Submission) {
    return createDateObject(createdAt);
  }
}
