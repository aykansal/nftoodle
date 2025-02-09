'use client';

import React, { useEffect, useState } from 'react';
import { Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import { AuthorDetails } from './Footer';
import { useActiveAccount, useConnect } from 'thirdweb/react';
import { createWallet } from 'thirdweb/wallets';
import { createThirdwebClient } from 'thirdweb';
import { toast } from 'sonner';

const client = createThirdwebClient({
  clientId: '4f4d7aad88cd12953957137f0f7c0081',
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const { connect } = useConnect();
  const account = useActiveAccount();
  const [isConnecting, setIsConnecting] = useState(false);

  // Handle redirect after successful authentication
  useEffect(() => {
    if (account) {
      toast.success('Wallet connected successfully!');
    }
  }, [account]);

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      toast.loading('Connecting wallet...', {
        id: 'wallet-connection'
      });

      await connect(async () => {
        const metamask = createWallet('io.metamask');
        await metamask.connect({ client });
        return metamask;
      });

      toast.success('Wallet connected successfully!', {
        id: 'wallet-connection'
      });
    } catch (error) {
      console.error('Wallet connection error:', error);
      toast.error('Failed to connect wallet. Please try again.', {
        id: 'wallet-connection'
      });
    } finally {
      setIsConnecting(false);
    }
  };

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
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-[#FF0B7A] to-[#FF0B7A]/80 rounded-lg font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleConnect}
              disabled={isConnecting}
            >
              {isConnecting ? 'Connecting...' : 'Connect Metamask Wallet'}
            </motion.button>
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