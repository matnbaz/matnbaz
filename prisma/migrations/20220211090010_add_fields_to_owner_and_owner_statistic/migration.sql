-- AlterTable
ALTER TABLE "Owner" ADD COLUMN     "closedIssuesCount" INTEGER,
ADD COLUMN     "openIssuesCount" INTEGER,
ADD COLUMN     "pullRequestsCount" INTEGER,
ADD COLUMN     "repositoriesContributedToCount" INTEGER,
ADD COLUMN     "repositoriesCount" INTEGER,
ADD COLUMN     "totalStarsCount" INTEGER;

-- AlterTable
ALTER TABLE "OwnerStatistic" ADD COLUMN     "closedIssuesCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "openIssuesCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "pullRequestsCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "repositoriesContributedToCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "repositoriesCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalStarsCount" INTEGER NOT NULL DEFAULT 0;
