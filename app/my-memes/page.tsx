"use client";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { MemeData } from "@/lib/types";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";
import { Triangle, Circle, Square } from "lucide-react";
import { buttonVariants, cardVariants } from "@/styles/animations";

export default function MyMemesPage() {
  const [memes, setMemes] = useState<MemeData[]>([]);
  const [loading, setLoading] = useState(true);

  const activeUserAddress = useActiveAccount()?.address;

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await axios.get("/api/profile?address=" + activeUserAddress);
        if (!response.data) throw new Error("Failed to fetch memes");
        const data = await response.data.memes;
        console.log(data);
        setMemes(data);
      } catch (error) {
        console.error("Error fetching memes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemes();
  }, [activeUserAddress]);

  return (
    <div className="min-h-[90vh] text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-5xl font-bold mb-16 text-center text-[#FF0B7A] font-squid"
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
                ease: "linear",
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {memes.length === 0 ? (
              <motion.div
                variants={cardVariants}
                className="squid-card col-span-full p-12 text-center"
              >
                <h3 className="text-2xl font-bold text-[#FF0B7A] mb-4 font-ibm">
                  No memes yet!
                </h3>
                <p className="text-gray-400 mb-8">
                  Start creating your own memes or save some from the gallery.
                </p>
                <Link href="/platforms">
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="squid-button px-8 py-3 rounded-lg"
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
                  className="squid-card overflow-hidden"
                >
                  <div className="p-6">
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={meme.cloudinaryUrl}
                        alt={`Meme ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <p className="text-gray-400 font-ibm">By {meme.userAddress.substring(0, 6) + '...'}</p>
                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="squid-button px-4 py-2 rounded-lg text-sm"
                      >
                        Share
                      </motion.button>
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
