"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Triangle, Circle, Square } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { CloudinaryUploadResponse } from "@/lib/types";
import XShareButton from "@/components/XShareBtn";

export default function Showcase() {
  const [hoveredMeme, setHoveredMeme] = useState<number | null>(null);
  const [memes, setMemes] = useState<CloudinaryUploadResponse[]>([]);

  React.useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await axios.get("/api/memes");
        const data = await response.data;
        setMemes(data);
      } catch (error) {
        console.error("Error fetching memes:", error);
      }
    };

    fetchMemes();
  }, []);

  return (
    <div className="bg-gray-900 p-8 min-h-screen text-white">
      <header className="mb-12 text-center">
        <h1 className="mb-4 font-bold text-4xl text-pink-500">
          Squid Meme Showcase
        </h1>
        <p className="text-green-400 text-xl">
          Discover and Enjoy Squid Game-Inspired Memes!
        </p>
      </header>

      <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {memes?.map((meme, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setHoveredMeme(index)}
            onHoverEnd={() => setHoveredMeme(null)}
          >
            <Card className="border-2 border-pink-500 bg-gray-800 overflow-hidden">
              <CardContent className="relative p-0">
                <Image
                  src={meme.url}
                  alt={meme.display_name}
                  width={200}
                  height={200}
                  className="w-full h-auto object-cover"
                />
                {hoveredMeme === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50"
                  >
                    <p className="font-bold text-lg text-white">
                      {/* {meme.display_name} */}
                      <XShareButton imageUrl={meme.secure_url} />
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <footer className="mt-16 text-center">
        <p className="mb-4 text-green-400 text-lg">
          Join the game, share the laughter!
        </p>
        <div className="flex justify-center items-center space-x-8">
          <Triangle className="w-8 h-8 text-pink-500 animate-bounce" />
          <Circle className="w-8 h-8 text-purple-500 animate-pulse" />
          <Square className="w-8 h-8 text-green-500 animate-spin" />
        </div>
      </footer>
    </div>
  );
}
