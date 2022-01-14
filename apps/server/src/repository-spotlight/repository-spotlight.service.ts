import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class RepositorySpotlightService {
  constructor(private readonly prisma: PrismaService) {}

  spotlight(repoId: string) {
    this.prisma.repositorySpotlight.create({
      data: {
        Repository: { connect: { id: repoId } },
        spotlightedAt: new Date(), // TODO: weekly threshold?
      },
    });
  }
}
