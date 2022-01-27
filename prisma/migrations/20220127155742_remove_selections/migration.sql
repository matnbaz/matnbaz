/*
  Warnings:

  - You are about to drop the `RepositorySelection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RepositoryToRepositorySelection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_RepositoryToRepositorySelection" DROP CONSTRAINT "_RepositoryToRepositorySelection_A_fkey";

-- DropForeignKey
ALTER TABLE "_RepositoryToRepositorySelection" DROP CONSTRAINT "_RepositoryToRepositorySelection_B_fkey";

-- DropTable
DROP TABLE "RepositorySelection";

-- DropTable
DROP TABLE "_RepositoryToRepositorySelection";
