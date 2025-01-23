// app/page.tsx

"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Triangle, Circle, Square, HandMetal } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedGradientText } from "@/components/ui/animatedGradient";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  return (
    <div className="relative flex flex-col justify-center items-center bg-[#0A0A0A] p-8 min-h-[90vh] text-white overflow-hidden">
      <AnimatedGradientText className="top-5 z-10 absolute">
        <HandMetal className="mr-1 transition-transform group-hover:translate-x-0.5 duration-300 ease-in-out size-3" />
        <span
          className={cn(
            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
          )}
        >
          Meme Spaces Comming Soon
        </span>
      </AnimatedGradientText>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="mb-6 font-bold text-[#FF0B7A] font-squid text-6xl md:text-7xl">
          NFT<span className="text-white">oodle</span>
        </h1>
      <p className="mb-12 max-w-2xl text-[#45D62E] font-ibm text-2xl text-center md:text-3xl">
          Transform NFTs into hilarious memes. Join the game, share the
          laughter!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex sm:flex-row flex-col sm:space-x-6 space-y-4 sm:space-y-0 mb-16"
      >
        <Link href="/create">
          <Button className="bg-[#FF0B7A] hover:bg-[#FF3B9A] px-8 py-6 font-bold text-lg transform transition-all duration-300 ease-in-out
          font-ibm hover:scale-105">
            Create Meme
          </Button>
        </Link>
        {/* <Link href="/gallery"> */}
        {/* <Button
          variant="outline"
          className="border-[#FF0B7A] border-2 hover:bg-[#FF0B7A] px-8 py-6 font-bold text-[#FF0B7A] text-lg hover:text-white transform transition-all duration-300 ease-in-out hover:scale-105"
          disabled={true}
        >
          Nft Spaces Comming Soon
        </Button> */}
        {/* </Link> */}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex justify-center items-center space-x-12 mb-12"
      >
        <Triangle className="w-16 h-16 text-[#FF0B7A] animate-bounce" />
        <Circle className="w-16 h-16 text-[#45D62E] animate-pulse" />
        <Square className="w-16 h-16 text-[#FF0B7A] animate-spin" />
      </motion.div>

      <footer className="bottom-4 absolute text-gray-400 text-sm">
        Made with 💖 by{" "}
        <Link
          href="https://x.com/aykansal"
          className="text-[#FF0B7A] hover:underline"
        >
          Aykansal
        </Link>
        {" & "}
        <Link
          href="https://x.com/satyanshmittal"
          className="text-[#FF0B7A] hover:underline"
        >
          Satyansh
        </Link>
      </footer>

      {/* Background shapes */}
      <div className="top-0 left-0 z-[-1] absolute w-full h-full overflow-hidden">
        <div className="top-1/4 left-1/4 absolute bg-[#FF0B7A] opacity-20 blur-xl rounded-full w-64 h-64 animate-blob filter mix-blend-multiply"></div>
        <div className="top-3/4 right-1/4 absolute bg-[#45D62E] opacity-20 blur-xl rounded-full w-64 h-64 animate-blob animation-delay-2000 filter mix-blend-multiply"></div>
        <div className="bottom-1/4 left-1/3 absolute bg-[#FF0B7A] opacity-20 blur-xl rounded-full w-64 h-64 animate-blob animation-delay-4000 filter mix-blend-multiply"></div>
      </div>
    </div>
  );
}
