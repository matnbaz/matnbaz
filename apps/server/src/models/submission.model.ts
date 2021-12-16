import { ObjectType } from '@nestjs/graphql';
import { PlatformType } from './enums/platform-type.enum';
import { Node } from './node.model';

@ObjectType({ implements: [Node] })
export class Submission {
  username: string;
  platform: PlatformType;
}
