import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class PostFilterArgs {
  /**
   * Tags
   */
  @Field(() => [String], { nullable: true })
  tags?: string[];
}
