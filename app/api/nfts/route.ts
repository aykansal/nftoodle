import axios from 'axios';
import { tokenList } from '@/lib/types';
import { NextResponse } from 'next/server';

const unleashKey = process.env.UNLEASH_API_KEY;

// Combined function to fetch, filter, and validate marketplace metadata
function getDistinctValues(array: string[]) {
    // Use a Set to automatically handle uniqueness since it only stores unique values
    const set = new Set(array);
    // Convert the Set back to an array for the return value
    return Array.from(set);
}

export async function GET() {
    if (!unleashKey) {
        return NextResponse.json({ error: 'API key is missing in the environment variables' }, { status: 400 });
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
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const imageUrls = res.data.data.filter((token: tokenList) => token.image_url).map((token: tokenList) => token.image_url);
        const distinctUrls = getDistinctValues(imageUrls);

        return NextResponse.json(distinctUrls);
    } catch (err) {
        console.error('Error fetching or filtering NFTs:', err);
        return NextResponse.json({ error: 'Failed to fetch NFT data' }, { status: 500 });
    }
}
