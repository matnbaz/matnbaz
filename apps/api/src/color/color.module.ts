import { Module } from '@nestjs/common';
import { ColorResolver } from './color.resolver';

@Module({
  providers: [ColorResolver],
})
export class ColorModule {}
