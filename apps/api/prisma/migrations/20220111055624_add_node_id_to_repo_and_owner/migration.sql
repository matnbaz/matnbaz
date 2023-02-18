/*
  Warnings:

  - A unique constraint covering the columns `[nodeId]` on the table `Owner` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nodeId]` on the table `Repository` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Owner" ADD COLUMN     "nodeId" TEXT;

-- AlterTable
ALTER TABLE "Repository" ADD COLUMN     "nodeId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Owner_nodeId_key" ON "Owner"("nodeId");

-- CreateIndex
CREATE UNIQUE INDEX "Repository_nodeId_key" ON "Repository"("nodeId");
