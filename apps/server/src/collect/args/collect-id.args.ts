import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class CollectIdArgs {
  @Field(() => ID)
  id: string;
}
