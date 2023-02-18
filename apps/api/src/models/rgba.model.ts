import { CacheControl } from '../utils/cache-control.decorator';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@CacheControl({ inheritMaxAge: true })
@ObjectType()
export class RGBA {
  @Field(() => Int)
  red: number;

  @Field(() => Int)
  green: number;

  @Field(() => Int)
  blue: number;

  @Field(() => Int)
  alpha: number;
}
