import { ArgsType, Field } from '@nestjs/graphql';
import { RepoOrder } from '../enums/repos-order.enum';

@ArgsType()
export class RepoOrderArgs {
  @Field(() => RepoOrder)
  order?: RepoOrder;
}
