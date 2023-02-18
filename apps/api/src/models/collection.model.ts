import { Field, ObjectType } from '@nestjs/graphql';
import { Node } from './node.model';

@ObjectType({ implements: [Node] })
export class Collection {
  @Field(() => String)
  name: string;
  @Field(() => String)
  slug: string;
  @Field(() => String, { nullable: true })
  image?: string;
}
