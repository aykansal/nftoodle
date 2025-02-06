'use client';

import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { Hexagon, Hash, DollarSign, Box } from 'lucide-react';
import { buttonVariants } from '@/styles/animations';
import { useEffect, useState } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  }
};

const floatingVariants = {
  initial: { y: 0, opacity: 0 },
  float: {
    y: [-10, 10, -10],
    opacity: [0.3, 0.5, 0.3],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const glowVariants = {
  initial: { scale: 1, opacity: 0.1 },
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.1, 0.3, 0.1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const backgroundControls = useAnimation();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = clientX - window.innerWidth / 2;
      const moveY = clientY - window.innerHeight / 2;
      const offsetFactor = 0.02;

      setMousePosition({ x: moveX, y: moveY });
      backgroundControls.start({
        x: moveX * offsetFactor,
        y: moveY * offsetFactor,
        transition: { type: "spring", stiffness: 150, damping: 15 }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [backgroundControls]);

  return (
    <div className="flex flex-col justify-center items-center p-8 h-[90vh] text-white overflow-hidden">
      {/* Radial gradient background */}
      <motion.div 
        animate={backgroundControls}
        className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A]"
      />
      
      {/* Animated gradient overlay */}
      <motion.div 
        animate={backgroundControls}
        className="absolute inset-0 bg-gradient-radial from-transparent via-[#FF0B7A]/5 to-transparent animate-pulse"
      />

      {/* Interactive glow effect following cursor */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: 1.2
        }}
        style={{
          background: 'radial-gradient(circle, rgba(255,11,122,0.1) 0%, rgba(255,11,122,0) 70%)',
          transform: 'translate(-50%, -50%)'
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center space-y-8 relative z-10 max-w-4xl mx-auto"
      >
        <motion.div variants={itemVariants} className="space-y-4">
          <motion.h1 
            className="text-6xl md:text-7xl font-bold font-squid text-white"
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            <motion.span 
              className="text-[#FF0B7A] font-squid inline-block"
              whileHover={{
                rotate: [0, -5, 5, 0],
                transition: { duration: 0.3 }
              }}
            >
              Game
            </motion.span>{' '}
            On,{' '}
            <motion.span 
              className="text-[#FF0B7A] font-squid inline-block"
              whileHover={{
                rotate: [0, 5, -5, 0],
                transition: { duration: 0.3 }
              }}
            >
              Meme
            </motion.span>{' '}
            On
          </motion.h1>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
        >
          <Link href="/platforms">
            <motion.button
              variants={buttonVariants}
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 8px rgb(255,11,122)",
                boxShadow: "0 0 8px rgb(255,11,122)"
              }}
              whileTap={{ scale: 0.95 }}
              className="squid-button px-8 py-3 text-xl rounded-lg will-change-transform bg-gradient-to-r from-[#FF0B7A] to-[#FF0B7A]/80 hover:from-[#FF0B7A]/90 hover:to-[#FF0B7A]/70"
            >
              Start Creating
            </motion.button>
          </Link>

          <Link href="/gallery">
            <motion.button
              variants={buttonVariants}
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 8px rgb(255,11,122)",
                boxShadow: "0 0 8px rgb(255,11,122)"
              }}
              whileTap={{ scale: 0.95 }}
              className="squid-button px-8 py-3 text-xl rounded-lg will-change-transform border-2 border-[#FF0B7A] hover:bg-[#FF0B7A]/10"
            >
              View Gallery
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Squid Game Elements */}
        <div className="absolute inset-0">
          {/* Pink honeycomb pattern */}
          <motion.div 
            animate={backgroundControls}
            className="absolute inset-0 opacity-5" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='40' viewBox='0 0 24 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40c5.523 0 10-4.477 10-10V0C4.477 0 0 4.477 0 10v30zm24 0c-5.523 0-10-4.477-10-10V0c5.523 0 10 4.477 10 10v30z' fill='%23FF0B7A' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }} 
          />
        </div>

        {/* Floating Elements with Mouse Interaction */}
        {[
          { Icon: Hexagon, position: "top-20 right-[20%]", size: "w-16 h-16" },
          { Icon: Hash, position: "bottom-32 left-[15%]", size: "w-12 h-12" },
          { Icon: Box, position: "top-40 left-[25%]", size: "w-20 h-20" },
          { Icon: DollarSign, position: "bottom-40 right-[25%]", size: "w-14 h-14" }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial="initial"
            animate="float"
            variants={floatingVariants}
            className={`absolute ${item.position}`}
            whileHover={{
              scale: 1.2,
              rotate: 360,
              transition: { duration: 0.5 }
            }}
          >
            <item.Icon className={`${item.size} text-[#FF0B7A]/30`} />
          </motion.div>
        ))}

        {/* Glowing Orbs */}
        <motion.div
          variants={glowVariants}
          initial="initial"
          animate="animate"
          className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-[#FF0B7A]/10 blur-3xl"
        />
        <motion.div
          variants={glowVariants}
          initial="initial"
          animate="animate"
          className="absolute bottom-1/4 left-1/3 w-40 h-40 rounded-full bg-[#FF0B7A]/10 blur-3xl"
        />

        {/* Squid Game Shapes */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 grid grid-cols-4 gap-8 p-8"
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.2, rotate: 90 }}
                className={`w-8 h-8 ${i % 3 === 0 ? 'border-2' : 'border'} border-[#FF0B7A]/20 ${i % 2 === 0 ? 'rounded-full' : i % 3 === 0 ? '' : 'rotate-45'}`}
              />
            ))}
          </motion.div>
        </div>

        {/* Circuit Lines */}
        <motion.div 
          animate={backgroundControls}
          className="absolute inset-0"
        >
          <svg className="w-full h-full opacity-10">
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 50h100M50 0v100" stroke="#FF0B7A" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="3" fill="#FF0B7A" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#circuit)" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
