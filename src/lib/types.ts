// User Interface (Based on the Prisma model)
export interface User {
  id: number;
  userWallet: string;
  memes: Meme[];  // Related memes for the user
  createdAt: Date;
  username:string;
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
export const Platforms = {
  bazar: "bazar",
  opensea: "opensea",
  unleash: "unleash",
} as const;

export type PlatformType = typeof Platforms[keyof typeof Platforms];

export interface NFTCache {
  urls: string[];
  timestamp: number;
  totalPages: number;
  total: number;
}

export interface MemeCard {
  id: number;
  imageUrl: string;
  power: number;
  defense: number;
  special: number;
  isPlayed: boolean;
}

export interface MintNftData {
  name: string;
  description: string;
  image: string;
  minted: boolean;
  memeId: number;
  isMinting: boolean;
  isCurrentMinting: boolean;
  onMintStart: () => void;
  onMintComplete: (txStatus: boolean) => void;
}

// Game NFT Types (matching backend)
export interface GameNFTStats {
  level: number;
  experience: number;
  condition: number;
  mood: number;
  lastInteraction: number;
  evolutionStage: number;
  breedingCooldown: number;
  species: string;
  rarity: number;
  baseStats: number[]; // [strength, intelligence, agility, luck, charisma]
  visualTraits: string[]; // Visual characteristics
}

export interface GameNFT {
  id: number;
  tokenId: number;
  contractAddress: string;
  ownerAddress: string;
  stats: GameNFTStats;
  createdAt: string;
  updatedAt: string;
}

export interface NFTInteraction {
  id: number;
  tokenId: number;
  actionType: ActionType;
  timestamp: number;
  statChanges: {
    experience?: number;
    condition?: number;
    mood?: number;
    level?: number;
  };
}

export interface EvolutionHistory {
  id: number;
  tokenId: number;
  fromStage: number;
  toStage: number;
  timestamp: number;
  triggerConditions: {
    level: number;
    experience: number;
    interactions: number;
  };
}

export interface BreedingRecord {
  id: number;
  parent1TokenId: number;
  parent2TokenId: number;
  offspringTokenId: number;
  timestamp: number;
  inheritedTraits: {
    fromParent1: string[];
    fromParent2: string[];
    mutations: string[];
  };
}

export interface UserRewards {
  id: number;
  userWallet: string;
  totalXP: number;
  currentStreak: number;
  lastInteractionDate: string;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  rewardXP: number;
  unlockedAt: string;
}

// Enums
export enum ActionType {
  FEED = 'FEED',
  TRAIN = 'TRAIN',
  PLAY = 'PLAY',
  REST = 'REST',
  CLEAN = 'CLEAN'
}

export enum EvolutionStage {
  EGG = 0,
  BABY = 1,
  JUVENILE = 2,
  ADULT = 3,
  ELDER = 4,
  LEGENDARY = 5
}

// API Request/Response Types
export interface MintGameNFTRequest {
  userWallet: string;
  species?: string;
  paymentTxHash?: string;
}

export interface InteractWithNFTRequest {
  tokenId: number;
  actionType: ActionType;
  userWallet: string;
}

export interface BreedNFTsRequest {
  parent1TokenId: number;
  parent2TokenId: number;
  userWallet: string;
}

export interface GameNFTResponse {
  tokenId: number;
  stats: GameNFTStats;
  metadata: {
    name: string;
    description: string;
    image: string;
    attributes: Array<{
      trait_type: string;
      value: string | number;
    }>;
  };
  evolutionHistory: EvolutionHistory[];
  lastInteractions: NFTInteraction[];
}

export interface MarketplaceFilterRequest {
  species?: string;
  evolutionStage?: EvolutionStage;
  minLevel?: number;
  maxLevel?: number;
  minRarity?: number;
  maxRarity?: number;
  traits?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  page?: number;
  limit?: number;
  sortBy?: 'level' | 'rarity' | 'price' | 'lastInteraction';
  sortOrder?: 'asc' | 'desc';
}

// Component Props Types
export interface GameNFTCardProps {
  nft: GameNFT;
  onInteract?: (tokenId: number, action: ActionType) => void;
  onEvolve?: (tokenId: number) => void;
  showActions?: boolean;
  className?: string;
}

export interface InteractionPanelProps {
  tokenId: number;
  stats: GameNFTStats;
  onInteract: (action: ActionType) => void;
  disabled?: boolean;
}

export interface StatsDisplayProps {
  stats: GameNFTStats;
  showEvolutionProgress?: boolean;
  className?: string;
}

export interface EvolutionTimelineProps {
  evolutionHistory: EvolutionHistory[];
  currentStage: number;
  className?: string;
}
