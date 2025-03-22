import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server"
import axios from 'axios';
import { fetchBuffersBazarCollection } from '@/hooks/fetch';
import { fetchOpenSeaCollection, getDistinctValues } from '@/lib/utils';
import { Platforms } from "@prisma/client";

async function isValidImageUrl(url: string): Promise<boolean> {
  try {
    const response = await axios.head(url);
    const contentType = response.headers['content-type'];
    return response.status === 200 && contentType?.startsWith('image/');
  } catch {
    return false;
  }
}

async function handleNFTsFromUrl(nftUrls: string[], platform: Platforms) {
  console.log(platform);
  return Promise.all(
    nftUrls.map(async (nftUrl) => {
      if (nftUrl && nftUrl.includes('https://')) {
        try {
          const isValid = await isValidImageUrl(nftUrl);
          if (isValid) {
            await prisma.nfts.upsert({
              where: { sourceUrl: nftUrl },
              update: { platform },
              create: { sourceUrl: nftUrl, platform },
            });
          }
        } catch (err) {
          console.error(`Error processing URL ${nftUrl} for platform ${platform}:`, err);
        }
      }
    })
  );
}

export async function GET() {
  const nfts = await prisma.nfts.findMany({});
  if (!nfts || nfts.length === 0) {
    const unleashKey = process.env.UNLEASH_API_KEY;
    const alchemyKey = process.env.ALCHEMY_API_KEY;
    const alchemyKey2 = process.env.ALCHEMY_API_KEY2;

    if (!unleashKey || !alchemyKey || !alchemyKey2) {
      throw new Error('API keys are missing in the environment variables');
    }

    try {
      // Fetch from Unleash NFT marketplace
      const res = await axios.get(
        'https://api.unleashnfts.com/api/v2/nft/marketplace/metadata?sort_order=desc&offset=0&limit=100',
        { headers: { accept: 'application/json', 'x-api-key': unleashKey } }
      );

      const unleashUrls = getDistinctValues(
        res.data.data.filter((token: { image_url: string }) => token.image_url)?.map((token: { image_url: string }) => token.image_url)
      );

      await handleNFTsFromUrl(unleashUrls, Platforms.unleash);

      // Fetch from OpenSea collections (Alchemy APIs)
      const alchemyUrlsCl1 = await fetchOpenSeaCollection('0xef0182dc0574cd5874494a120750fd222fdb909a', alchemyKey);
      const alchemyUrlsCl2 = await fetchOpenSeaCollection('0x1A92f7381B9F03921564a437210bB9396471050C', alchemyKey2);
      const alchemyUrls = getDistinctValues([...alchemyUrlsCl1, ...alchemyUrlsCl2]);

      await handleNFTsFromUrl(alchemyUrls, Platforms.opensea);

      // Fetch from Bazar
      // const bazarUrls: string[] = await fetchBazarTokens().then(res => res.urls);
      // console.log(bazarUrls);
      // await handleNFTsFromUrl(bazarUrls, Platforms.bazar);

      // Fetch from Buffers Bazar collection
      const thebuffersUrls = await fetchBuffersBazarCollection();

      // @ts-expect-error ignore
      const newBufferUrls = thebuffersUrls.urls;
      await handleNFTsFromUrl(newBufferUrls, Platforms.thebuffers);

      const allUrls = [...unleashUrls, ...alchemyUrls, ...newBufferUrls];
      return NextResponse.json(allUrls.length);

    } catch (err) {
      console.error('Error during cron job:', err);
      return NextResponse.json({ error: 'Error fetching NFT data', details: err });
    }
  }
  return NextResponse.json(nfts);
}