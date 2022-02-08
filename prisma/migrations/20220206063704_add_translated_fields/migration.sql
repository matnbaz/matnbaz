/*
  Warnings:

  - You are about to drop the column `description` on the `Collection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "description",
ADD COLUMN     "translatedDescriptionId" TEXT;

-- CreateTable
CREATE TABLE "TranslatedField" (
    "id" TEXT NOT NULL,
    "fa" TEXT NOT NULL,
    "en" TEXT NOT NULL,

    CONSTRAINT "TranslatedField_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_translatedDescriptionId_fkey" FOREIGN KEY ("translatedDescriptionId") REFERENCES "TranslatedField"("id") ON DELETE SET NULL ON UPDATE CASCADE;
