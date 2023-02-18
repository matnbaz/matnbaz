import { ArgsType, Field } from '@nestjs/graphql';
import { TopicOrder } from '../enums/topics-order.enum';

@ArgsType()
export class TopicOrderArgs {
  @Field(() => TopicOrder, { nullable: true })
  order?: TopicOrder;
}
