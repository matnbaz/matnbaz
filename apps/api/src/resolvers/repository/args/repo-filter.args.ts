import { ArgsType, Field } from '@nestjs/graphql';
import { RepoSourceType } from '../enums/repo-source-type.enum';
import { RepoType } from '../enums/repo-type.enum';

@ArgsType()
export class RepoFilterArgs {
  languages?: string[];

  @Field(() => [RepoType], { nullable: true })
  type?: RepoType[];

  @Field(() => RepoSourceType)
  sourceType: RepoSourceType = RepoSourceType.ALL;
}
