'use client';

import React, { useEffect } from 'react';
import { Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import { AuthorDetails } from './Footer';
import { useActiveAccount } from 'thirdweb/react';
import { toast } from 'sonner';
import ConnectWallet from './thirdweb/ConnectWallet';

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const account = useActiveAccount();

  useEffect(() => {
    if (account) {
      toast.success('Wallet connected successfully!');
    }
  }, [account]);

  if (!account) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col justify-center items-center h-[90vh] text-neutral-300"
      >
        <motion.div variants={itemVariants} className="relative w-24 h-24 mb-6">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 rounded-full bg-[#FF0B7A]/20 blur-xl"
          />
          <Wallet className="w-full h-full text-[#FF0B7A]" />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-y-4 text-center"
        >
          <h2 className="text-2xl font-bold text-white">
            Connect Your Wallet to Join the Fun!
          </h2>
          <p className="text-lg text-neutral-400">
            Your wallet seems to be taking a coffee break ☕️
          </p>
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 mt-6"
          >
            <ConnectWallet />
          </motion.div>
        </motion.div>
        <AuthorDetails className="absolute bottom-6" />
      </motion.div>
    );
  }

  return <>{children}</>;
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};
