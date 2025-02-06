// app/create/[nftId]/page.tsx

'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { MemeGenerator } from '@/components/meme-generator';
import { motion, AnimatePresence } from 'framer-motion';
import { Triangle, Circle, Square } from 'lucide-react';
// import { uploadToCloudinary } from "@/lib/cloudinary";  // Import the upload function
// import { prisma } from "@/lib/prisma";

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const searchParams = useSearchParams();
  // const [isUploading, setIsUploading] = useState(false);
  // const [memeImageUrl, setMemeImageUrl] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const urlParam = searchParams.get('imageUrl');
      if (urlParam) {
        setImageUrl(decodeURIComponent(urlParam));
      }
    }
  }, [isMounted, searchParams]);

  return (
    <div className="relative min-h-[90vh] text-white overflow-hidden">
      <AnimatePresence>
        {!isMounted && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-50 absolute inset-0 flex flex-col justify-center items-center bg-[#0A0A0A]"
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
              <Circle className="w-12 h-12 text-[#45D62E]" />
              <Square className="w-12 h-12 text-[#FF0B7A]" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-bold text-[#FF0B7A] text-xl"
            >
              Preparing your meme canvas...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mx-auto px-4 pt-4 container"
      >
        {/* <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 font-bold text-[#FF0B7A] text-4xl text-center"
        >
          Create Your Meme
        </motion.h1> */}
        <Suspense
          fallback={
            <div className="flex justify-center items-center space-x-4">
              <Triangle className="w-8 h-8 text-[#FF0B7A] animate-spin" />
              <Circle className="w-8 h-8 text-[#45D62E] animate-pulse" />
              <Square className="w-8 h-8 text-[#FF0B7A] animate-bounce" />
            </div>
          }
        >
          <MemeGenerator defaultImage={imageUrl} />
        </Suspense>
      </motion.div>

      {/* Background animation */}
      <div className="top-0 left-0 z-[-1] absolute w-full h-full overflow-hidden">
        <div className="top-1/4 left-1/4 absolute bg-[#FF0B7A] opacity-20 blur-xl rounded-full w-64 h-64 animate-blob filter mix-blend-multiply"></div>
        <div className="top-3/4 right-1/4 absolute bg-[#45D62E] opacity-20 blur-xl rounded-full w-64 h-64 animate-blob animation-delay-2000 filter mix-blend-multiply"></div>
        <div className="bottom-1/4 left-1/3 absolute bg-[#FF0B7A] opacity-20 blur-xl rounded-full w-64 h-64 animate-blob animation-delay-4000 filter mix-blend-multiply"></div>
      </div>
    </div>
  );
}

// old code

// "use client";

// import { useSearchParams } from "next/navigation";
// import { Suspense, useEffect, useState } from "react";
// import { MemeGenerator } from "@/components/meme-generator";

// export default function Page() {
//   const [isMounted, setIsMounted] = useState(false);
//   const [imageUrl, setImageUrl] = useState<string>("");
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   useEffect(() => {
//     if (isMounted) {
//       const urlParam = searchParams.get("imageUrl");
//       if (urlParam) {
//         setImageUrl(decodeURIComponent(urlParam));
//       }
//     }
//   }, [isMounted, searchParams]);

//   if (!isMounted) {
//     return <div className="text-white">Loading...</div>;
//   }

//   return (
//     <div className="bg-black mx-auto px-4 pt-3 h-[90vh] container">
//       <Suspense fallback={<div className="text-white">Loading...</div>}>
//         <MemeGenerator defaultImage={imageUrl} />
//       </Suspense>
//     </div>
//   );
// }
