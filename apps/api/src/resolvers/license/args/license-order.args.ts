import { ArgsType, Field } from '@nestjs/graphql';
import { LicenseOrder } from '../enums/license-order.enum';

@ArgsType()
export class LicenseOrderArgs {
  @Field(() => LicenseOrder)
  order: LicenseOrder = LicenseOrder.REPOSITORIES_DESC;
}
