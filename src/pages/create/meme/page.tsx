;

import { useSearchParams } from "react-router";
import { Suspense, useEffect, useState } from "react";
import { MemeGenerator } from "@/components/meme-generator";
import { motion, AnimatePresence } from "motion/react";
import { Triangle, Circle, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MemePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const urlParam = searchParams.get("imageUrl");
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
            <p className="text-white text-xl font-ibm">
              Loading Meme Generator...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-12"
        >
          <h1 className="text-5xl font-bold text-[#FF0B7A] font-ibm">
            Create Meme
          </h1>
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="border-2 border-gray-700 hover:border-pink-500 bg-gray-800/50 backdrop-blur-sm text-white px-6 py-2 text-lg"
          >
            Back
          </Button>
        </motion.div>

        <Suspense
          fallback={
            <div className="flex justify-center items-center h-[60vh]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-500"
              />
            </div>
          }
        >
          {imageUrl && <MemeGenerator defaultImage={imageUrl} />}
        </Suspense>
      </div>
    </div>
  );
}
