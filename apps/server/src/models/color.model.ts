import { CacheControl } from '@exonest/graphql-cache-control';
import { ObjectType } from '@nestjs/graphql';

@CacheControl({ inheritMaxAge: true })
@ObjectType()
export class Color {
  hexString: string;
}
