// app/gallery/page.tsx

'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Triangle } from 'lucide-react';

import { buttonVariants, cardVariants } from '@/styles/animations';
import axios from 'axios';
import { toast } from 'sonner';
import type { Meme } from '@/lib/types';

const ITEMS_PER_PAGE = 9;

export default function GalleryPage() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMemes = useCallback(async () => {
    try {
      const response = await axios
        .get(`/api/memes?page=${currentPage}&limit=${ITEMS_PER_PAGE}`)
        .then((res) => res.data);
      if (!response.memes) {
        throw new Error('Failed to fetch memes');
      }

      setMemes((prev) => [...prev, ...response.memes]);
      setHasMore(response.pagination.hasMore);
      toast.success(`Fetched Memes for ${currentPage}`);
    } catch (error) {
      toast.error('Error fetching memes, Try Again');
      console.error('Error fetching memes:', error);
      return;
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchMemes();
  }, [fetchMemes]);

  return (
    <div className="min-h-[90vh] text-white p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-5xl font-bold mb-16 text-center text-[#FF0B7A] font-squid"
        >
          Meme Gallery
        </motion.h1>

        {loading && memes.length === 0 ? (
          <div className="flex justify-center items-center h-[60vh]">
            <motion.div
              animate={{
                rotate: 360,
                transition: { duration: 1, repeat: Infinity, ease: 'linear' },
              }}
            >
              <Triangle className="w-12 h-12 text-[#FF0B7A]" />
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  duration: 0.3,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {memes?.map((meme, index) => (
                <motion.div
                  key={meme.id || index}
                  variants={cardVariants}
                  whileHover="hover"
                  className="squid-card overflow-hidden will-change-transform"
                  layout
                >
                  <div className="p-6">
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                      <img
                        src={meme.cloudinaryUrl}
                        alt={`Meme ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        loading={index < 6 ? 'eager' : 'lazy'}
                      />
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <p className="text-gray-400 font-ibm">
                        By {meme.user.username || 'Anonymous'}
                      </p>
                      {/* <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="squid-button px-4 py-2 rounded-lg text-sm will-change-transform"
                      >
                        Share
                      </motion.button> */}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center"
          >
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="squid-button px-8 py-3 rounded-lg will-change-transform"
            >
              Load More
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
