'use client';
import { useCallback, useEffect, useState } from 'react';

import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { Pagination } from '@/components/ui/pagination';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import Loader from '@/components/loader';
import { NFTCache } from '@/lib/types';

const CACHE_KEY = 'nfts_cache';
const ITEMS_PER_PAGE = 9;

export default function CreatePage() {
  const [selectedNft, setSelectedNft] = useState<number | null>(null);
  const [nfts, setNfts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getCachedData = (page: number): string[] | null => {
    console.log(page)
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const data: NFTCache = JSON.parse(cached);
    const now = Date.now();
    if (now - data.timestamp > 24 * 60 * 60 * 1000) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return data.urls;
  };

  const setCacheData = (
    newUrls: string[],
    total: number,
    totalPages: number
  ) => {
    const cache: NFTCache = {
      urls: newUrls,
      timestamp: Date.now(),
      total,
      totalPages,
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  };

  const fetchPageData = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const cachedData = getCachedData(page);
      if (cachedData) {
        setNfts(cachedData);
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `/api/nfts?page=${page}&limit=${ITEMS_PER_PAGE}`
      );
      const { urls, total, totalPages } = response.data;

      setNfts((prev) => {
        const newUrls = [...prev];
        const startIdx = (page - 1) * ITEMS_PER_PAGE;
        urls.forEach((url: string, idx: number) => {
          newUrls[startIdx + idx] = url;
        });
        setCacheData(newUrls, total, totalPages);
        return newUrls;
      });

      setTotalPages(totalPages);
    } catch (error) {
      console.error('Error fetching NFTs:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handlePageChange = async (newPage: number) => {
    if (newPage === currentPage) return;
    setCurrentPage(newPage);
    await fetchPageData(newPage);
  };

  useEffect(() => {
    fetchPageData(1);
  }, [fetchPageData]);

  const currentItems = nfts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNftClick = (index: number) => {
    setSelectedNft(index);

    setTimeout(() => {
      window.location.href = `/create/${index}?imageUrl=${encodeURIComponent(
        nfts[index]
      )}`;
    }, 100);
  };

  return (
    <div className="relative p-8 h-full min-h-screen text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="mb-3 font-bold text-[#FF0B7A] text-5xl">
          Select an NFT to Memeify
        </h1>
        <p className="font-ibm text-[#45D62E] text-xl">
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
                        ? 'border-[#45D62E]'
                        : 'border-[#FF0B7A]'
                    } overflow-hidden cursor-pointer transition-all duration-300`}
                  >
                    <CardContent className="relative p-0">
                      <div className="relative w-full h-72">
                        <Image
                          src={nft || '/placeholder.svg'}
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

      {/* Background animation */}
      <div className="top-0 left-0 z-[-1] absolute w-full h-full overflow-hidden">
        <div className="top-1/4 left-1/4 absolute bg-[#FF0B7A] opacity-20 blur-xl rounded-full w-64 h-64 animate-blob filter mix-blend-multiply"></div>
        <div className="top-3/4 right-1/4 absolute bg-[#45D62E] opacity-20 blur-xl rounded-full w-64 h-64 animate-blob animation-delay-2000 filter mix-blend-multiply"></div>
        <div className="bottom-1/4 left-1/3 absolute bg-[#FF0B7A] opacity-20 blur-xl rounded-full w-64 h-64 animate-blob animation-delay-4000 filter mix-blend-multiply"></div>
      </div>
    </div>
  );
}
