import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';
import type { NFTItem } from './types';

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

export function dataURLtoBlob(dataUrl: string) {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
