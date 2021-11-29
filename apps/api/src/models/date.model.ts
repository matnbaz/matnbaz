import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DateObject {
  original: Date;
}
