import { Field, ObjectType } from '@nestjs/graphql';
import { Node } from './node.model';

@ObjectType({ implements: [Node] })
export class PostTag {
  @Field(() => String)
  name: string;
}
