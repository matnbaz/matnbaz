import { Field, ID, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export class Node {
  @Field(() => ID)
  id: string;
}
