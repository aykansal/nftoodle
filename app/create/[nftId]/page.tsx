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

"use client"

import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { MemeGenerator } from "@/components/meme-generator"
import { motion, AnimatePresence } from "framer-motion"
import { Triangle, Circle, Square } from "lucide-react"

export default function Page() {
  const [isMounted, setIsMounted] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>("")
  const searchParams = useSearchParams()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted) {
      const urlParam = searchParams.get("imageUrl")
      if (urlParam) {
        setImageUrl(decodeURIComponent(urlParam))
      }
    }
  }, [isMounted, searchParams])

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white relative overflow-hidden">
      <AnimatePresence>
        {!isMounted && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-[#0A0A0A] z-50"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              }}
              className="flex items-center justify-center space-x-4 mb-4"
            >
              <Triangle className="w-12 h-12 text-[#FF0B7A]" />
              <Circle className="w-12 h-12 text-[#45D62E]" />
              <Square className="w-12 h-12 text-[#FF0B7A]" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl font-bold text-[#FF0B7A]"
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
        className="container mx-auto px-4 pt-8 pb-16"
      >
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-8 text-[#FF0B7A]"
        >
          Create Your Meme
        </motion.h1>
        <Suspense
          fallback={
            <div className="flex items-center justify-center space-x-4">
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
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-[-1]">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#FF0B7A] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-[#45D62E] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-[#FF0B7A] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  )
}

