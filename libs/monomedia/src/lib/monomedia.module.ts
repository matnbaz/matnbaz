import { Module } from '@nestjs/common';
import { MonomediaService } from './monomedia.service';

@Module({
  controllers: [],
  providers: [MonomediaService],
  exports: [MonomediaService],
})
export class MonomediaModule {}
