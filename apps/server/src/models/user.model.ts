import { ObjectType } from '@nestjs/graphql';
import { Node } from './node.model';

@ObjectType({ implements: [Node] })
export class User {
  username: string;
  name?: string;
  bio?: string;
}
