import { ArgsType, Field } from '@nestjs/graphql';
import { RepoType } from '../enums/repo-type.enum';

@ArgsType()
export class RepoFilterArgs {
  languages?: string[];

  @Field(() => RepoType)
  type: RepoType = RepoType.ALL;
}
