-- CreateEnum
CREATE TYPE "Platforms" AS ENUM ('bazar', 'opensea', 'unleash');

-- CreateTable
CREATE TABLE "meme" (
    "id" SERIAL NOT NULL,
    "cloudinaryUrl" TEXT NOT NULL,
    "originalImage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "minted" BOOLEAN DEFAULT false,
    "userAddress" TEXT,

    CONSTRAINT "meme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "userWallet" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nfts" (
    "id" SERIAL NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "platform" "Platforms" NOT NULL,

    CONSTRAINT "nfts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "meme_cloudinaryUrl_key" ON "meme"("cloudinaryUrl");

-- CreateIndex
CREATE UNIQUE INDEX "user_userWallet_key" ON "user"("userWallet");

-- CreateIndex
CREATE UNIQUE INDEX "nfts_sourceUrl_key" ON "nfts"("sourceUrl");

-- AddForeignKey
ALTER TABLE "meme" ADD CONSTRAINT "meme_userAddress_fkey" FOREIGN KEY ("userAddress") REFERENCES "user"("userWallet") ON DELETE SET NULL ON UPDATE CASCADE;
