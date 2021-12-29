import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class CollectionIdArgs {
  @Field(() => ID)
  id: string;
}
