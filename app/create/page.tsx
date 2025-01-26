"use client";
import { useEffect, useState } from "react";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { verifyValidImages } from "@/lib/verify";
import usePagination from "@/hooks/usePagination";
import { Pagination } from "@/components/ui/pagination";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Loader from "@/components/loader";

const CACHE_KEY = "nfts";
const CACHE_EXPIRATION = 60 * 60 * 2; // Cache expires in 24 hours (in seconds)

export default function CreatePage() {
  const [selectedNft, setSelectedNft] = useState<number | null>(null);
  const [nfts, setNfts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setIsVerifying] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const { currentItems, currentPage, totalPages, handlePageChange } =
    usePagination({
      items: nfts,
      itemsPerPage: 9,
    });

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
    <div className="relative p-8 min-h-screen h-full text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="mb-3 font-bold text-[#FF0B7A] text-5xl">
          Select an NFT to Memeify
        </h1>
        <p className="text-[#45D62E] font-ibm text-xl ">
          Choose your favorite NFT and turn it into a hilarious meme!
        </p>
      </motion.div>

      {loading ? (
        <Loader />
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-12"
          >
            {currentItems.map((nft, index) => (
              <Link
                key={index}
                onClick={() => handleNftClick(index)}
                href={`/create/${index}?imageUrl=${encodeURIComponent(nft)}`}
              >
                <motion.div
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Background animation
      <div className="top-0 left-0 z-[-1] absolute w-full h-full overflow-hidden">
        <div className="top-1/4 left-1/4 absolute bg-[#FF0B7A] opacity-20 blur-xl rounded-full w-64 h-64 animate-blob filter mix-blend-multiply"></div>
        <div className="top-3/4 right-1/4 absolute bg-[#45D62E] opacity-20 blur-xl rounded-full w-64 h-64 animate-blob animation-delay-2000 filter mix-blend-multiply"></div>
        <div className="bottom-1/4 left-1/3 absolute bg-[#FF0B7A] opacity-20 blur-xl rounded-full w-64 h-64 animate-blob animation-delay-4000 filter mix-blend-multiply"></div>
      </div> */}
    </div>
  );
}
