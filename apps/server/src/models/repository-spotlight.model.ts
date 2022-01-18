import { ObjectType } from '@nestjs/graphql';
import { Node } from './node.model';

@ObjectType({ implements: [Node] })
export class RepositorySpotlight {
  description?: string;
}
