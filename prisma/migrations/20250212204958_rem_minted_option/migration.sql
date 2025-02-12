/*
  Warnings:

  - Made the column `minted` on table `meme` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "meme" ALTER COLUMN "minted" SET NOT NULL;
