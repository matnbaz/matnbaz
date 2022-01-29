/*
  Warnings:

  - Added the required column `publicContributionsCount` to the `OwnerStatistic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Owner" ADD COLUMN     "publicContributionsCount" INTEGER;

-- AlterTable
ALTER TABLE "OwnerStatistic" ADD COLUMN     "publicContributionsCount" INTEGER NOT NULL DEFAULT(0);
