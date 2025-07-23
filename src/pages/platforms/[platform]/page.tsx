;

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
// import usePagination from '@/hooks/usePagination';
import { Triangle, Circle, Square } from "lucide-react";
// import { verifyValidImages } from '@/lib/verify';
import axios from "axios";
import { useNavigate, useParams } from "react-router";

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

export default function MainPlatformPage() {
  const navigate = useNavigate();
  const { platform } = useParams();
  const [nfts, setNfts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [, setTotal] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/nfts/${platform}?page=${currentPage}&limit=12`
        );
        if (!response.data) throw new Error("Failed to fetch NFTs");
        const data = await response.data;
        setNfts(data.urls);
        setTotalPages(data.totalPages);
        setTotal(data.total);
      } catch (error) {
        console.log(`err in fetching from platform ${platform}: `, error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [platform, currentPage]);

  const handleNftClick = (imageUrl: string) => {
    const encodedUrl = encodeURIComponent(imageUrl);
    navigate(`/create/meme?imageUrl=${encodedUrl}`);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setLoading(true);
  };

  // const platformTitle =
  // platform?.toString().charAt(0).toUpperCase() +
  // platform?.toString().slice(1);

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
                  ease: "linear",
                },
              }}
              className="flex justify-center items-center space-x-4 mb-4"
            >
              <Triangle className="w-12 h-12 text-[#FF0B7A]" />
              <Circle className="w-12 h-12 text-green-400" />
              <Square className="w-12 h-12 text-[#FF0B7A]" />
            </motion.div>
            <p className="font-ibm text-white text-xl">Loading...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-20 container">
        <div className="flex justify-between items-center mb-16">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-bold font-ibm text-[#FF0B7A] text-5xl"
          >
            {platform} NFTs
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="border-2 border-gray-700 hover:border-pink-500 bg-gray-800/50 backdrop-blur-sm px-6 py-2 text-lg text-white"
            >
              Back to Platforms
            </Button>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="wait">
            {loading
              ? Array.from({ length: 12 }).map((_, i) => (
                  <Card
                    key={`skeleton-${i}`}
                    className="border-2 border-gray-700 bg-gray-800/50 backdrop-blur-sm p-4 aspect-square"
                  >
                    <Skeleton className="bg-gray-700/50 w-full h-full" />
                  </Card>
                ))
              : nfts?.map((nft, index) => (
                  <motion.div
                    key={`${nft}-${index}`}
                    variants={cardVariants}
                    initial="initial"
                    animate="visible"
                    whileHover="hover"
                    className="p-4 cursor-pointer squid-card"
                    onClick={() => handleNftClick(nft)}
                  >
                    <div className="relative rounded-lg overflow-hidden aspect-square">
                      <img
                        src={nft}
                        alt="NFT"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
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
              className="disabled:opacity-50 px-6 py-2 rounded-lg disabled:cursor-not-allowed squid-button"
            >
              Previous
            </motion.button>
            <span className="flex items-center px-6 font-ibm text-lg">
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
              className="disabled:opacity-50 px-6 py-2 rounded-lg disabled:cursor-not-allowed squid-button"
            >
              Next
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
