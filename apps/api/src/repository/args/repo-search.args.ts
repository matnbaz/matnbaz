import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class RepoSearchArgs {
  @Field(() => String, {nullable: true})
  searchTerm?: string;
}
