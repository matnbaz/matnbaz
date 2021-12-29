import { Field, ObjectType } from '@nestjs/graphql';
import { UserError } from '../models/errors/user-error.model';
import { Submission } from '../models/submission.model';

@ObjectType()
export class SubmissionPayload {
  submission?: Submission;

  @Field(() => [UserError])
  userErrors?: UserError[];
}
