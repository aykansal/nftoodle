-- CreateTable
CREATE TABLE "meme" (
    "id" SERIAL NOT NULL,
    "cloudinaryUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userAddress" TEXT,

    CONSTRAINT "meme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LastUpdate" (
    "id" SERIAL NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LastUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "userWallet" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nft" (
    "id" SERIAL NOT NULL,
    "nftUrls" TEXT NOT NULL,

    CONSTRAINT "nft_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "meme_cloudinaryUrl_key" ON "meme"("cloudinaryUrl");

-- CreateIndex
CREATE UNIQUE INDEX "User_userWallet_key" ON "User"("userWallet");

-- CreateIndex
CREATE UNIQUE INDEX "nft_nftUrls_key" ON "nft"("nftUrls");

-- AddForeignKey
ALTER TABLE "meme" ADD CONSTRAINT "meme_userAddress_fkey" FOREIGN KEY ("userAddress") REFERENCES "User"("userWallet") ON DELETE SET NULL ON UPDATE CASCADE;
