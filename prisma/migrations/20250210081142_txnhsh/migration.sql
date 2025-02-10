/*
  Warnings:

  - A unique constraint covering the columns `[txnhash]` on the table `meme` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "meme" ADD COLUMN     "txnhash" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "meme_txnhash_key" ON "meme"("txnhash");
