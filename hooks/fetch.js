import axios from 'axios';

export const fetchBazarTokens = async (excludedTokens = []) => {
  try {
    // const result = await dryrun({
    //   process: 'U3TjJAZWJjlWBB4KAXSHKzuky81jtyh0zqH8rUL4Wd0',
    //   action: "Info",
    //   tags: [{ name: "Action", value: "Info" }],
    // });

    const result = await axios.post(
      'https://cu111.ao-testnet.xyz/dry-run?process-id=U3TjJAZWJjlWBB4KAXSHKzuky81jtyh0zqH8rUL4Wd0',
      {
        Owner: '123456789',
        Target: 'U3TjJAZWJjlWBB4KAXSHKzuky81jtyh0zqH8rUL4Wd0',
        Tags: [
          {
            name: 'Action',
            value: 'Info',
          },
        ],
      }
    );

    const asset = JSON.parse(result?.data?.Messages[0]?.Data);
    const some = [];
    asset.Orderbook.forEach((element) => {
      some.push(element.Orders);
    });

    let tokens = [];
    some.forEach((element) => {
      element.forEach((order) => {
        tokens.push(order.Token);
      });
    });

    const filteredTokens = tokens.filter(
      (token) => !excludedTokens.includes(token)
    );
    const uniqueTokens = [...new Set(filteredTokens)];

    // Convert token IDs to Arweave URLs
    const bazarTokenUrls = uniqueTokens.map(
      (token) => `https://arweave.net/${token}`
    );

    return bazarTokenUrls;
  } catch (error) {
    console.error(error);
    return [];
  }
};
