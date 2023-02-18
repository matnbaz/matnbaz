-- AlterTable
ALTER TABLE "OwnerStatistic" ALTER COLUMN "closedIssuesCount" DROP DEFAULT,
ALTER COLUMN "openIssuesCount" DROP DEFAULT,
ALTER COLUMN "pullRequestsCount" DROP DEFAULT,
ALTER COLUMN "repositoriesContributedToCount" DROP DEFAULT,
ALTER COLUMN "repositoriesCount" DROP DEFAULT,
ALTER COLUMN "totalStarsCount" DROP DEFAULT;
