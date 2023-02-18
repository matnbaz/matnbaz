import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Color } from '../models/color.model';
import { RGBA } from '../models/rgba.model';
import { colorHexToDecimal } from './utils';

@Resolver(() => Color)
export class ColorResolver {
  @ResolveField(() => RGBA)
  rgba(@Parent() { hexString }: Color) {
    const rgb = colorHexToDecimal(hexString);
    return {
      red: rgb[0],
      green: rgb[1],
      blue: rgb[2],
      alpha: 1,
    };
  }
}
