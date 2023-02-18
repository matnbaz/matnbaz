import { Field, ObjectType } from '@nestjs/graphql';
import { Node } from './node.model';

@ObjectType({ implements: [Node] })
export class Post {
  @Field(() => String)
  title: string;
  @Field(() => String)
  slug: string;
  @Field(() => String)
  content: string;
  @Field(() => String)
  contentHtml: string;
  @Field(() => String, { nullable: true })
  summary?: string;
  @Field(() => String, { nullable: true })
  image?: string;
}
