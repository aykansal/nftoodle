import axios from "axios";
import { tokenList } from "@/lib/types";
import { NextResponse } from "next/server";
import { NFTItem } from "@/lib/types";

const unleashKey = process.env.UNLEASH_API_KEY;
const alchemyKey = process.env.ALCHEMY_API_KEY;
const alchemyKey2 = process.env.ALCHEMY_API_KEY2;

async function fetchOpenSeaCollection(
  nftCollectionContractAddress: string,
  alchemyKey: string,
) {
  const url = `https://eth-mainnet.g.alchemy.com/nft/v2/${alchemyKey}/getNFTsForCollection`;

  const fetchedImages = await axios
    .get(url, {
      params: {
        contractAddress: nftCollectionContractAddress,
        withMetadata: true
      }
    }).then((res) => res.data.nfts)
    .catch((error) => {
      console.log(error.message);
    });
  const imageUrls = fetchedImages?.map((item: NFTItem) => item.metadata.image);
  return imageUrls;
}

function getDistinctValues(array: string[]) {
  // Use a Set to automatically handle uniqueness since it only stores unique values
  const set = new Set(array);
  // Convert the Set back to an array for the return value
  return Array.from(set);
}

export async function GET() {
  if (!unleashKey || !alchemyKey || !alchemyKey2) {
    return NextResponse.json(
      { error: "API key is missing in the environment variables" },
      { status: 400 }
    );
  }

  try {
    const res = await axios.get(
      "https://api.unleashnfts.com/api/v2/nft/marketplace/metadata?sort_order=desc&offset=0&limit=100",
      {
        headers: {
          accept: "application/json",
          "x-api-key": unleashKey,
        },
      }
    );

    if (res.status !== 200) {
      throw new Error(`Err fetching unleashnfts: ${res.status}`);
    }

    const unleashUrls: string[] = await res.data.data
      .filter((token: tokenList) => token.image_url)
      ?.map((token: tokenList) => token.image_url);

    const alchemyUrlsCl1: string[] = await fetchOpenSeaCollection(
      "0x394E3d3044fC89fCDd966D3cb35Ac0B32B0Cda91",
      alchemyKey,
    );

    const alchemyUrlsCl2: string[] = await fetchOpenSeaCollection(
      "0x1A92f7381B9F03921564a437210bB9396471050C",
      alchemyKey2,
    );

    if (res.status !== 200) {
      throw new Error(`Err fetching alchemynfts: ${res.status}`);
    }

    const distinctUnleashUrls: string[] = getDistinctValues(unleashUrls);
    const distinctAlchemyUrlsCl1: string[] = getDistinctValues(alchemyUrlsCl1);
    const distinctAlchemyUrlsCl2: string[] = getDistinctValues(alchemyUrlsCl2);

    const distinctAlchemyUrls = distinctAlchemyUrlsCl1.concat(distinctAlchemyUrlsCl2);
    distinctAlchemyUrls.sort(() => Math.random() - 0.5); // shuffle the array fro variety showcase
    const combinedUrls = distinctUnleashUrls.concat(distinctAlchemyUrls);

    return NextResponse.json(combinedUrls);
  } catch (err) {
    console.error("Error fetching or filtering NFTs:", err);
    return NextResponse.json(
      { error: "Failed to fetch NFT data" },
      { status: 500 }
    );
  }
}
