export const squidGameVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    transition: {
      duration: 0.2,
    },
  },
};

export const tabVariants = {
  inactive: { scale: 1 },
  active: {
    scale: 1.1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};

import { Triangle, Circle, Square, Hexagon, Hash, DollarSign, Box } from "lucide-react";

const layoutMetadata = {
  title: 'NFToodle - Turn NFTs into Viral Memes Instantly',
  description:
    'Create and mint viral NFT memes in seconds with NFToodle! Customize styles, add captions, and share your Squid Game-inspired creations.',
  keywords: [
    'NFT memes',
    'meme generator',
    'NFToodle',
    'viral memes',
    'Squid Game memes',
    'NFT creator',
    'meme minting',
    'X memes',
  ],
  openGraph: {
    title: 'NFToodle - Instant Viral NFT Memes',
    description:
      'Transform NFTs into memes with captions and Squid Game-inspired styles. Mint or share in seconds with NFToodle. Follow @NFToodleHQ on X!',
    url: 'https://NFToodle.vercel.app',
    siteName: 'NFToodle',
    images: [
      {
        url: 'https://pbs.twimg.com/profile_images/1903891969476059136/ovNOfG-d_400x400.jpg',
        width: 400,
        height: 400,
        alt: 'NFToodle Viral NFT Meme Creator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NFToodle - Create Viral NFT Memes',
    description:
      'Turn NFTs into memes in seconds with NFToodle! Customize, mint, or share with our Squid Game-themed generator. Follow @NFToodleHQ on X!',
    images: [
      'https://pbs.twimg.com/profile_images/1903891969476059136/ovNOfG-d_400x400.jpg',
    ],
    site: '@NFToodleHQ',
  },
  alternates: {
    canonical: 'https://NFToodle.vercel.app',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const SQUID_ELEMENTS = {
  emojis: {
    circle: '⭕️',
    triangle: '🔺',
    square: '⬛',
    mask: '🎭',
    guard: '👥',
    doll: '🎎',
    cookie: '🍪',
    money: '💰',
    gun: '🔫',
    skull: '💀',
    glass: '🪟',
    umbrella: '☂️',
  },
  filters: {
    redLight: {
      name: 'Red Light',
      filter:
        'brightness(120%) saturate(180%) hue-rotate(340deg) contrast(130%) sepia(20%)',
      // Creates an intense red atmosphere with enhanced contrast
    },
    greenLight: {
      name: 'Green Light',
      filter:
        'brightness(115%) saturate(140%) hue-rotate(85deg) contrast(120%) sepia(15%)',
      // Vivid green with slight warmth
    },
    arenaMode: {
      name: 'Arena',
      filter:
        'contrast(140%) brightness(85%) saturate(120%) sepia(30%) hue-rotate(15deg)',
      // Dark, gritty look with enhanced contrast
    },
    neonNight: {
      name: 'Neon Night',
      filter:
        'brightness(130%) contrast(140%) saturate(200%) hue-rotate(190deg)',
      // Cyberpunk-style with intense colors
    },
    dollScene: {
      name: 'Doll Scene',
      filter:
        'sepia(50%) brightness(105%) contrast(130%) saturate(140%) hue-rotate(305deg)',
      // Creepy vintage look with purple tint
    },
    glassGame: {
      name: 'Glass Bridge',
      filter:
        'brightness(110%) contrast(120%) saturate(110%) blur(0.4px) hue-rotate(10deg)',
      // Subtle glass effect with slight blur
    },
    vhs: {
      name: 'VHS Style',
      filter:
        'contrast(150%) brightness(95%) saturate(130%) sepia(20%) hue-rotate(5deg)',
      // Retro VHS look
    },
    nightmare: {
      name: 'Nightmare',
      filter:
        'contrast(160%) brightness(80%) saturate(160%) hue-rotate(270deg) grayscale(30%)',
      // Dark and ominous
    },
    synthwave: {
      name: 'Synthwave',
      filter:
        'brightness(120%) contrast(140%) saturate(180%) hue-rotate(220deg)',
      // 80s synthwave aesthetic
    },
    elimination: {
      name: 'Elimination',
      filter:
        'contrast(150%) brightness(90%) saturate(170%) sepia(40%) hue-rotate(320deg)',
      // Dramatic red-tinted elimination scene
    },
  },
  fonts: {
    impact: 'Impact',
    squidGame: 'SquidGame',
    pixel: 'Press Start 2P',
    future: 'Orbitron',
  },
  captions: [
    "Red light... 🔴 Green light... 🟢 You won't escape!",
    "The game isn't over yet... 🦑 The real challenge begins now!",
    'Choose wisely, your next move could cost you everything 🎮',
    'The Front Man sees all 👁️ but can you escape his gaze?',
    '456 reasons to play again... but no promises of survival 🎲',
    'Glass stepping stones... Choose or lose! 🪟 Are you brave enough?',
    'Honeycomb challenge accepted 🍯 Break the cookie or break your fate.',
    'Tug of war champion 🏆 Who will survive the final pull?',
    'Marbles: friend or foe? 🔮 Will you win with a friend, or alone?',
    "Final round: Squid Game 🦑 There's no going back now...",
  ],
};

const PUBLIC_ROUTES: string[] = [];

const PROTECTED_ROUTES: Record<string, string[]> = {
  user: ['/my-memes', '/gamezone/cardgame', '/gamezone/matchmeme'],
  platform: ['/platforms'],
  creator: ['/platforms/*'],
  auth: ['/api/auth'],
  home: ['/']
};

const platforms = [
  {
    id: 1,
    name: 'UnleashNFTs.com',
    logo: '/unleash-logo.svg',
    route: '/platforms/unleash',
    description: 'Unleash your NFTs',
  },
  {
    id: 3,
    name: 'The Buffers',
    logo: 'https://arweave.net/lIZ2tPFGxcSMws5il-H07c--JYmF55C1sEuJC8abMIw',
    route: '/platforms/thebuffers',
    description: 'The Buffers',
  },
  {
    id: 4,
    name: 'OpenSea.io',
    logo: 'https://opensea.io/static/images/logos/opensea-logo.svg',
    route: '/platforms/opensea',
    description: 'OpenSea NFT marketplace',
  },
];

const games = [
  {
    id: 1,
    title: 'Meme Battle',
    description: 'Create and battle with your memes against other players!',
    icon: Triangle,
    comingSoon: false,
    route: '/gamezone/meme-battle',
  },
  {
    id: 2,
    title: 'Match Meme',
    description: 'Match your memes with other players!',
    icon: Circle,
    comingSoon: false,
    route: '/gamezone/match-meme',
  },
  {
    id: 3,
    title: 'Meme Smash',
    description: 'Smash your memes with other players!',
    icon: Square,
    comingSoon: false,
    route: '/gamezone/meme-smash',
  },
];

const floatingElements = [
  { Icon: Hexagon, position: 'top-20 right-1/5', size: 'w-16 h-16' },
  { Icon: Hash, position: 'bottom-32 left-1/6', size: 'w-12 h-12' },
  { Icon: Box, position: 'top-40 left-1/4', size: 'w-20 h-20' },
  {
    Icon: DollarSign,
    position: 'bottom-40 right-1/4',
    size: 'w-14 h-14',
  },
]

const floatingVariants = {
  initial: { y: 0, opacity: 0 },
  float: {
    y: [-10, 10, -10],
    opacity: [0.3, 0.5, 0.3],
    transition: {
      duration: 4,
      repeat: Infinity,
    },
  },
};

export {
  layoutMetadata,
  SQUID_ELEMENTS,
  platforms,
  PUBLIC_ROUTES,
  PROTECTED_ROUTES,
  games,
  floatingElements,
  floatingVariants
}