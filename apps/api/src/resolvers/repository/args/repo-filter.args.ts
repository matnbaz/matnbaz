import { ArgsType, Field } from '@nestjs/graphql';
import { ArchiveStatusType } from '../enums/archive-status-type.enum';
import { ForkStatusType } from '../enums/fork-status-type.enum';
import { TemplateStatusType } from '../enums/template-status-type.enum';

@ArgsType()
export class RepoFilterArgs {
  /**
   * Language slugs
   */
  languages?: string[];

  /**
   * License keys
   */
  licenses?: string[];

  @Field(() => TemplateStatusType)
  templateStatus?: TemplateStatusType;

  @Field(() => ForkStatusType)
  forkStatus?: ForkStatusType;

  @Field(() => ArchiveStatusType)
  archiveStatus?: ArchiveStatusType;
}
