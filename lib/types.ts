// User Interface (Based on the Prisma model)
export interface User {
  id: number;
  userWallet: string;
  memes: Meme[];  // Related memes for the user
  createdAt: Date;
}

export interface tokenList {
  image_url: string;
}

// Meme Interface (Based on the Prisma model)
export interface Meme {
  id: number;
  cloudinaryUrl: string;
  originalImage: string;
  createdAt: Date;
  user: User; // User associated with this meme
  userWallet: string;
  minted: boolean; // Optional field for minted status
  txnhash?: string; // Optional field for transaction hash
}

// NFT Interface
export interface Nft {
  blockchain: string;
  chain_id: number;
  contract_address: string;
  external_url: string;
  image_url: string;
  marketplaces: string;
}

// Updated Cloudinary Upload Response Interface (from the schema)
export interface CloudinaryUploadResponse {
  asset_id: string;
  public_id: string;
  format: string;
  version: number;
  resource_type: string;
  type: string;
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  asset_folder: string;
  display_name: string;
  context: {
    custom: {
      accountAddress: string;
    };
  };
  url: string;
  secure_url: string;
}

export interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  version: number;
  width: number;
  height: number;
  format: string;
  created_at: string;
  resource_type: string;
  tags: string[];
  bytes: number;
  type: string;
  url: string;
}


// Updated Meme Generator Interface
export interface MemeGeneratorProps {
  defaultImage: string;
}

// OpenSea NFT Collection Types
export interface Media {
  gateway: string;
  thumbnail: string;
  raw: string;
  format: string;
  bytes: number;
}

export interface TokenMetadata {
  tokenType: string;
}

export interface TokenId {
  tokenId: string;
  tokenMetadata: TokenMetadata;
}

export interface TokenUri {
  gateway: string;
  raw: string;
}

export interface Attribute {
  value: string;
  trait_type: string;
}

export interface Metadata {
  name: string;
  description: string;
  image: string;
  attributes: Attribute[];
}

export interface ContractMetadata {
  name: string;
  symbol: string;
  tokenType: string;
  contractDeployer: string;
  deployedBlockNumber: number;
  openSea: OpenSeaMetadata;
  lastIngestedAt: string;
}

export interface OpenSeaMetadata {
  floorPrice: number;
  collectionName: string;
  collectionSlug: string;
  safelistRequestStatus: string;
  imageUrl: string;
  description: string;
  twitterUsername: string;
  discordUrl: string;
  bannerImageUrl: string;
}

export interface Contract {
  address: string;
}

export interface NFTItem {
  contract: Contract;
  id: TokenId;
  title: string;
  description: string;
  tokenUri: TokenUri;
  media: Media[];
  metadata: Metadata;
  timeLastUpdated: string;
  contractMetadata: ContractMetadata;
}

// Game Card Interface (For matching game)
export interface GameCard {
  id: number;
  cloudinaryUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
}

// Platform Enum (Reflecting the Prisma Enum)
export enum Platforms {
  bazar = "bazar",
  opensea = "opensea",
  unleash = "unleash",
}
