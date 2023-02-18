-- CreateEnum
CREATE TYPE "OwnerType" AS ENUM ('User', 'Organization');

-- CreateEnum
CREATE TYPE "PlatformType" AS ENUM ('GitHub', 'GitLab', 'Bitbucket');

-- CreateEnum
CREATE TYPE "ReportableType" AS ENUM ('Owner', 'Repository');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('User', 'Moderator', 'Admin');

-- CreateTable
CREATE TABLE "Repository" (
    "id" TEXT NOT NULL,
    "platform" "PlatformType" NOT NULL,
    "platformId" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "stargazersCount" INTEGER NOT NULL,
    "watchersCount" INTEGER NOT NULL,
    "forksCount" INTEGER NOT NULL,
    "openIssuesCount" INTEGER NOT NULL,
    "hasIssues" BOOLEAN NOT NULL,
    "hasProjects" BOOLEAN NOT NULL,
    "hasWiki" BOOLEAN NOT NULL,
    "hasPages" BOOLEAN NOT NULL,
    "archived" BOOLEAN NOT NULL,
    "disabled" BOOLEAN NOT NULL,
    "allowForking" BOOLEAN NOT NULL,
    "isFork" BOOLEAN NOT NULL,
    "isTemplate" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pushedAt" TIMESTAMP(3) NOT NULL,
    "extractedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recordUpdatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "readme" TEXT,
    "readmeHtml" TEXT,
    "defaultBranch" TEXT NOT NULL,
    "homePage" TEXT,
    "mirrorUrl" TEXT,
    "ownerId" TEXT NOT NULL,
    "languageId" TEXT,
    "licenseId" TEXT,
    "blockedAt" TIMESTAMP(3),

    CONSTRAINT "Repository_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RepositoryStatistic" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "size" INTEGER NOT NULL,
    "stargazersCount" INTEGER NOT NULL,
    "watchersCount" INTEGER NOT NULL,
    "forksCount" INTEGER NOT NULL,
    "openIssuesCount" INTEGER NOT NULL,
    "repositoryId" TEXT NOT NULL,

    CONSTRAINT "RepositoryStatistic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "License" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "spdxId" TEXT NOT NULL,

    CONSTRAINT "License_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Owner" (
    "id" TEXT NOT NULL,
    "platform" "PlatformType" NOT NULL,
    "platformId" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "gravatarId" TEXT NOT NULL,
    "type" "OwnerType" NOT NULL,
    "reason" TEXT,
    "siteAdmin" BOOLEAN NOT NULL,
    "extractedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recordUpdatedAt" TIMESTAMP(3) NOT NULL,
    "blockedAt" TIMESTAMP(3),

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "platform" "PlatformType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "repeatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "reportableId" TEXT NOT NULL,
    "reportableType" "ReportableType" NOT NULL,
    "hasBeenResolved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" "UserType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscoveryTerm" (
    "id" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "platform" "PlatformType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DiscoveryTerm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT,
    "image" TEXT,
    "terms" TEXT[],
    "termsExcluded" TEXT[],
    "readmeTerms" TEXT[],
    "readmeTermsExcluded" TEXT[],
    "minStargazers" INTEGER,
    "minForks" INTEGER,
    "archived" BOOLEAN,
    "template" BOOLEAN,
    "minCreatedAt" TIMESTAMP(3),
    "maxCreatedAt" TIMESTAMP(3),
    "minPushedAt" TIMESTAMP(3),
    "maxPushedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollectionBlacklist" (
    "id" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    "repositoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CollectionBlacklist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollectionWhitelist" (
    "id" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    "repositoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CollectionWhitelist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collect" (
    "id" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    "repositoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Collect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RepositoryToTopic" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_topics" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_topics_excluded" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_owners" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_owners_excluded" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_collections" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_collections_excluded" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Repository_platform_platformId_key" ON "Repository"("platform", "platformId");

-- CreateIndex
CREATE UNIQUE INDEX "License_key_key" ON "License"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_name_key" ON "Topic"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_platform_platformId_key" ON "Owner"("platform", "platformId");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_platform_login_key" ON "Owner"("platform", "login");

-- CreateIndex
CREATE UNIQUE INDEX "Submission_platform_username_key" ON "Submission"("platform", "username");

-- CreateIndex
CREATE UNIQUE INDEX "Language_slug_key" ON "Language"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DiscoveryTerm_term_platform_key" ON "DiscoveryTerm"("term", "platform");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_slug_key" ON "Collection"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "CollectionBlacklist_collectionId_repositoryId_key" ON "CollectionBlacklist"("collectionId", "repositoryId");

-- CreateIndex
CREATE UNIQUE INDEX "CollectionWhitelist_collectionId_repositoryId_key" ON "CollectionWhitelist"("collectionId", "repositoryId");

-- CreateIndex
CREATE UNIQUE INDEX "_RepositoryToTopic_AB_unique" ON "_RepositoryToTopic"("A", "B");

-- CreateIndex
CREATE INDEX "_RepositoryToTopic_B_index" ON "_RepositoryToTopic"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_topics_AB_unique" ON "_topics"("A", "B");

-- CreateIndex
CREATE INDEX "_topics_B_index" ON "_topics"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_topics_excluded_AB_unique" ON "_topics_excluded"("A", "B");

-- CreateIndex
CREATE INDEX "_topics_excluded_B_index" ON "_topics_excluded"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_owners_AB_unique" ON "_owners"("A", "B");

-- CreateIndex
CREATE INDEX "_owners_B_index" ON "_owners"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_owners_excluded_AB_unique" ON "_owners_excluded"("A", "B");

-- CreateIndex
CREATE INDEX "_owners_excluded_B_index" ON "_owners_excluded"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_collections_AB_unique" ON "_collections"("A", "B");

-- CreateIndex
CREATE INDEX "_collections_B_index" ON "_collections"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_collections_excluded_AB_unique" ON "_collections_excluded"("A", "B");

-- CreateIndex
CREATE INDEX "_collections_excluded_B_index" ON "_collections_excluded"("B");

-- AddForeignKey
ALTER TABLE "Repository" ADD CONSTRAINT "Repository_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repository" ADD CONSTRAINT "Repository_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repository" ADD CONSTRAINT "Repository_licenseId_fkey" FOREIGN KEY ("licenseId") REFERENCES "License"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepositoryStatistic" ADD CONSTRAINT "RepositoryStatistic_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionBlacklist" ADD CONSTRAINT "CollectionBlacklist_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionBlacklist" ADD CONSTRAINT "CollectionBlacklist_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionWhitelist" ADD CONSTRAINT "CollectionWhitelist_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionWhitelist" ADD CONSTRAINT "CollectionWhitelist_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collect" ADD CONSTRAINT "Collect_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collect" ADD CONSTRAINT "Collect_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RepositoryToTopic" ADD FOREIGN KEY ("A") REFERENCES "Repository"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RepositoryToTopic" ADD FOREIGN KEY ("B") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_topics" ADD FOREIGN KEY ("A") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_topics" ADD FOREIGN KEY ("B") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_topics_excluded" ADD FOREIGN KEY ("A") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_topics_excluded" ADD FOREIGN KEY ("B") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_owners" ADD FOREIGN KEY ("A") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_owners" ADD FOREIGN KEY ("B") REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_owners_excluded" ADD FOREIGN KEY ("A") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_owners_excluded" ADD FOREIGN KEY ("B") REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_collections" ADD FOREIGN KEY ("A") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_collections" ADD FOREIGN KEY ("B") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_collections_excluded" ADD FOREIGN KEY ("A") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_collections_excluded" ADD FOREIGN KEY ("B") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;
