-- DropForeignKey
ALTER TABLE "Collect" DROP CONSTRAINT "Collect_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "Collect" DROP CONSTRAINT "Collect_repositoryId_fkey";

-- DropForeignKey
ALTER TABLE "CollectionBlacklist" DROP CONSTRAINT "CollectionBlacklist_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "CollectionBlacklist" DROP CONSTRAINT "CollectionBlacklist_repositoryId_fkey";

-- DropForeignKey
ALTER TABLE "CollectionWhitelist" DROP CONSTRAINT "CollectionWhitelist_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "CollectionWhitelist" DROP CONSTRAINT "CollectionWhitelist_repositoryId_fkey";

-- DropForeignKey
ALTER TABLE "Repository" DROP CONSTRAINT "Repository_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "RepositoryStatistic" DROP CONSTRAINT "RepositoryStatistic_repositoryId_fkey";

-- AddForeignKey
ALTER TABLE "Repository" ADD CONSTRAINT "Repository_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepositoryStatistic" ADD CONSTRAINT "RepositoryStatistic_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionBlacklist" ADD CONSTRAINT "CollectionBlacklist_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionBlacklist" ADD CONSTRAINT "CollectionBlacklist_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionWhitelist" ADD CONSTRAINT "CollectionWhitelist_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionWhitelist" ADD CONSTRAINT "CollectionWhitelist_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collect" ADD CONSTRAINT "Collect_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collect" ADD CONSTRAINT "Collect_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE CASCADE ON UPDATE CASCADE;
