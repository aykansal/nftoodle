export interface nft {
  blockchain: string;
  chain_id: number;
  contract_address: string;
  external_url: string;
  image_url: string;
  marketplaces: string;
}

export interface MemeData {
  cloudinaryUrl: string;
  createdAt: string; // ISO 8601 format string
  id: number;
  minted: boolean;
  userAddress: string; // Ethereum address in string format
}

export interface tokenList {
  image_url: string;
}

export interface MemeGeneratorProps {
  defaultImage: string;
}

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

// opensea nft collectons types
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
