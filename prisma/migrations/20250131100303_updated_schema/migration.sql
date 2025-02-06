/*
  Warnings:

  - You are about to drop the column `minted` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "minted";

-- AlterTable
ALTER TABLE "meme" ADD COLUMN     "minted" BOOLEAN DEFAULT false;
