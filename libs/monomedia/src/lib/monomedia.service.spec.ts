import { Test } from '@nestjs/testing';
import { MonomediaService } from './monomedia.service';

describe('MonomediaService', () => {
  let service: MonomediaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [MonomediaService],
    }).compile();

    service = module.get(MonomediaService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
