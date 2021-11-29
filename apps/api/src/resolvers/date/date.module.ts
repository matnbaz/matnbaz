import { Module } from '@nestjs/common';
import { DateResolver } from './date.resolver';

@Module({
  providers: [DateResolver],
})
export class DateModule {}
