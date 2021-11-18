import { Controller, Get } from '@nestjs/common';
import { OperatorGhService } from './operator-gh.service';

@Controller('extractor/gh')
export class OperatorGhController {
  constructor(private readonly extractor: OperatorGhService) {}

  @Get('extract')
  async extract() {
    if (process.env.NODE_ENV === 'development') {
      await this.extractor.discoverOwners('iran');

      await this.extractor.extractReposFromOwners();
    }
  }
}
