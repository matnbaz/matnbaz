import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Node } from './node.model';

@ObjectType({ implements: [Node] })
export class PostAuthor {
  @Field(() => Int)
  additions: number;
  @Field(() => Int)
  deletions: number;
}
