"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { verifyValidImages } from "@/lib/verify";
import { Triangle, Circle, Square } from "lucide-react";

const CACHE_KEY = "nfts";
const CACHE_EXPIRATION = 60 * 60 * 24; // Cache expires in 24 hours (in seconds)

export default function CreatePage() {
  const [selectedNft, setSelectedNft] = useState<number | null>(null);
  const [nfts, setNfts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [, setIsVerifying] = useState(false);

  const getCachedNfts = (): string[] | null => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      const { nfts, timestamp } = parsedData;
      const currentTime = Date.now() / 1000;
      if (currentTime - timestamp < CACHE_EXPIRATION) {
        return nfts;
      }
    }
    return null;
  };

  useEffect(() => {
    const fetchNfts = async () => {
      setLoading(true);
      const cachedNfts = getCachedNfts();
      if (cachedNfts) {
        setNfts(cachedNfts);
        setLoading(false);
        return;
      }

      try {
        const fetchedImages = await axios
          .get("/api/nfts")
          .then((res) => res.data);
        console.log(fetchedImages);
        setIsVerifying(true);
        const validImages = await verifyValidImages(fetchedImages);
        console.log(validImages);
        setNfts(validImages);
        setIsVerifying(false);

        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            nfts: validImages,
            timestamp: Math.floor(Date.now() / 1000),
          })
        );
      } catch (error) {
        console.error("Failed to fetch NFTs:", error);
      } finally {
        setIsVerifying(false);
        setLoading(false);
      }
    };

    fetchNfts();
  }, []);

  const handleNftSelect = (index: number) => {
    setSelectedNft(index);
  };

  return (
    <div className="relative bg-[#0A0A0A] p-8 min-h-screen text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="mb-3 font-bold text-[#FF0B7A] text-5xl">
          Select an NFT to Memeify
        </h1>
        <p className="text-[#45D62E] text-xl">
          Choose your favorite NFT and turn it into a hilarious meme!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex justify-center mb-10"
      >
        <Button
          className="bg-[#FF0B7A] hover:bg-[#FF3B9A] disabled:opacity-50 px-8 py-4 font-bold text-lg transform transition-all duration-300 disabled:cursor-not-allowed ease-in-out hover:scale-105"
          onClick={() => {
            router.push(
              `/create/${selectedNft}?imageUrl=${encodeURIComponent(
                selectedNft !== null ? nfts[selectedNft] : ""
              )}`
            );
          }}
          disabled={selectedNft === null}
        >
          Create Meme
        </Button>
      </motion.div>

      {loading ? (
        <div>
          <div className="flex justify-center items-center space-x-4">
            <Triangle className="w-12 h-12 text-[#FF0B7A] animate-spin" />
            <Circle className="w-12 h-12 text-[#45D62E] animate-pulse" />
            <Square className="w-12 h-12 text-[#FF0B7A] animate-bounce" />
          </div>
          {/* {isVerifying && <p>Verifying images...</p>} */}
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-12"
          >
            {nfts.map((nft, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNftSelect(index)}
              >
                <Card
                  className={`bg-gray-800 border-2 ${
                    selectedNft === index
                      ? "border-[#45D62E]"
                      : "border-[#FF0B7A]"
                  } overflow-hidden cursor-pointer transition-all duration-300`}
                >
                  <CardContent className="relative p-0">
                    <div className="relative w-full h-72">
                      <Image
                        src={nft || "/placeholder.svg"}
                        alt={`NFT ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        className="w-full h-full object-cover"
                        priority
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      <footer className="mt-16 text-center">
        <div className="flex justify-center items-center space-x-8">
          <Triangle className="w-8 h-8 text-[#FF0B7A] animate-bounce" />
          <Circle className="w-8 h-8 text-[#45D62E] animate-pulse" />
          <Square className="w-8 h-8 text-[#FF0B7A] animate-spin" />
        </div>
      </footer>

      {/* Background animation */}
      <div className="top-0 left-0 z-[-1] absolute w-full h-full overflow-hidden">
        <div className="top-1/4 left-1/4 absolute bg-[#FF0B7A] opacity-20 blur-xl rounded-full w-64 h-64 animate-blob filter mix-blend-multiply"></div>
        <div className="top-3/4 right-1/4 absolute bg-[#45D62E] opacity-20 blur-xl rounded-full w-64 h-64 animate-blob animation-delay-2000 filter mix-blend-multiply"></div>
        <div className="bottom-1/4 left-1/3 absolute bg-[#FF0B7A] opacity-20 blur-xl rounded-full w-64 h-64 animate-blob animation-delay-4000 filter mix-blend-multiply"></div>
      </div>
    </div>
  );
}
