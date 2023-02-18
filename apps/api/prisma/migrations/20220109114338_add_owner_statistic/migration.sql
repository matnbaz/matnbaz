-- CreateTable
CREATE TABLE "OwnerStatistic" (
    "id" TEXT NOT NULL,
    "contributionsCount" INTEGER NOT NULL,
    "followersCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "OwnerStatistic_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OwnerStatistic" ADD CONSTRAINT "OwnerStatistic_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
