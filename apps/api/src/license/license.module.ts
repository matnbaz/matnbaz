import { Module } from '@nestjs/common';
import { LicenseResolver } from './license.resolver';

@Module({
  providers: [LicenseResolver],
})
export class LicenseModule {}
