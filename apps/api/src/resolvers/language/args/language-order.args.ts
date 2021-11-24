import { ArgsType, Field } from '@nestjs/graphql';
import { LanguageOrder } from '../enums/language-order.enum';

@ArgsType()
export class LanguageOrderArgs {
  @Field(() => LanguageOrder)
  order?: LanguageOrder;
}
