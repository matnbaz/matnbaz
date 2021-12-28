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
      },
    });

    const repos = await this.prisma.repository.findMany({
      where: {
        OR: [
          {
            AND: [
              {
                OR: [
                  ...collection.Topics.map(({ name }) => ({
                    Topics: { some: { name } },
                  })),
                  collection.languageId
                    ? { languageId: collection.languageId }
                    : undefined,
                  ...collection.terms.map((term) => ({
                    name: {
                      contains: term,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  })),
                ],
              },

              {
                id: {
                  notIn: collection.Blacklist.map(
                    ({ repositoryId }) => repositoryId
                  ),
                },
              },
            ],
          },
          {
            id: {
              in: collection.Whitelist.map(({ repositoryId }) => repositoryId),
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
