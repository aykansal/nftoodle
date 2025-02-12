import { Variants } from 'framer-motion';
import { squidGameTheme } from './theme';

export const squidGameVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.5,
    },
  },
};

export const buttonVariants: Variants = {
  initial: { 
    scale: 1,
    boxShadow: 'none',
    backgroundColor: squidGameTheme.colors.background,
  },
  hover: {
    scale: 1.05,
    boxShadow: `0 0 15px ${squidGameTheme.colors.primary}`,
    backgroundColor: squidGameTheme.colors.primary,
    transition: { duration: 0.3, ease: 'easeInOut' }
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

export const cardVariants: Variants = {
  initial: { 
    opacity: 0,
    y: 20,
    boxShadow: 'none'
  },
  animate: {
    opacity: 1,
    y: 0,
    boxShadow: `0 0 10px ${squidGameTheme.colors.overlay}`,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  },
  hover: {
    y: -5,
    boxShadow: `0 5px 15px ${squidGameTheme.colors.primary}`,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.3
    }
  }
};

export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    x: -20
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.3,
      ease: 'easeIn'
    }
  }
};

export const glitchAnimation: Variants = {
  initial: { 
    textShadow: 'none' 
  },
  animate: {
    textShadow: [
      `2px 2px ${squidGameTheme.colors.primary}`,
      `-2px -2px ${squidGameTheme.colors.secondary}`,
      `2px -2px ${squidGameTheme.colors.accent}`,
      `-2px 2px ${squidGameTheme.colors.primary}`
    ],
    transition: {
      duration: 0.3,
      repeat: Infinity,
      repeatType: 'reverse'
    }
  }
};

export const glowAnimation = {
  '0%': { boxShadow: '0 0 5px rgba(255, 11, 122, 0.5)' },
  '50%': { boxShadow: '0 0 20px rgba(255, 11, 122, 0.8)' },
  '100%': { boxShadow: '0 0 5px rgba(255, 11, 122, 0.5)' },
};

export const pulseAnimation = {
  '0%': { transform: 'scale(1)' },
  '50%': { transform: 'scale(1.05)' },
  '100%': { transform: 'scale(1)' },
};
