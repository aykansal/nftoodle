'use client';

import { motion } from 'framer-motion';
import { Triangle, Circle, Square } from 'lucide-react';
import { buttonVariants, cardVariants } from '@/styles/animations';
import { useRouter } from 'next/navigation';

const games = [
  {
    id: 1,
    title: 'Meme Battle',
    description: 'Create and battle with your memes against other players!',
    icon: Triangle,
    comingSoon: false,
    route: '/gamezone/cardgame'
  },
  {
    id: 2,
    title: 'Meme Trading',
    description: 'Trade your memes with other players!',
    icon: Circle,
    comingSoon: false,
    route: '/gamezone/matchmeme'
  },
  {
    id: 3,
    title: 'NFT Quest',
    description: 'Complete daily challenges to earn special NFTs!',
    icon: Square,
    comingSoon: true,
    route: ''
  },
];

export default function Gamezone() {
  const router = useRouter();
  return (
    <div className="min-h-[90vh] text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-5xl font-bold mb-16 text-center text-[#FF0B7A] font-squid"
        >
          Game Center
        </motion.h1>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {games?.map((game) => (
            <motion.div
              key={game.id}
              variants={cardVariants}
              whileHover="hover"
              className="squid-card overflow-hidden"
            >
              <div className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="flex justify-center mb-6"
                >
                  <game.icon className="w-16 h-16 text-[#FF0B7A]" />
                </motion.div>
                <h2 className="text-2xl font-bold text-[#FF0B7A] mb-4 font-ibm">
                  {game.title}
                </h2>
                <p className="text-gray-400 mb-8">{game.description}</p>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  disabled={game.comingSoon}
                  onClick={() => {
                    if (!game.comingSoon) {
                      router.push(game.route);
                    }
                  }}
                  className="squid-button px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {game.comingSoon ? 'Coming Soon' : 'Play Now'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Background Elements */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <motion.div
            animate={{
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.1, 1],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-20 left-20"
          >
            <Triangle className="w-40 h-40 text-[#FF0B7A]/20" />
          </motion.div>

          <motion.div
            animate={{
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.2, 1],
              rotate: [0, -10, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
            className="absolute bottom-20 right-20"
          >
            <Circle className="w-40 h-40 text-green-400/20" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
