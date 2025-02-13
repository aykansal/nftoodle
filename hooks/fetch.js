import axios from 'axios';

/**
 * Fetches Bazar tokens and converts them to Arweave URLs
 * @param {string[]} excludedTokens - Array of token IDs to exclude from results
 * @returns {Promise<string[]>} Array of Arweave URLs for the tokens
 */
export const fetchBazarTokens = async (excludedTokens = []) => {
  const PROCESS_ID = 'U3TjJAZWJjlWBB4KAXSHKzuky81jtyh0zqH8rUL4Wd0';
  const API_URL = `https://cu111.ao-testnet.xyz/dry-run?process-id=${PROCESS_ID}`;

  try {
    // const result = await dryrun({
    //   process: 'U3TjJAZWJjlWBB4KAXSHKzuky81jtyh0zqH8rUL4Wd0',
    //   action: "Info",
    //   tags: [{ name: "Action", value: "Info" }],
    // });

    const response = await axios.post(API_URL, {
      Owner: '123456789',
      Target: PROCESS_ID,
      Tags: [
        {
          name: 'Action',
          value: 'Info',
        },
      ],
    });

    const orderbook = JSON.parse(response?.data?.Messages[0]?.Data);

    // Extract all tokens using modern array methods
    const tokens = orderbook.Orderbook
      .flatMap(item => item.Orders)
      .map(order => order.Token)
      .filter(token => !excludedTokens.includes(token));

    // Remove duplicates
    const uniqueTokens = [...new Set(tokens)];
    return uniqueTokens.map(token => `https://arweave.net/${token}`);
  } catch (error) {
    console.error('Error fetching Bazar tokens:', error.message);
    return [];
  }
};

export const fetchBuffersBazarCollection = async () => {
  try {
    const buffersAssets = await axios.post(
      "https://cu57.ao-testnet.xyz/dry-run?process-id=-SXJxUNkC6T_eekc2luCVnowzHYCUsSx3mZ6NekFlNE",
      {
        "Id": "1234",
        "Target": "-SXJxUNkC6T_eekc2luCVnowzHYCUsSx3mZ6NekFlNE",
        "Owner": "1234",
        "Anchor": "0",
        "Data": "1234",
        "Tags": [
          { "name": "Action", "value": "Info" },
          { "name": "Data-Protocol", "value": "ao" },
          { "name": "Type", "value": "Message" },
          { "name": "Variant", "value": "ao.TN.1" }
        ]
      }
    );

    // Parse the response to get the assets
    const assetsArr = JSON.parse(buffersAssets.data.Messages[0].Data).Assets;

    // Build the GraphQL query
    const query = `
      query {
        transactions(
          ids: ${JSON.stringify(assetsArr)}
          tags: null
          first: 100
          owners: null
          block: null
          after: null
        ) {
          pageInfo {
            hasNextPage
          }
          edges {
            cursor
            node {
              id
              tags {
                name
                value
              }
              data {
                size
                type
              }
              owner {
                address
              }
              block {
                height
                timestamp
              }
            }
          }
        }
      }
    `;

    // Query the GraphQL endpoint to get the collection asset details
    const collectionAssetsDetails = await axios.post(
      'https://arweave-search.goldsky.com/graphql',
      { query }
    );
    const extractedData = collectionAssetsDetails.data.data.transactions.edges.map(edge => {
      const node = edge.node;
      const dateCreatedTag = node.tags.find(tag => tag.name === 'Date-Created');
      const bootloaderName = node.tags.find(tag => tag.name === 'Bootloader-Name');
      const bootloaderTopicsTag = node.tags.find(tag => tag.name === 'Bootloader-Topics');
      return {
        imageUrl: `https://arweave.net/${node.id}`,
        bootloaderName,
        dateCreated: dateCreatedTag ? dateCreatedTag.value : null,
        topics: bootloaderTopicsTag ? bootloaderTopicsTag.value : null
      };
    });
    const urls = extractedData.map((url) => url.imageUrl)
    return { extractedData, urls };
  } catch (error) {
    // Log the error and return it for debugging purposes
    console.error("Error fetching collection data:", error);
    return error;
  }
}
