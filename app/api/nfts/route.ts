import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import axios from 'axios';
import { tokenList } from '@/lib/types';
import { fetchOpenSeaCollection, getDistinctValues } from '@/lib/utils';
import { fetchBazarTokens } from '@/hooks/fetch';

// Your function to fetch data from external APIs and update URLs
async function updateUrls() {
  const unleashKey = process.env.UNLEASH_API_KEY;
  const alchemyKey = process.env.ALCHEMY_API_KEY;
  const alchemyKey2 = process.env.ALCHEMY_API_KEY2;

  if (!unleashKey || !alchemyKey || !alchemyKey2) {
    console.log('API keys are missing in the environment variables');
    return;
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

    if (res.status !== 200) {
      throw new Error(`Error fetching unleashnfts: ${res.status}`);
    }

    const unleashUrls = res.data.data
      .filter((token: tokenList) => token.image_url)
      ?.map((token: tokenList) => token.image_url);

    const alchemyUrlsCl1 = await fetchOpenSeaCollection(
      '0xef0182dc0574cd5874494a120750fd222fdb909a',
      alchemyKey
    );

    const alchemyUrlsCl2 = await fetchOpenSeaCollection(
      '0x1A92f7381B9F03921564a437210bB9396471050C',
      alchemyKey2
    );

    const distinctUnleashUrls = getDistinctValues(unleashUrls);
    const distinctAlchemyUrlsCl1 = getDistinctValues(alchemyUrlsCl1);
    const distinctAlchemyUrlsCl2 = getDistinctValues(alchemyUrlsCl2);

    const distinctAlchemyUrls = distinctAlchemyUrlsCl1.concat(
      distinctAlchemyUrlsCl2
    );
    const bazarUrls = await fetchBazarTokens();
    const bazarNAlchemy = bazarUrls.concat(distinctAlchemyUrls);

    bazarNAlchemy.sort(() => Math.random() - 0.5);
    distinctAlchemyUrls.sort(() => Math.random() - 0.5);
    const combinedUrls = distinctUnleashUrls.concat(bazarNAlchemy);

    // Check if combinedUrls is valid and non-empty
    if (combinedUrls.length === 0) {
      throw new Error('No URLs to insert');
    }

    // Delete all existing image URLs
    await prisma.nft.deleteMany({});

    // Insert all URLs from the combinedUrls array
    await Promise.all(
      combinedUrls.map(async (nftUrls) => {
        if (nftUrls && nftUrls.includes('https://')) {
          await prisma.nft.create({
            data: {
              nftUrls,
            },
          });
        } else {
          // console.warn("Invalid URL detected:", url);
        }
      })
    );
    console.log('All URLs have been inserted!');

    // Update the last updated timestamp
    await prisma.lastUpdate.upsert({
      where: { id: 1 }, // Assuming there's only one row to track the timestamp
      update: { updatedAt: new Date() },
      create: { updatedAt: new Date() },
    });

    console.log('URLs updated successfully');
    return combinedUrls;
  } catch (err) {
    console.error('Error updating URLs:', err);
  }
}

// Main GET API to fetch the combined URLs
export async function GET(request: NextRequest) {
  try {
    // Get the last update time
    const lastUpdate = await prisma.lastUpdate.findFirst();
    if (!lastUpdate) {
      console.log('inside ');
      await updateUrls();
    } else {
      // Check if 24 hours have passed since the last update
      const timeDifference =
        new Date().getTime() - new Date(lastUpdate.updatedAt).getTime();
      const oneDay = 24 * 60 * 60 * 1000;

      if (timeDifference >= oneDay) {
        // If 24 hours have passed, update the URLs
        await updateUrls();
      }
    }

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '9');
    const start = (page - 1) * limit;

    // Get total count first
    const allUrls = await prisma.nft.findMany({
      select: { nftUrls: true },
    });
    const combinedUrls = allUrls.map((entry) => entry.nftUrls);
    const total = combinedUrls.length;

    // Get paginated data
    const paginatedUrls = combinedUrls.slice(start, start + limit);

    return NextResponse.json({
      urls: paginatedUrls,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error in GET:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
