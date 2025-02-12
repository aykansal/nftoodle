import { motion } from 'framer-motion';
import { Triangle, Circle, Square } from 'lucide-react';

export function GameLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
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
        <Circle className="w-12 h-12 text-[#45D62E]" />
        <Square className="w-12 h-12 text-[#FF0B7A]" />
      </motion.div>
      <p className="text-[#FF0B7A] text-xl font-squid">Loading Game...</p>
    </div>
  );
} 