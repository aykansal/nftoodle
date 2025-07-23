;

import { easeInOut, motion } from "motion/react";
import { Triangle, Circle, Square } from "lucide-react";
import { buttonVariants, cardVariants } from "@/styles/animations";
import { useNavigate } from "react-router";

const games = [
  {
    id: 1,
    title: "Meme Battle",
    description: "Create and battle with your memes against other players!",
    icon: Triangle,
    comingSoon: false,
    route: "/gamezone/cardgame",
  },
  {
    id: 2,
    title: "Meme Trading",
    description: "Trade your memes with other players!",
    icon: Circle,
    comingSoon: false,
    route: "/gamezone/matchmeme",
  },
  {
    id: 3,
    title: "NFT Quest",
    description: "Complete daily challenges to earn special NFTs!",
    icon: Square,
    comingSoon: true,
    route: "",
  },
];

export default function Gamezone() {
  const navigate = useNavigate();
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
          transition={{ duration: 0.6, ease: easeInOut }}
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
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
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
                      navigate(game.route);
                    }
                  }}
                  className="squid-button px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {game.comingSoon ? "Coming Soon" : "Play Now"}
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
              ease: easeInOut
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
              ease: "easeInOut",
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

// new but req changes thats why commented

// 'use client';

// import { motion, AnimatePresence } from 'motion/react';
// import { Triangle, Circle, Square } from 'lucide-react';
// 
// import { useEffect, useState } from 'react';
// import { pageTransition, glitchAnimation } from '@/styles/animations';
// import SquidBackground from '../../components/game/SquidBackground';
// import GameCard from '../../components/game/GameCard';

// const games = [
//   {
//     id: 1,
//     title: 'Meme Battle',
//     description: 'Create and battle with your memes against other players in this high-stakes competition!',
//     icon: Triangle,
//     comingSoon: false,
//     route: '/gamezone/cardgame'
//   },
//   {
//     id: 2,
//     title: 'Meme Trading',
//     description: 'Trade your rarest memes in this fast-paced marketplace. Will you make the right deals?',
//     icon: Circle,
//     comingSoon: false,
//     route: '/gamezone/matchmeme'
//   },
//   {
//     id: 3,
//     title: 'NFT Quest',
//     description: 'Embark on daily challenges to earn exclusive NFTs. Every quest brings you closer to legendary rewards!',
//     icon: Square,
//     comingSoon: true,
//     route: ''
//   },
// ];

// export default function Gamezone() {
//   const navigate= useNavigate();
//   const [mounted, setMounted] = useState(false);
//   const [selectedGame, setSelectedGame] = useState<number | null>(null);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   const handleGameSelect = (gameId: number, route: string) => {
//     setSelectedGame(gameId);
//     // Add a slight delay before navigation for the animation
//     setTimeout(() => {
//       navigate(route);
//     }, 300);
//   };

//   return (
//     <AnimatePresence mode="wait">
//       <motion.div
//         className="min-h-screen relative overflow-hidden"
//         initial="initial"
//         animate="animate"
//         exit="exit"
//         variants={pageTransition}
//       >
//         {/* Background */}
//         <SquidBackground />

//         {/* Content */}
//         <div className="relative z-10 container mx-auto px-4 py-16">
//           {/* Title */}
//           <motion.div className="text-center mb-16">
//             <motion.h1
//               variants={glitchAnimation}
//               className="text-6xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary font-squid"
//             >
//               Game Center
//             </motion.h1>
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto"
//             >
//               Choose your game and test your skills in our NFT gaming arena
//             </motion.p>
//           </motion.div>

//           {/* Games Grid */}
//           <motion.div
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
//             variants={{
//               animate: {
//                 transition: {
//                   staggerChildren: 0.1
//                 }
//               }
//             }}
//           >
//             {games.map((game) => (
//               <GameCard
//                 key={game.id}
//                 title={game.title}
//                 description={game.description}
//                 icon={game.icon}
//                 comingSoon={game.comingSoon}
//                 onClick={() => handleGameSelect(game.id, game.route)}
//               />
//             ))}
//           </motion.div>
//         </div>

//         {/* Page transition overlay */}
//         <AnimatePresence>
//           {selectedGame && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="fixed inset-0 bg-black z-50"
//             />
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </AnimatePresence>
//   );
// }
