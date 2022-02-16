/*
  Warnings:

  - A unique constraint covering the columns `[ownerId,languageId]` on the table `OwnerLanguage` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[repositoryId,languageId]` on the table `RepositoryLanguage` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "OwnerLanguage" DROP CONSTRAINT "OwnerLanguage_languageId_fkey";

-- DropForeignKey
ALTER TABLE "OwnerLanguage" DROP CONSTRAINT "OwnerLanguage_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "RepositoryLanguage" DROP CONSTRAINT "RepositoryLanguage_languageId_fkey";

-- DropForeignKey
ALTER TABLE "RepositoryLanguage" DROP CONSTRAINT "RepositoryLanguage_repositoryId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "OwnerLanguage_ownerId_languageId_key" ON "OwnerLanguage"("ownerId", "languageId");

-- CreateIndex
CREATE UNIQUE INDEX "RepositoryLanguage_repositoryId_languageId_key" ON "RepositoryLanguage"("repositoryId", "languageId");

-- AddForeignKey
ALTER TABLE "RepositoryLanguage" ADD CONSTRAINT "RepositoryLanguage_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepositoryLanguage" ADD CONSTRAINT "RepositoryLanguage_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OwnerLanguage" ADD CONSTRAINT "OwnerLanguage_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OwnerLanguage" ADD CONSTRAINT "OwnerLanguage_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;
