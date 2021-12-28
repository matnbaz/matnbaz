import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CollectionService {
  constructor(private readonly prisma: PrismaService) {}

  logger = new Logger(CollectionService.name);

  async collectAllCollections() {
    const collections = await this.prisma.collection.findMany({
      select: { id: true },
    });

    for (const { id } of collections) await this.collect(id);

    this.logger.log(
      'Finished collecting repositories for all the collections.'
    );
  }

  /**
   * This method collects all the repositories that match the criteria of collection and stores them in `Collect` records
   * @param collection the collection you want to collect
   */
  async collect(collectionId: string) {
    const collection = await this.prisma.collection.findUnique({
      where: { id: collectionId },
      include: {
        Blacklist: true,
        Whitelist: true,
        Topics: true,
        Language: true,
        Owners: true,
      },
    });
    const {
      Blacklist,
      Language,
      Owners,
      Topics,
      Whitelist,
      archived,
      maxCreatedAt,
      maxPushedAt,
      minCreatedAt,
      minPushedAt,
      minForks,
      minStargazers,
      template,
      terms,
    } = collection;

    const repos = await this.prisma.repository.findMany({
      where: {
        OR: [
          {
            AND: [
              {
                //// Discovery filters
                OR: [
                  // Language
                  Language ? { languageId: Language.id } : undefined,

                  // Topics
                  ...Topics.map(({ name }) => ({
                    Topics: { some: { name } },
                  })),

                  // Terms
                  ...terms.map((term) => ({
                    OR: [
                      {
                        name: {
                          contains: term,
                          mode: Prisma.QueryMode.insensitive,
                        },
                      },
                      {
                        description: {
                          contains: term,
                          mode: Prisma.QueryMode.insensitive,
                        },
                      },
                    ],
                  })),
                ],
              },
              //// Restriction filters

              // Owners
              ...Owners.map(({ id }) => ({ Owner: { id } })),

              // Archive
              archived !== null ? { archived } : undefined,

              // Template
              template !== null ? { isTemplate: template } : undefined,

              // Minimum stargazers
              minStargazers !== null
                ? { stargazersCount: { gte: minStargazers } }
                : undefined,

              // Minimum forks
              minForks !== null ? { forksCount: { gte: minForks } } : undefined,

              // Creation date
              minCreatedAt !== null || maxCreatedAt !== null
                ? { createdAt: { gte: minCreatedAt, lte: maxCreatedAt } }
                : undefined,

              // Last push date
              minPushedAt !== null || maxPushedAt !== null
                ? { pushedAt: { gte: minPushedAt, lte: maxPushedAt } }
                : undefined,

              // Blacklist
              {
                id: {
                  notIn: Blacklist.map(({ repositoryId }) => repositoryId),
                },
              },
            ],
          },

          // Whitelist
          {
            id: {
              in: Whitelist.map(({ repositoryId }) => repositoryId),
            },
          },
        ],
      },
    });

    await this.prisma.$transaction([
      this.prisma.collect.deleteMany({
        where: { Collection: { id: collection.id } },
      }),
      this.prisma.collect.createMany({
        data: repos.map((repo) => ({
          collectionId: collection.id,
          repositoryId: repo.id,
        })),
      }),
    ]);
  }
}
