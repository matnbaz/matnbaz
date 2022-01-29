import { ArgsType, Field } from '@nestjs/graphql';
import { OwnerType } from '../../models/enums/owner-type.enum';

@ArgsType()
export class OwnerFilterArgs {
  /**
   * Type of the owner
   */
  @Field(() => OwnerType)
  type?: OwnerType;
}
