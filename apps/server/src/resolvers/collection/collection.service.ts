import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

export class CollectionService {
  constructor(private readonly prisma: PrismaService) {}

  async collectAllCollections() {
    const collections = await this.prisma.collection.findMany({
      select: { id: true },
    });

    for (const { id } of collections) await this.collect(id);
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
                    name: {
                      contains: term,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  })),
                ],
              },
              //// Restriction filters

              // Owners
              ...Owners.map(({ id }) => ({ Owner: { id } })),

              // Archive
              typeof archived !== 'undefined' ? { archived } : undefined,

              // Template
              typeof template !== 'undefined'
                ? { isTemplate: template }
                : undefined,

              // Minimum stargazers
              typeof minStargazers !== 'undefined'
                ? { stargazersCount: { gte: minStargazers } }
                : undefined,

              // Minimum forks
              typeof minForks !== 'undefined'
                ? { forksCount: { gte: minForks } }
                : undefined,

              // Creation date
              typeof minCreatedAt !== 'undefined' ||
              typeof maxCreatedAt !== 'undefined'
                ? { createdAt: { gte: minCreatedAt, lte: maxCreatedAt } }
                : undefined,

              // Last push date
              typeof minPushedAt !== 'undefined' ||
              typeof maxPushedAt !== 'undefined'
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
