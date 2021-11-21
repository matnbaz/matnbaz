import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class RepoSearchArgs {
  searchTerm?: string;
}
