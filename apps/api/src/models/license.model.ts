import { Field, ObjectType } from '@nestjs/graphql';
import { Node } from './node.model';

@ObjectType({ implements: [Node] })
export class License {
  @Field(() => String)
  name: string;
  @Field(() => String)
  key: string;
  @Field(() => String)
  spdxId: string;
}
