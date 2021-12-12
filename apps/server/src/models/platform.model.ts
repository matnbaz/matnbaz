import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Platform {
  name: string;
}
