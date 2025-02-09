import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { NFTItem } from './types';
import axios from 'axios';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchOpenSeaCollection(
  nftCollectionContractAddress: string,
  alchemyKey: string
) {
  const url = `https://eth-mainnet.g.alchemy.com/nft/v2/${alchemyKey}/getNFTsForCollection`;

  const fetchedImages = await axios
    .get(url, {
      params: {
        contractAddress: nftCollectionContractAddress,
        withMetadata: true,
      },
    })
    .then((res) => res.data.nfts)
    .catch((error) => {
      console.log("err in fetchOpenSeaCollection",error.message);
    });
  const imageUrls = fetchedImages?.map(
    (item: NFTItem) => item?.media[0].thumbnail
  );
  return imageUrls;
}

export function getDistinctValues(array: string[]) {
  // Use a Set to automatically handle uniqueness since it only stores unique values
  const set = new Set(array);
  // Convert the Set back to an array for the return value
  return Array.from(set);
}
