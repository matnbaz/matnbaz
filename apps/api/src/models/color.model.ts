import { CacheControl } from '../utils/cache-control.decorator';
import { Field, ObjectType } from '@nestjs/graphql';

@CacheControl({ inheritMaxAge: true })
@ObjectType()
export class Color {
  @Field(() => String)
  hexString: string;
}
