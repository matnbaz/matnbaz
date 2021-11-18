import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Language {
  color?: string;
  name: string;
}
