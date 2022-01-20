-- AlterTable
ALTER TABLE "Owner" ADD COLUMN     "twitterUsername" TEXT;

-- CreateTable
CREATE TABLE "RepositorySelection" (
    "id" TEXT NOT NULL,
    "issue" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "featuredAt" TIMESTAMP(3),
    "description" TEXT,
    "sentOnInstagram" BOOLEAN NOT NULL DEFAULT false,
    "sentOnTelegram" BOOLEAN NOT NULL DEFAULT false,
    "sentOnTwitter" BOOLEAN NOT NULL DEFAULT false,
    "sentOnDiscord" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "RepositorySelection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RepositoryToRepositorySelection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "RepositorySelection_issue_key" ON "RepositorySelection"("issue");

-- CreateIndex
CREATE UNIQUE INDEX "_RepositoryToRepositorySelection_AB_unique" ON "_RepositoryToRepositorySelection"("A", "B");

-- CreateIndex
CREATE INDEX "_RepositoryToRepositorySelection_B_index" ON "_RepositoryToRepositorySelection"("B");

-- AddForeignKey
ALTER TABLE "_RepositoryToRepositorySelection" ADD FOREIGN KEY ("A") REFERENCES "Repository"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RepositoryToRepositorySelection" ADD FOREIGN KEY ("B") REFERENCES "RepositorySelection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
