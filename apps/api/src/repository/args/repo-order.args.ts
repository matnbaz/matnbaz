import { ArgsType, Field } from '@nestjs/graphql';
import { ReposOrder } from '../enums/repos-order.enum';

@ArgsType()
export class RepoOrderArgs {
  @Field(() => ReposOrder)
  order?: ReposOrder;
}
