import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Metadata {
  totalReposCount: number;
  totalOwnersCount: number;
}
