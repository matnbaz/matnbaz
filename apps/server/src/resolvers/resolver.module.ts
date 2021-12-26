import { Module } from '@nestjs/common';
import { ColorModule } from './color/color.module';
import { DateModule } from './date/date.module';
import { LanguageModule } from './language/language.module';
import { LicenseModule } from './license/license.module';
import { MetadataModule } from './metadata/metadata.module';
import { OwnerModule } from './owner/owner.module';
import { ReportModule } from './report/report.module';
import { RepositoryModule } from './repository/repository.module';
import { SubmissionModule } from './submission/submission.module';
import { TopicModule } from './topic/topic.module';

@Module({
  imports: [
    LanguageModule,
    LicenseModule,
    OwnerModule,
    RepositoryModule,
    TopicModule,
    ReportModule,
    SubmissionModule,
    DateModule,
    ColorModule,
    MetadataModule,
  ],
})
export class ResolverModule {}
