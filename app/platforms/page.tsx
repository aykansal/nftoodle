"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants, cardVariants, containerVariants } from "@/styles/animations";

const platforms = [
  {
    id: 1,
    name: "UnleashNFTs.com",
    logo: "/unleash-logo.svg",
    route: "/platforms/unleash",
    description: "Unleash your NFTs",
  },
  {
    id: 2,
    name: "Bazar.arweave.dev",
    logo: "https://pbs.twimg.com/profile_images/1686990003266568192/El3x-VID_400x400.jpg",
    route: "/platforms/bazar",
    description: "Bazar NFT marketplace",
  },
  {
    id: 3,
    name: "OpenSea.io",
    logo: "https://opensea.io/static/images/logos/opensea-logo.svg",
    route: "/platforms/opensea",
    description: "OpenSea NFT marketplace",
  },
];

export default function PlatformsPage() {
  return (
    <div className="min-h-[90vh] text-white p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-5xl font-bold mb-16 text-center text-[#FF0B7A] font-squid"
        >
          Select Platform
        </motion.h1>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {platforms.map((platform) => (
            <motion.div
              key={platform.id}
              variants={cardVariants}
              whileHover="hover"
              className="squid-card overflow-hidden will-change-transform"
            >
              <Link href={platform.route} className="block p-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative w-32 h-32">
                    <Image
                      src={platform.logo}
                      alt={platform.name}
                      fill
                      sizes="(max-width: 128px) 100vw, 128px"
                      className="object-contain"
                      priority={platform.id <= 2}
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-[#FF0B7A] font-ibm">
                    {platform.name}
                  </h2>
                  <p className="text-gray-400 text-center">{platform.description}</p>
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="squid-button px-6 py-2 rounded-lg mt-4 will-change-transform"
                  >
                    View NFTs
                  </motion.button>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
