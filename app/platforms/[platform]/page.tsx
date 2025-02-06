'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import usePagination from '@/hooks/usePagination';
import { Triangle, Circle, Square } from 'lucide-react';
import { verifyValidImages } from '@/lib/verify';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       type: 'spring',
//       stiffness: 100,
//     },
//   },
// };

const cardVariants = {
  initial: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  hover: { scale: 1.05 },
};

const buttonVariants = {
  initial: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

export default function PlatformPage() {
  const router = useRouter();
  const { platform } = useParams();
  const [nfts, setNfts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  const { currentItems, currentPage, handlePageChange, totalPages } =
    usePagination({
      items: nfts,
      itemsPerPage: 12,
    });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const response = await fetch(`/api/nfts/${platform}`);
        if (!response.ok) throw new Error('Failed to fetch NFTs');
        const data = await response.json();
        const verifiedUrls = await verifyValidImages(data.urls);
        setNfts(verifiedUrls);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch NFTs. Please try again later.',
          variant: 'destructive',
        });
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [platform, toast]);

  const handleNftClick = (imageUrl: string) => {
    const encodedUrl = encodeURIComponent(imageUrl);
    router.push(`/create/meme?imageUrl=${encodedUrl}`);
  };

  const platformTitle =
    platform?.toString().charAt(0).toUpperCase() +
    platform?.toString().slice(1);

  return (
    <div className="relative min-h-[90vh] text-white overflow-hidden">
      <AnimatePresence>
        {!isMounted && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-50 absolute inset-0 flex flex-col justify-center items-center backdrop-blur-sm"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                transition: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'linear',
                },
              }}
              className="flex justify-center items-center space-x-4 mb-4"
            >
              <Triangle className="w-12 h-12 text-[#FF0B7A]" />
              <Circle className="w-12 h-12 text-green-400" />
              <Square className="w-12 h-12 text-[#FF0B7A]" />
            </motion.div>
            <p className="text-white text-xl font-ibm">Loading...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-16">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl font-bold text-[#FF0B7A] font-ibm"
          >
            {platformTitle} NFTs
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="border-2 border-gray-700 hover:border-pink-500 bg-gray-800/50 backdrop-blur-sm text-white px-6 py-2 text-lg"
            >
              Back to Platforms
            </Button>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="wait">
            {loading
              ? Array.from({ length: 12 }).map((_, i) => (
                  <Card
                    key={`skeleton-${i}`}
                    className="bg-gray-800/50 border-2 border-gray-700 p-4 aspect-square backdrop-blur-sm"
                  >
                    <Skeleton className="w-full h-full bg-gray-700/50" />
                  </Card>
                ))
              : currentItems.map((nft, index) => (
                  <motion.div
                    key={`${nft}-${index}`}
                    variants={cardVariants}
                    initial="initial"
                    animate="visible"
                    whileHover="hover"
                    className="squid-card p-4 cursor-pointer"
                    onClick={() => handleNftClick(nft)}
                  >
                    <Image
                      src={nft}
                      alt="NFT"
                      width={400}
                      height={400}
                      className="w-full h-auto rounded-lg"
                    />
                  </motion.div>
                ))}
          </AnimatePresence>
        </motion.div>

        {!loading && totalPages > 1 && (
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              variants={buttonVariants}
              initial="initial"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="squid-button px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </motion.button>
            <span className="flex items-center px-6 text-lg font-ibm">
              Page {currentPage} of {totalPages}
            </span>
            <motion.button
              variants={buttonVariants}
              initial="initial"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="squid-button px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
