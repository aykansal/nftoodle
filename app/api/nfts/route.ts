import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server"
import axios from 'axios';
import { tokenList } from '@/lib/types';
import { fetchBazarTokens } from '@/hooks/fetch';
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

export async function GET() {
  const nfts = await prisma.nfts.findMany({});
  if (!nfts) {
    const unleashKey = process.env.UNLEASH_API_KEY;
    const alchemyKey = process.env.ALCHEMY_API_KEY;
    const alchemyKey2 = process.env.ALCHEMY_API_KEY2;

    if (!unleashKey || !alchemyKey || !alchemyKey2) {
      throw new Error('API keys are missing in the environment variables');
    }

    try {
      const res = await axios.get(
        'https://api.unleashnfts.com/api/v2/nft/marketplace/metadata?sort_order=desc&offset=0&limit=100',
        {
          headers: {
            accept: 'application/json',
            'x-api-key': unleashKey,
          },
        }
      );

      const unleashUrls = getDistinctValues(
        res.data.data
          .filter((token: tokenList) => token.image_url)
          ?.map((token: tokenList) => token.image_url)
      );
      await Promise.all(
        unleashUrls.map(async (nftUrl) => {
          if (nftUrl && nftUrl.includes('https://')) {
            const isValid = await isValidImageUrl(nftUrl);
            if (isValid) {
              await prisma.nfts.upsert({
                where: {
                  sourceUrl: nftUrl
                },
                update: {
                  platform: Platforms.unleash
                },
                create: {
                  sourceUrl: nftUrl,
                  platform: Platforms.unleash
                }
              });
            }
          }
        })
      );
      // Fetch URLs for 'opensea'
      const alchemyUrlsCl1 = await fetchOpenSeaCollection(
        '0xef0182dc0574cd5874494a120750fd222fdb909a',
        alchemyKey
      );
      const alchemyUrlsCl2 = await fetchOpenSeaCollection(
        '0x1A92f7381B9F03921564a437210bB9396471050C',
        alchemyKey2
      );
      const alchemyUrls = getDistinctValues([...alchemyUrlsCl1, ...alchemyUrlsCl2]);

      await Promise.all(
        alchemyUrls.map(async (nftUrl) => {
          if (nftUrl && nftUrl.includes('https://')) {
            const isValid = await isValidImageUrl(nftUrl);
            if (isValid) {
              await prisma.nfts.upsert({
                where: {
                  sourceUrl: nftUrl
                },
                update: {
                  platform: Platforms.opensea
                },
                create: {
                  sourceUrl: nftUrl,
                  platform: Platforms.opensea
                }
              });
            }
          }
        })
      );
      const bazarUrls = await fetchBazarTokens();

      await Promise.all(
        bazarUrls.map(async (nftUrl) => {
          if (nftUrl && nftUrl.includes('https://')) {
            const isValid = await isValidImageUrl(nftUrl);
            if (isValid) {
              await prisma.nfts.upsert({
                where: {
                  sourceUrl: nftUrl
                },
                update: {
                  platform: Platforms.bazar
                },
                create: {
                  sourceUrl: nftUrl,
                  platform: Platforms.bazar
                }
              });
            }
          }
        })
      );

      const urls: string[] = [...unleashUrls, ...bazarUrls, ...alchemyUrls]

      return NextResponse.json({ data: urls })
    } catch (err) {
      console.error(`Error cron job:`, err);
      return NextResponse.json(err)
    }
  }
  return NextResponse.json(nfts)
}