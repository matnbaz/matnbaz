import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Color } from '../../models/color.model';

@Resolver(() => Color)
export class ColorResolver {
  @ResolveField(() => String)
  red(@Parent() { hexString }: Color) {
    return hexString.slice(1, 3);
  }

  @ResolveField(() => String)
  green(@Parent() { hexString }: Color) {
    return hexString.slice(3, 5);
  }

  @ResolveField(() => String)
  blue(@Parent() { hexString }: Color) {
    return hexString.slice(5, 7);
  }
}
