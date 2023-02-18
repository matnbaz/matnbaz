import { ArgsType, Field } from '@nestjs/graphql';
import { ArchiveStatusType } from '../enums/archive-status-type.enum';
import { ForkStatusType } from '../enums/fork-status-type.enum';
import { TemplateStatusType } from '../enums/template-status-type.enum';

@ArgsType()
export class RepoFilterArgs {
  /**
   * Language slugs
   */
  @Field(() => [String], { nullable: true })
  languages?: string[];

  /**
   * License keys
   */
  @Field(() => [String], { nullable: true })
  licenses?: string[];

  @Field(() => TemplateStatusType, { nullable: true })
  templateStatus?: TemplateStatusType;

  @Field(() => ForkStatusType, { nullable: true })
  forkStatus?: ForkStatusType;

  @Field(() => ArchiveStatusType, { nullable: true })
  archiveStatus?: ArchiveStatusType;
}
