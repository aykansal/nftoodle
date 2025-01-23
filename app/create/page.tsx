// app/create/page.tsx

"use client";
import { useEffect, useState } from "react";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Triangle, Circle, Square } from "lucide-react";

import { verifyValidImages } from "@/lib/verify";

import { Card, CardContent } from "@/components/ui/card";

const CACHE_KEY = "nfts";
const CACHE_EXPIRATION = 60 * 60 * 2; // Cache expires in 24 hours (in seconds)

export default function CreatePage() {
  const [selectedNft, setSelectedNft] = useState<number | null>(null);
  const [nfts, setNfts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setIsVerifying] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

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
        setIsVerifying(true);
        const validImages = await verifyValidImages(fetchedImages);
        setNfts(validImages);
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

  const handleNftClick = (index: number) => {
    if (isRedirecting) return;
    setSelectedNft(index);
    setIsRedirecting(true);

    setTimeout(() => {
      window.location.href = `/create/${index}?imageUrl=${encodeURIComponent(
        nfts[index]
      )}`;
    }, 100);
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
        <p className="text-[#45D62E] text-xl font-ibm">
          Choose your favorite NFT and turn it into a hilarious meme!
        </p>
      </motion.div>

      {loading ? (
        <div>
          <div className="flex justify-center items-center space-x-4">
            <Triangle className="w-12 h-12 text-[#FF0B7A] animate-spin" />
            <Circle className="w-12 h-12 text-[#45D62E] animate-pulse" />
            <Square className="w-12 h-12 text-[#FF0B7A] animate-bounce" />
          </div>
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
              <Link
                key={index}
                onClick={() => handleNftClick(index)}
                href={`/create/${index}?imageUrl=${encodeURIComponent(nft)}`}
              >
                <motion.div
                  // onClick={() => setSelectedNft(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
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
              </Link>
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
