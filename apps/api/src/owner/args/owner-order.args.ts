import { ArgsType, Field } from '@nestjs/graphql';
import { OwnerOrder } from '../enums/owner-order.enum';

@ArgsType()
export class OwnerOrderArgs {
  @Field(() => OwnerOrder, { nullable: true })
  order?: OwnerOrder;
}
