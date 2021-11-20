import { Module } from '@nestjs/common';
import { LanguageResolver } from './language.resolver';

@Module({
  providers: [LanguageResolver],
})
export class LanguageModule {}
