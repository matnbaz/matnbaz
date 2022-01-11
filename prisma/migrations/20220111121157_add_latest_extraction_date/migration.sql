-- AlterTable
ALTER TABLE "Owner" ADD COLUMN     "latestExtractionAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Repository" ADD COLUMN     "latestExtractionAt" TIMESTAMP(3);
