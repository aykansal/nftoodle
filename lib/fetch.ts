import { nft, tokenList } from "./types";

const options = {
    method: 'GET',
    headers: { accept: 'application/json', 'x-api-key': `${process.env.NEXT_PUBLIC_UNLEASH_API_KEY}` }
};

// all marketplace-data
export async function fetchMarketplaceMetadata() {
    return fetch('https://api.unleashnfts.com/api/v2/nft/marketplace/metadata?sort_order=desc&offset=0&limit=100', options)
        .then(res => {
            console.log(res);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
}

// only filter-valid-images
export const filterImages = async () => {
    const response = await fetchMarketplaceMetadata();
    const tokenList: tokenList[] = response.data.filter(
        (token: nft) => token.image_url
    );

    // validate the correct image tokens
    const validTokens = [];
    for (const token of tokenList) {
        try {
            const img = new Image();
            img.src = token.image_url;
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });
            validTokens.push(token);
            // Add to the valid list only if the image is loadable
        } catch {
            console.warn(`Invalid image URL skipped: ${token.image_url}`);
        }
    }
    return validTokens;
};