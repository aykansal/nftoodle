'use client';
import React from 'react';
import { useActiveAccount, useConnect } from 'thirdweb/react';
import { AuthorDetails } from './Footer';
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';
import { createWallet } from 'thirdweb/wallets';
import { createThirdwebClient } from 'thirdweb';

const client = createThirdwebClient({
  clientId: '4f4d7aad88cd12953957137f0f7c0081',
});

export default function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { connect } = useConnect();
  const account = useActiveAccount();

  if (!account?.address) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col justify-center items-center h-[90vh] text-neutral-300"
      >
        <motion.div
          variants={itemVariants}
          className="relative w-24 h-24 mb-6"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
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
              // whileHover={{
              //   scale: 1.05,
              //   boxShadow: "0 0 15px rgba(255, 11, 122, 0.5)"
              // }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-[#FF0B7A] to-[#FF0B7A]/80 rounded-lg font-semibold text-white transition-all"
              onClick={() => {
                connect(async () => {
                  const metamask = createWallet("io.metamask"); 
                  await metamask.connect({ client });
                  return metamask;
                })
              }}
            >
              Connect Metamask Wallet
            </motion.button>
            <p className="text-sm text-neutral-500">
              New to Web3? {' '}
              <a
                href="https://ethereum.org/en/wallets/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF0B7A] hover:underline"
              >
                Learn about wallets
              </a>
            </p>
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
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};