-- CreateTable
CREATE TABLE "imageUrls" (
    "url" TEXT NOT NULL,

    CONSTRAINT "imageUrls_pkey" PRIMARY KEY ("url")
);

-- CreateTable
CREATE TABLE "LastUpdate" (
    "id" SERIAL NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LastUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "imageUrls_url_key" ON "imageUrls"("url");
