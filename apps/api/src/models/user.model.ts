import { Field, ObjectType } from '@nestjs/graphql';
import { Node } from './node.model';

@ObjectType({ implements: [Node] })
export class User {
  @Field(() => String)
  username: string;
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => String, { nullable: true })
  bio?: string;
  @Field(() => String, { nullable: true })
  avatar?: string;
}
