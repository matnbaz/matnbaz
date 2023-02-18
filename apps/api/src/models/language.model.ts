import { Field, ObjectType } from '@nestjs/graphql';
import { Node } from './node.model';

@ObjectType({ implements: [Node] })
export class Language {
  @Field(() => String)
  name: string;
  @Field(() => String)
  slug: string;
  @Field(() => String, {nullable: true})
  description?: string;
}
