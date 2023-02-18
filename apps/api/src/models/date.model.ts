import { CacheControl } from '../utils/cache-control.decorator';
import { Field, ObjectType } from '@nestjs/graphql';

@CacheControl({ inheritMaxAge: true })
@ObjectType()
export class DateObject {
  @Field(() => Date)
  original: Date;
}
