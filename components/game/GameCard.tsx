'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cardVariants } from '@/styles/animations';
import { squidGameTheme } from '@/styles/theme';

interface GameCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  comingSoon: boolean;
  onClick: () => void;
}

const GameCard = ({ title, description, icon: Icon, comingSoon, onClick }: GameCardProps) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="relative group h-[400px] w-full perspective-1000"
    >
      <div 
        className="
          relative w-full h-full 
          transition-all duration-500 
          transform-style-3d group-hover:rotate-y-10
          rounded-xl overflow-hidden
        "
      >
        {/* Card Face */}
        <div 
          className={`
            absolute inset-0 w-full h-full
            ${squidGameTheme.effects.glassmorphism.background}
            backdrop-blur-sm
            border border-primary/20
            transform transition-all duration-300
            rounded-xl
            ${!comingSoon ? 'cursor-pointer hover:border-primary' : 'opacity-70'}
          `}
          onClick={() => !comingSoon && onClick()}
          style={{ 
            backdropFilter: squidGameTheme.effects.glassmorphism.backdropFilter 
          }}
        >
          {/* Background Glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="absolute inset-0 rounded-xl bg-primary/5 blur-2xl" />
            <div 
              className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          </div>

          {/* Content Container */}
          <div className="relative z-10 h-full flex flex-col items-center p-8">
            {/* Icon Container */}
            <motion.div 
              className="
                relative flex items-center justify-center 
                w-24 h-24 mb-8 rounded-full
                bg-gradient-to-br from-background to-primary/10
                group-hover:from-primary/20 group-hover:to-secondary/20
                transition-colors duration-500
              "
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Icon 
                className="w-16 h-16 text-primary group-hover:text-secondary transition-all duration-500"
                strokeWidth={1.5}
              />
              
              {/* Icon Glow */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl" />
              </div>
            </motion.div>
            
            {/* Title */}
            <motion.h2 
              className="
                text-2xl font-bold text-center mb-4 
                bg-clip-text text-transparent 
                bg-gradient-to-r from-primary to-secondary
                group-hover:from-secondary group-hover:to-primary
                transition-all duration-500
              "
              layout
            >
              {title}
            </motion.h2>
            
            {/* Description */}
            <p className="
              text-gray-300 text-center flex-grow
              group-hover:text-white transition-colors duration-300
            ">
              {description}
            </p>

            {/* Action Button */}
            {!comingSoon && (
              <motion.button
                className="
                  mt-6 px-8 py-3 rounded-lg
                  bg-primary/10 text-primary
                  border border-primary/20
                  hover:bg-primary/20 hover:border-primary
                  transition-all duration-300
                  relative overflow-hidden
                "
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Play Now</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>
            )}
          </div>

          {/* Coming Soon Overlay */}
          {comingSoon && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center rounded-xl"
              style={{ 
                background: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(4px)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="text-center"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <motion.span 
                  className="
                    text-2xl font-bold
                    bg-clip-text text-transparent 
                    bg-gradient-to-r from-primary via-secondary to-primary
                  "
                  style={{ 
                    ...squidGameTheme.effects.neonGlow,
                    backgroundSize: '200% 100%'
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                >
                  Coming Soon
                </motion.span>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default GameCard;
