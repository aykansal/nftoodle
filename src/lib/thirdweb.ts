import { createWallet } from 'thirdweb/wallets';
import { createThirdwebClient, defineChain } from 'thirdweb';

// Environment variables
const clientKey = import.meta.env.VITE_THIRDWEB_CLIENT_ID;
const CLIENT_ID = "aa99b0e9769d2262d120e7aec4ec7a94";

// Legacy contract address (for existing meme NFTs)
const CONTRACT_ADDRESS = "0x958dE12282CB6986720661B781aFEbC69d976265";

// Game NFT contract address (to be set after deployment)
const GAME_NFT_CONTRACT_ADDRESS = import.meta.env.VITE_GAME_NFT_CONTRACT_ADDRESS || "";

export const chainConfig = {
  CORE: {
    testnetChainId: 1114,
    mainnetChainId: 1116,
    testnetRpcUrl: "https://rpc.test2.btcs.network",
    mainnetRpcUrl: "https://rpc.coredao.org",
  }
}

// Define Core Blockchain chains with proper configuration
const coreMainnet = defineChain({
  id: chainConfig.CORE.mainnetChainId,
  name: 'Core Blockchain Mainnet',
  nativeCurrency: {
    name: 'Core',
    symbol: 'CORE',
    decimals: 18,
  },
  rpc: chainConfig.CORE.mainnetRpcUrl,
  blockExplorers: [
    {
      name: 'CoreScan',
      url: 'https://scan.coredao.org',
    },
  ],
});

const coreTestnet = defineChain({
  id: chainConfig.CORE.testnetChainId,
  name: 'Core Blockchain Testnet',
  nativeCurrency: {
    name: 'Core',
    symbol: 'tCORE',
    decimals: 18,
  },
  rpc: chainConfig.CORE.testnetRpcUrl,
  blockExplorers: [
    {
      name: 'CoreScan Testnet',
      url: 'https://scan.test.btcs.network',
    },
  ],
});

// Get the appropriate chain based on environment
export function getChain() {
  const isProduction = import.meta.env.PROD;
  return isProduction ? coreMainnet : coreTestnet;
}

// Legacy chain config (keeping for backwards compatibility)
const coreChain = defineChain(chainConfig.CORE.testnetChainId);

// Wallet configuration
const wallet = createWallet('io.metamask');

// Thirdweb client
const thirdwebClient = createThirdwebClient({
  clientId: clientKey || CLIENT_ID,
});

// Helper functions
export function isGameNFTContractConfigured(): boolean {
  return Boolean(GAME_NFT_CONTRACT_ADDRESS);
}

export function getGameNFTContractAddress(): string {
  if (!GAME_NFT_CONTRACT_ADDRESS) {
    throw new Error('Game NFT contract address not configured. Please set VITE_GAME_NFT_CONTRACT_ADDRESS environment variable.');
  }
  return GAME_NFT_CONTRACT_ADDRESS;
}

export {
  wallet,
  coreChain,
  coreMainnet,
  coreTestnet,
  CLIENT_ID,
  thirdwebClient,
  CONTRACT_ADDRESS,
  GAME_NFT_CONTRACT_ADDRESS,
}