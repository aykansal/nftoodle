"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { tokenList } from "@/lib/types";
import { filterImages } from "@/lib/fetch";

const CACHE_KEY = "nfts";
const CACHE_EXPIRATION = 60 * 60 * 24; // Cache expires in 24 hours (in seconds)

export default function CreatePage() {
  const [selectedNft, setSelectedNft] = useState<number | null>(null);
  const [nfts, setNfts] = useState<tokenList[]>([]);

  // Function to get cached NFTs from localStorage
  const getCachedNfts = (): tokenList[] | null => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      const { nfts, timestamp } = parsedData;
      const currentTime = Date.now() / 1000; // Current time in seconds
      if (currentTime - timestamp < CACHE_EXPIRATION) {
        return nfts; // Return cached data if it's not expired
      }
    }
    return null; // No valid cached data
  };

  useEffect(() => {
    // Fetch NFTs and cache them
    const fetchNfts = async () => {
      const cachedNfts = getCachedNfts();
      if (cachedNfts) {
        setNfts(cachedNfts);
        return;
      }

      const images = await filterImages();
      setNfts(images);

      // Cache the NFTs with the current timestamp
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          nfts: images,
          timestamp: Math.floor(Date.now() / 1000), // Current time in seconds
        })
      );
    };

    fetchNfts();
  }, []);

  const handleNftSelect = (index: number) => {
    setSelectedNft(index);
  };

  return (
    <div className="bg-gray-900 p-8 min-h-[90vh] text-white">
      <h1 className="mb-3 font-bold text-4xl text-center text-pink-500">
        Select an NFT to Memeify
      </h1>
      <p className="mb-8 text-center text-green-400 text-xl">
        Choose your favorite NFT and turn it into a hilarious meme!
      </p>

      {/* Create Meme Button */}
      <div className="flex justify-center mb-10">
        <Link
          href={
            selectedNft !== null
              ? `/create/${selectedNft}?imageUrl=${encodeURIComponent(
                  nfts[selectedNft].image_url || ""
                )}`
              : "#"
          }
          className="inline-block"
        >
          <Button
            className="bg-pink-500 hover:bg-pink-600 px-8 py-4 text-lg text-white"
            disabled={selectedNft === null}
          >
            Create Meme
          </Button>
        </Link>
      </div>

      {/* NFT Grid */}
      <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-12">
        {nfts.map((nft, index) => (
          <motion.div
            key={index} // Ensure each key is unique, using contract_address
            whileHover={{ scale: 1.05 }}
            onClick={() => handleNftSelect(index)}
          >
            <Card
              className={`bg-gray-800 border-2 ${
                selectedNft === index ? "border-green-500" : "border-pink-500"
              } overflow-hidden cursor-pointer transition-all`}
            >
              <CardContent className="relative p-0">
                <div className="relative w-full h-72">
                  {" "}
                  {/* Fixed height for consistency */}
                  <Image
                    src={nft.image_url || "/placeholder.svg"}
                    alt={nft.image_url || "NFT Image"}
                    layout="fill" // Makes image fill the container
                    objectFit="cover" // Ensures image covers the container while maintaining aspect ratio
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Footer with Animations */}
      <footer className="mt-16 text-center">
        <div className="flex justify-center items-center space-x-8">
          <div className="bg-pink-500 rounded-full w-8 h-8 animate-bounce" />
          <div className="bg-purple-500 rounded-full w-8 h-8 animate-pulse" />
          <div className="bg-green-500 rounded-full w-8 h-8 animate-spin" />
        </div>
      </footer>
    </div>
  );
}
