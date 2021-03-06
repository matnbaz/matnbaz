import { ArgsType, Field } from '@nestjs/graphql';
import { OwnerType } from '../../models/enums/owner-type.enum';
import { PlatformType } from '../../models/enums/platform-type.enum';

@ArgsType()
export class OwnerFilterArgs {
  /**
   * Type of the owner
   */
  @Field(() => OwnerType)
  type?: OwnerType;

  /**
   * Retrieves only the records that have `followersCount` and `contributionsCount`
   */
  withStatistics?: boolean;

  /**
   * The platform owner belongs to
   */
  platform?: PlatformType;
}
