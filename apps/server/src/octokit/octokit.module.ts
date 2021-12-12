import { Module } from '@nestjs/common';
import { OctokitService } from './octokit.service';

@Module({
  providers: [OctokitService],
  exports: [OctokitService],
})
export class OctokitModule {}
