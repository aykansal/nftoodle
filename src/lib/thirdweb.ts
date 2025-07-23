import { createWallet } from 'thirdweb/wallets';
import { createThirdwebClient, defineChain } from 'thirdweb';

// const CONTRACT_ADDRESS_OLD = "0xaC434dc0061aD90B45415e92b160D7Bbaa21F5db";

const clientKey = import.meta.env.VITE_THIRDWEB_CLIENT_ID;
const CLIENT_ID = "aa99b0e9769d2262d120e7aec4ec7a94";
const CONTRACT_ADDRESS = "0x958dE12282CB6986720661B781aFEbC69d976265";

export const chainConfig = {
  CORE: {
    testnetChainId: 1114,
    mainnetChainId: 1116,
    testnetRpcUrl: "https://rpc.test2.btcs.network",
    mainnetRpcUrl: "https://rpc.coredao.org",
  }
}

const coreChain = defineChain(chainConfig.CORE.testnetChainId);
const wallet = createWallet('io.metamask');
const thirdwebClient = createThirdwebClient({
  clientId: `${clientKey}`,
});


export {
  wallet,
  coreChain,
  CLIENT_ID,
  thirdwebClient,
  CONTRACT_ADDRESS,
}