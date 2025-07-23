import { Circle, Square, Triangle } from "lucide-react";
import { motion } from "motion/react";

export default function Loader() {
  return (
    <div className="min-h-full flex justify-center items-center space-x-4">
      <Triangle className="w-12 h-12 text-[#FF0B7A] animate-bounce" />
      <Circle className="w-12 h-12 text-[#45D62E] animate-pulse" />
      <Square className="w-12 h-12 text-[#FF0B7A] animate-spin" />
    </div>
  );
}

const loadingMessages = [
  "Loading your awesome memes...",
  "Preparing the fun...",
  "Almost there...",
  "Getting everything ready...",
  "Loading the good stuff...",
  "Just a moment...",
  "Loading the fun...",
  "Preparing the magic...",
];

export function Loadern() {
  const randomMessage =
    loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <p className="text-xl font-medium text-[#FF0B7A] mb-2">
          {randomMessage}
        </p>
        <div className="flex justify-center">
          <img
            src={"https://media1.tenor.com/m/JvLtLpHNUM0AAAAd/meme-nft.gif"}
            height={150}
            width={150}
            alt="loading-gif"
            className="rounded-lg"
          />
        </div>
      </motion.div>
    </div>
  );
}

export function Loader2() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <div className="flex justify-center">
          <img
            src={"https://media.tenor.com/Sy3vKl_rbMYAAAAi/laby-eating.gif"}
            height={120}
            width={120}
            alt="loading-gif"
            className="rounded-lg"
          />
        </div>
      </motion.div>
    </div>
  );
}

export function Mint1() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <div className="flex justify-center">
          <img
            src={"https://media.tenor.com/CoDrqJP6TikAAAAi/noodles-meal.gif"}
            height={120}
            width={120}
            alt="loading-gif"
            className="rounded-lg"
          />
        </div>
      </motion.div>
    </div>
  );
}
export function Mint2() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <div className="flex justify-center">
          <img
            src={"https://media.tenor.com/cCXqQ3K2QpIAAAAi/pierre-grimpe.gif"}
            height={120}
            width={120}
            alt="loading-gif"
            className="rounded-lg"
          />
        </div>
      </motion.div>
    </div>
  );
}
export function Mint3() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <div className="flex justify-center">
          <img
            src={
              "https://media.tenor.com/42bcTn0iuVgAAAAi/under-construction-pikachu.gif"
            }
            height={120}
            width={120}
            alt="loading-gif"
            className="rounded-lg"
          />
        </div>
      </motion.div>
    </div>
  );
}
export function Mint4() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <div className="flex justify-center">
          <img
            src={"https://media.tenor.com/FX4qs2hJbQoAAAAi/cooking-hype.gif"}
            height={120}
            width={120}
            alt="loading-gif"
            className="rounded-lg"
          />
        </div>
      </motion.div>
    </div>
  );
}
