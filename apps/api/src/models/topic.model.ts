import { Field, ObjectType } from '@nestjs/graphql';
import { Node } from './node.model';

@ObjectType({ implements: [Node] })
export class Topic {
  @Field(() => String)
  name: string;
}
