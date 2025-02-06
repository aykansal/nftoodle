'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Triangle, Circle, Square } from 'lucide-react';
import { squidGameVariants } from '@/styles/animations';

interface BaseLayoutProps {
  children: React.ReactNode;
}

export function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial="initial"
        animate="visible"
        exit="exit"
        variants={squidGameVariants}
        className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white relative overflow-hidden"
      >
        {/* Background Animation Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <motion.div
            animate={{
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -top-20 -left-20 w-40 h-40"
          >
            <Triangle className="w-full h-full text-[#FF0B7A]/20" />
          </motion.div>

          <motion.div
            animate={{
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
            className="absolute top-1/3 -right-20 w-40 h-40"
          >
            <Circle className="w-full h-full text-green-400/20" />
          </motion.div>

          <motion.div
            animate={{
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
            className="absolute -bottom-20 left-1/3 w-40 h-40"
          >
            <Square className="w-full h-full text-[#FF0B7A]/20" />
          </motion.div>
        </div>

        {/* Content */}
        <motion.div variants={squidGameVariants} className="relative z-10">
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
