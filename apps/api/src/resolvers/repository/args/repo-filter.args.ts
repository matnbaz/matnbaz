import { ArgsType, Field } from '@nestjs/graphql';
import { RepoSourceType } from '../enums/repo-source-type.enum';
import { RepoType } from '../enums/repo-type.enum';

@ArgsType()
export class RepoFilterArgs {
  languages?: string[];

  @Field(() => RepoType)
  type: RepoType = RepoType.ALL;

  @Field(() => RepoSourceType)
  sourceType: RepoSourceType = RepoSourceType.ALL;
}
