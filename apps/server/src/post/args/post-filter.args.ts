import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class PostFilterArgs {
  /**
   * Tags
   */
  tags?: string[];
}
