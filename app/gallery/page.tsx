// app/gallery/page.tsx

"use client";
import React, { useState } from "react";

import Image from "next/image";
import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import XShareButton from "@/components/XShareBtn";
import usePagination from "@/hooks/usePagination";
import { Pagination } from "@/components/ui/pagination";
import Loader from "@/components/loader";

interface memes {
  cloudinaryUrl : string;
  id: number;
}

export default function Showcase() {
  const [hoveredMeme, setHoveredMeme] = useState<number | null>(null);
  const [memes, setMemes] = useState<memes[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const { currentItems, currentPage, totalPages, handlePageChange } =
    usePagination({
      items: memes,
      itemsPerPage: 9,
    });

  React.useEffect(() => {
    const fetchMemes = async () => {
      try {
        setIsFetching(true);
        const response = await axios.get("/api/memes");
        const data = response.data;
        setMemes(data);
      } catch (error) {
        console.error("Error fetching memes:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchMemes();
  }, []);


  return (
    <div className="p-8 min-h-full text-white">
      <header className="mb-12 text-center">
        <h1 className="mb-4 font-bold text-4xl text-pink-500">
          Squid Meme Showcase
        </h1>
        <p className="text-green-400 text-xl font-ibm">
          Discover and Enjoy Squid Game-Inspired Memes!
        </p>
      </header>

      {isFetching ? (
       <Loader/>
      ) : (
        <>
          <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {currentItems?.map((meme) => (
              <motion.div
                key={meme.id}
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setHoveredMeme(meme.id)}
                onHoverEnd={() => setHoveredMeme(null)}
              >
                <Card className="border-2 border-pink-500 bg-gray-800 overflow-hidden">
                  <CardContent className="relative p-0">
                    <Image
                      src={meme.cloudinaryUrl}
                      alt={meme.cloudinaryUrl}
                      width={200}
                      height={200}
                      className="w-full h-auto object-cover"
                    />
                    {hoveredMeme === meme.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50"
                      >
                        <p className="font-bold text-lg text-white">
                          {/* {meme.display_name} */}
                          <XShareButton imageUrl={meme.cloudinaryUrl} />
                        </p>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {/* Background animation
      <div className="top-0 left-0 z-[-1] absolute w-full h-full overflow-hidden">
        <div className="top-1/4 left-1/4 absolute bg-[#FF0B7A] opacity-20 blur-xl rounded-full w-64 h-64 animate-blob filter mix-blend-multiply"></div>
        <div className="top-3/4 right-1/4 absolute bg-[#45D62E] opacity-20 blur-xl rounded-full w-64 h-64 animate-blob animation-delay-2000 filter mix-blend-multiply"></div>
        <div className="bottom-1/4 left-1/3 absolute bg-[#FF0B7A] opacity-20 blur-xl rounded-full w-64 h-64 animate-blob animation-delay-4000 filter mix-blend-multiply"></div>
      </div> */}
    </div>
  );
}
