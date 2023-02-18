import { ArgsType, Field } from '@nestjs/graphql';
import { OwnerType } from '../../models/enums/owner-type.enum';
import { PlatformType } from '../../models/enums/platform-type.enum';

@ArgsType()
export class OwnerFilterArgs {
  /**
   * Type of the owner
   */
  @Field(() => OwnerType, { nullable: true })
  type?: OwnerType;

  /**
   * Retrieves only the records that have `followersCount` and `contributionsCount`
   */
  @Field(() => Boolean, { nullable: true })
  withStatistics?: boolean;

  /**
   * The platform owner belongs to
   */
  @Field(() => PlatformType, { nullable: true })
  platform?: PlatformType;
}
