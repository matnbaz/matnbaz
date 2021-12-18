import { CacheControl } from '@exonest/graphql-cache-control';
import { ObjectType } from '@nestjs/graphql';

@CacheControl({ inheritMaxAge: true })
@ObjectType()
export class DateObject {
  original: Date;
}
