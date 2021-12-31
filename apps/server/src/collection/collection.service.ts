import { nullToUndefined } from '@matnbaz/common';
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
        TopicsExcluded: true,
        Languages: true,
        LanguagesExcluded: true,
        Owners: true,
        OwnersExcluded: true,
      },
    });
    const {
      Blacklist,
      Languages,
      LanguagesExcluded,
      Owners,
      OwnersExcluded,
      Topics,
      TopicsExcluded,
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
      termsExcluded,
      readmeTerms,
      readmeTermsExcluded,
    } = collection;

    const repos = await this.prisma.repository.findMany({
      where: {
        blockedAt: null,

        OR: [
          // AND:
          {
            AND: [
              {
                // Archive
                archived: nullToUndefined(archived, (archived) => archived),
                // Template
                isTemplate: nullToUndefined(template),
                // Minimum stargazers
                stargazersCount: nullToUndefined(minStargazers, (v) => ({
                  gte: v,
                })),
                // Minimum forks
                forksCount: nullToUndefined(minForks, (v) => ({ gte: v })),
                // Creation date
                createdAt: {
                  gte: nullToUndefined(minCreatedAt),
                  lte: nullToUndefined(maxCreatedAt),
                },
                // Last push date
                pushedAt: {
                  gte: nullToUndefined(minPushedAt),
                  lte: nullToUndefined(maxPushedAt),
                },
              },
              {
                // Owners
                OR: Owners.map(({ id }) => ({ Owner: { id } })),
              },
              {
                // Language
                OR: Languages.map(({ id }) => ({ Language: { id } })),
              },
            ],

            OR: [
              // Topics
              {
                OR: Topics.map(({ name }) => ({ Topics: { some: { name } } })),
              },

              // Terms
              {
                OR: terms.map((term) => ({
                  name: {
                    contains: term,
                    mode: Prisma.QueryMode.insensitive,
                  },

                  description: {
                    contains: term,
                    mode: Prisma.QueryMode.insensitive,
                  },
                })),
              },

              // README Terms
              {
                OR: readmeTerms.map((term) => ({
                  readme: {
                    contains: term,
                    mode: Prisma.QueryMode.insensitive,
                  },
                })),
              },
            ],

            NOT: [
              {
                // Language
                OR: LanguagesExcluded.map(({ id }) => ({ Language: { id } })),
              },
              {
                // Owners
                OR: OwnersExcluded.map(({ id }) => ({ Owner: { id } })),
              },
              {
                // Topics
                OR: TopicsExcluded.map(({ name }) => ({
                  Topics: { some: { name } },
                })),
              },
              {
                // Terms
                OR: termsExcluded.map((term) => ({
                  name: {
                    search: term,
                    mode: Prisma.QueryMode.insensitive,
                  },

                  description: {
                    search: term,
                    mode: Prisma.QueryMode.insensitive,
                  },
                })),
              },

              {
                // README Terms
                OR: readmeTermsExcluded.map((term) => ({
                  readme: {
                    contains: term,
                    mode: Prisma.QueryMode.insensitive,
                  },
                })),
              },
            ],

            id: {
              notIn: Blacklist.map(({ repositoryId }) => repositoryId),
            },
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

    console.log(collection.name, repos.length);

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
