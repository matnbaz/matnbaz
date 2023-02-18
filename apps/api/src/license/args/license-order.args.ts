import { ArgsType, Field } from '@nestjs/graphql';
import { LicenseOrder } from '../enums/license-order.enum';

@ArgsType()
export class LicenseOrderArgs {
  @Field(() => LicenseOrder, { nullable: true })
  order?: LicenseOrder;
}
