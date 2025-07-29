import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Zap, Star, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useActiveAccount } from "thirdweb/react";
import axios from "axios";
import { Badge } from "../ui/badge";

interface Species {
  name: string;
  description: string;
  rarity: string;
}

interface TraitOptions {
  colors: string[];
  patterns: string[];
  accessories: string[];
}

interface MintResult {
  success: boolean;
  tokenId: number;
  transactionHash: string;
  gameNft: any;
}

const GameNFTMinter: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [species, setSpecies] = useState<string[]>([]);
  const [traitOptions, setTraitOptions] = useState<TraitOptions | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState<string>("");
  const [mintPrice, setMintPrice] = useState<string>("0.001");
  const [lastMintedNFT, setLastMintedNFT] = useState(null);

  const account = useActiveAccount();

  useEffect(() => {
    loadSpeciesAndTraits();
  }, []);

  const loadSpeciesAndTraits = async () => {
    setIsLoading(true);
    try {
      console.log("🔄 Loading species and trait options...");

      const [speciesResponse, traitsResponse] = await Promise.all([
        axios.get("/api/game-nft/species"),
        axios.get("/api/game-nft/traits"),
      ]);

      setSpecies(speciesResponse.data.species);
      setTraitOptions(traitsResponse.data);

      console.log("✅ Loaded species and traits:", {
        species: speciesResponse.data.species,
        traits: traitsResponse.data,
      });
    } catch (error) {
      console.error("❌ Error loading species and traits:", error);
      toast.error("Failed to load minting options");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMint = async () => {
    if (!account?.address) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsMinting(true);
    try {
      console.log(
        `🎮 Minting Game NFT for ${account.address}, species: ${
          selectedSpecies || "random"
        }`
      );

      const response = await axios.post("/api/game-nft/mint", {
        userWallet: account.address,
        species: selectedSpecies || undefined,
      });

      const result: MintResult = response.data;

      if (result.success) {
        setLastMintedNFT(result.gameNft);
        toast.success(
          `🎉 Game NFT minted successfully! Token ID: ${result.tokenId}`
        );
        console.log("✅ Minting successful:", result);
      } else {
        throw new Error("Minting failed");
      }
    } catch (error: any) {
      console.error("❌ Minting error:", error);
      const errorMessage =
        error.response?.data?.error || "Failed to mint Game NFT";
      toast.error(errorMessage);
    } finally {
      setIsMinting(false);
    }
  };

  const getRarityColor = (rarity: number) => {
    if (rarity >= 95) return "bg-yellow-500"; // Legendary
    if (rarity >= 80) return "bg-purple-500"; // Epic
    if (rarity >= 60) return "bg-blue-500"; // Rare
    if (rarity >= 30) return "bg-green-500"; // Uncommon
    return "bg-gray-500"; // Common
  };

  const getRarityName = (rarity: number) => {
    if (rarity >= 95) return "Legendary";
    if (rarity >= 80) return "Epic";
    if (rarity >= 60) return "Rare";
    if (rarity >= 30) return "Uncommon";
    return "Common";
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading minting options...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Minting Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-yellow-500" />
            <span>Mint Game NFT</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Species Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Choose Species (Optional)
            </label>
            {/* <Select value={selectedSpecies} onValueChange={setSelectedSpecies}>
              <SelectTrigger>
                <SelectValue placeholder="Random species (recommended)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Random Species</SelectItem>
                {species &&
                  species.length > 0 &&
                  species?.map((speciesName) => (
                    <SelectItem key={speciesName} value={speciesName}>
                      {speciesName}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select> */}
          </div>

          {/* Trait Preview */}
          {traitOptions && (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Available Traits (Randomized)
              </label>
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div>
                  <p className="font-medium text-gray-600 mb-1">Colors</p>
                  <div className="flex flex-wrap gap-1">
                    {/* {traitOptions.colors.slice(0, 4).map((color) => (
                      <Badge key={color} variant="outline" className="text-xs">
                        {color}
                      </Badge>
                    ))} */}
                    {traitOptions && traitOptions.colors && traitOptions.colors.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{traitOptions.colors.length - 4}
                      </Badge>
                    )}
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-600 mb-1">Patterns</p>
                  <div className="flex flex-wrap gap-1">
                    { traitOptions && traitOptions.patterns && traitOptions.patterns.slice(0, 4).map((pattern) => (
                      <Badge
                        key={pattern}
                        variant="outline"
                        className="text-xs"
                      >
                        {pattern}
                      </Badge>
                    ))}
                    {traitOptions && traitOptions.patterns && traitOptions.patterns.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{traitOptions.patterns.length - 4}
                      </Badge>
                    )}
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-600 mb-1">Accessories</p>
                  <div className="flex flex-wrap gap-1">
                    {traitOptions && traitOptions.accessories && traitOptions.accessories.slice(0, 4).map((accessory) => (
                      <Badge
                        key={accessory}
                        variant="outline"
                        className="text-xs"
                      >
                        {accessory}
                      </Badge>
                    ))}
                    {traitOptions && traitOptions.accessories && traitOptions.accessories.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{traitOptions.accessories.length - 4}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Minting Info */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Mint Price:</span>
              <span className="text-sm">{mintPrice} CORE</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Network:</span>
              <span className="text-sm">Core Blockchain</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Rarity:</span>
              <span className="text-sm">Randomized (1-100)</span>
            </div>
          </div>

          {/* Mint Button */}
          <Button
            onClick={handleMint}
            disabled={!account?.address || isMinting}
            className="w-full"
            size="lg"
          >
            {isMinting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Minting Game NFT...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                Mint Game NFT
              </>
            )}
          </Button>

          {!account?.address && (
            <p className="text-sm text-gray-500 text-center">
              Connect your Core wallet to mint Game NFTs
            </p>
          )}
        </CardContent>
      </Card>

      {/* Last Minted NFT */}
      {lastMintedNFT && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>Your New Game NFT</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Token ID</p>
                <p className="text-lg font-bold">#{lastMintedNFT.tokenId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Species</p>
                <p className="text-lg font-bold">
                  {lastMintedNFT.stats.species}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Level</p>
                <p className="text-lg font-bold">{lastMintedNFT.stats.level}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Rarity</p>
                <Badge className={getRarityColor(lastMintedNFT.stats.rarity)}>
                  {getRarityName(lastMintedNFT.stats.rarity)}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Stats</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Condition: {lastMintedNFT.stats.condition}/100</div>
                <div>Mood: {lastMintedNFT.stats.mood}/100</div>
                <div>Experience: {lastMintedNFT.stats.experience}</div>
                <div>Evolution Stage: {lastMintedNFT.stats.evolutionStage}</div>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              View NFT Details
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GameNFTMinter;
