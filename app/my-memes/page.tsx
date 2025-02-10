'use client';

import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { MemeData } from '@/lib/types';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useActiveAccount } from 'thirdweb/react';
import { Triangle, Circle, Square } from 'lucide-react';
import { buttonVariants, cardVariants } from '@/styles/animations';
import XShareButton from '@/components/XShareBtn';
import MintNft from '@/components/thirdweb/MintNft';

export default function MyMemesPage() {
  const [memes, setMemes] = useState<MemeData[]>([]);
  const [loading, setLoading] = useState(true);

  const activeUserAddress = useActiveAccount()?.address;

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await axios.get(`/api/profile/${activeUserAddress}`);
        if (!response.data) throw new Error('Failed to fetch memes');
        const data = await response.data.memes;
        setMemes(data);
      } catch (error) {
        console.error('Error fetching memes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemes();
  }, [activeUserAddress]);

  return (
    <div className="p-8 min-h-[90vh] text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto container"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16 font-bold font-squid text-[#FF0B7A] text-5xl text-center"
        >
          Your Memes
        </motion.h1>

        {loading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="flex justify-center items-center space-x-4"
            >
              <Triangle className="w-12 h-12 text-[#FF0B7A]" />
              <Circle className="w-12 h-12 text-green-400" />
              <Square className="w-12 h-12 text-[#FF0B7A]" />
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
                },
              },
            }}
            className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {memes.length === 0 ? (
              <motion.div
                variants={cardVariants}
                className="col-span-full p-12 text-center squid-card"
              >
                <h3 className="mb-4 font-bold font-ibm text-[#FF0B7A] text-2xl">
                  No memes yet!
                </h3>
                <p className="mb-8 text-gray-400">
                  Start creating your own memes or save some from the gallery.
                </p>
                <Link href="/platforms">
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="px-8 py-3 rounded-lg squid-button"
                  >
                    Create Meme
                  </motion.button>
                </Link>
              </motion.div>
            ) : (
              memes?.map((meme, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className="overflow-hidden squid-card"
                >
                  <div className="p-6">
                    <div className="relative rounded-lg overflow-hidden aspect-square">
                      <Image
                        src={meme.cloudinaryUrl}
                        alt={`Meme ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <XShareButton imageUrl={meme.cloudinaryUrl} />
                      <MintNft
                        name={meme.cloudinaryUrl}
                        description={meme.cloudinaryUrl}
                        image={meme.cloudinaryUrl}
                        minted={meme.minted}
                        memeId={meme.id}
                        isMinting={false}
                        isCurrentMinting={false}
                        onMintStart={() => {}}
                        onMintComplete={() => {}}
                      />
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
