import { NextResponse } from 'next/server';
import axios from 'axios';
import { tokenList } from '@/lib/types';
import { fetchOpenSeaCollection, getDistinctValues } from '@/lib/utils';
import { fetchBazarTokens } from '@/hooks/fetch';

export async function GET(
  request: Request,
  { params }: { params: { platform: string } }
) {
  const { platform } = params;
  const unleashKey = process.env.UNLEASH_API_KEY;
  const alchemyKey = process.env.ALCHEMY_API_KEY;
  const alchemyKey2 = process.env.ALCHEMY_API_KEY2;

  if (!unleashKey || !alchemyKey || !alchemyKey2) {
    return NextResponse.json(
      { error: 'API keys are missing in the environment variables' },
      { status: 500 }
    );
  }

  try {
    let urls: string[] = [];

    switch (platform) {
      case 'unleash':
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

        urls = getDistinctValues(
          res.data.data
            .filter((token: tokenList) => token.image_url)
            ?.map((token: tokenList) => token.image_url)
        );
        break;

      case 'opensea':
        const alchemyUrlsCl1 = await fetchOpenSeaCollection(
          '0xef0182dc0574cd5874494a120750fd222fdb909a',
          alchemyKey
        );
        const alchemyUrlsCl2 = await fetchOpenSeaCollection(
          '0x1A92f7381B9F03921564a437210bB9396471050C',
          alchemyKey2
        );
        urls = getDistinctValues([...alchemyUrlsCl1, ...alchemyUrlsCl2]);
        break;

      case 'bazar':
        urls = await fetchBazarTokens();
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid platform specified' },
          { status: 400 }
        );
    }

    return NextResponse.json({ urls });
  } catch (error) {
    console.error(`Error fetching ${platform} NFTs:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch NFTs' },
      { status: 500 }
    );
  }
}
