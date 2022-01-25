import { ObjectType } from '@nestjs/graphql';
import { Node } from './node.model';

@ObjectType({ implements: [Node] })
export class Post {
  title: string;
  slug: string;
  content: string;
  contentHtml: string;
  image?: string;
}
