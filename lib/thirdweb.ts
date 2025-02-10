import { createWallet } from 'thirdweb/wallets';
import { createThirdwebClient, defineChain } from 'thirdweb';

const clientKey = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

export const chain = defineChain(656476);
export const wallet = createWallet('io.metamask');
export const client = createThirdwebClient({
  clientId: `${clientKey}`,
});
