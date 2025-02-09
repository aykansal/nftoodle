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
