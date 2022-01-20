import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Node } from './node.model';

@ObjectType({ implements: [Node] })
export class RepositorySelection {
  description?: string;

  @Field(() => Int)
  issue: number;
}
