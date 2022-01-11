/*
  Warnings:

  - You are about to drop the column `gravatarId` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `siteAdmin` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `allowForking` on the `Repository` table. All the data in the column will be lost.
  - You are about to drop the column `hasIssues` on the `Repository` table. All the data in the column will be lost.
  - You are about to drop the column `hasPages` on the `Repository` table. All the data in the column will be lost.
  - You are about to drop the column `hasProjects` on the `Repository` table. All the data in the column will be lost.
  - You are about to drop the column `hasWiki` on the `Repository` table. All the data in the column will be lost.
  - You are about to drop the column `mirrorUrl` on the `Repository` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Owner" DROP COLUMN "gravatarId",
DROP COLUMN "siteAdmin";

-- AlterTable
ALTER TABLE "Repository" DROP COLUMN "allowForking",
DROP COLUMN "hasIssues",
DROP COLUMN "hasPages",
DROP COLUMN "hasProjects",
DROP COLUMN "hasWiki",
DROP COLUMN "mirrorUrl";
