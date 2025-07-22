import { createWallet } from 'thirdweb/wallets';
import { createThirdwebClient, defineChain } from 'thirdweb';

const clientKey = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

export const chainConfig = {
  CORE: {
    testnetChainId: 1114,
    mainnetChainId: 1116,
    testnetRpcUrl: "https://rpc.test2.btcs.network",
    mainnetRpcUrl: "https://rpc.coredao.org",
  },
  EDU: {
    testnetChainId: 656476
  }
}

export const coreChain = defineChain(chainConfig.CORE.testnetChainId);
export const eduChain = defineChain(chainConfig.EDU.testnetChainId);
export const wallet = createWallet('io.metamask');
export const client = createThirdwebClient({
  clientId: `${clientKey}`,
});
