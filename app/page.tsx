// app/page.tsx

"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Triangle, Circle, Square } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="relative flex flex-col justify-center items-center p-8 min-h-[100vh] text-white overflow-hidden bg-black">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="text-center relative z-10"
      >
        <h1 className="mb-6 font-bold text-[#FF0B7A] font-squid text-7xl md:text-9xl hover:scale-105 transition-transform cursor-pointer relative">
          NFT<span className="text-white hover:text-[#45D62E] transition-colors">oodle</span>
          <motion.div
            className="absolute -inset-1 rounded-lg bg-gradient-to-r from-[#FF0B7A] via-[#45D62E] to-[#FF0B7A] opacity-30 blur-xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </h1>
        {/* <motion.p 
          className="mb-12 max-w-2xl text-[#45D62E] font-ibm text-2xl text-center md:text-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Transform NFTs into hilarious memes.{" "}
          <span className="text-white">Join the game,</span>{" "}
          <span className="text-[#FF0B7A]">share the laughter!</span>
        </motion.p> */}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
        className="relative z-10"
      >
        <Link href="/create">
          <Button className="bg-[#FF0B7A]/90 hover:bg-[#FF3B9A] px-8 py-6 font-medium text-lg transform transition-all duration-300 ease-in-out
          font-ibm hover:scale-105 hover:shadow-md hover:shadow-[#FF0B7A]/30 rounded-lg relative group">
            <span className="relative z-10">Create Meme</span>
            <motion.div
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#FF0B7A] to-[#45D62E] opacity-0 group-hover:opacity-10 transition-opacity duration-300"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </Button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex justify-center items-center space-x-16 mb-12 mt-16 relative z-10"
      >
        <motion.div whileHover={{ scale: 1.2, rotate: 180 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
          <Triangle className="w-16 h-16 text-[#FF0B7A] animate-bounce" />
        </motion.div>
        <motion.div whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
          <Circle className="w-16 h-16 text-[#45D62E] animate-pulse" />
        </motion.div>
        <motion.div whileHover={{ scale: 1.2, rotate: -180 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
          <Square className="w-16 h-16 text-[#FF0B7A] animate-spin" />
        </motion.div>
      </motion.div>

      {/* Enhanced background effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute w-full h-full bg-[url('/noise.png')] opacity-[0.015] mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-40"></div>
        <motion.div 
          className="absolute top-1/4 left-1/4 bg-[#FF0B7A] opacity-20 blur-[100px] rounded-full w-[500px] h-[500px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 bg-[#45D62E] opacity-20 blur-[100px] rounded-full w-[500px] h-[500px]"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 bg-[#FF0B7A] opacity-20 blur-[100px] rounded-full w-[300px] h-[300px]"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
    </div>
  );
}
