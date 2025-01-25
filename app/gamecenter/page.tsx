"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Triangle, Gamepad2, Brain } from "lucide-react";

interface GameCard {
  title: string;
  description: string;
  icon: JSX.Element;
  href: string;
  comingSoon?: boolean;
}

export default function MemeGames() {
  const games: GameCard[] = [
    {
      title: "Match Meme",
      description:
        "Test your memory by matching pairs of meme cards. The faster you match, the higher your score!",
      icon: <Brain className="w-8 h-8 text-[#45D62E]" />,
      href: "/gamecenter/matchmeme",
    },
    {
      title: "Meme Battle",
      description:
        "Challenge other players to a meme creation battle. Vote for the best memes!",
      icon: <Gamepad2 className="w-8 h-8 text-[#45D62E]" />,
      href: "/gamecenter/cardgame",
      comingSoon: false,
    },
    {
      title: "Meme Puzzle",
      description:
        "Solve sliding puzzles created from your favorite NFT memes.",
      icon: <Triangle className="w-8 h-8 text-[#FF0B7A]" />,
      href: "/gamecenter/cardgame",
      comingSoon: true,
    },
  ];

  return (
    <div className="p-8 mb-12 min-h-full text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-[#FF0B7A] mb-4">
            NFToodle Game Center
          </h1>
          <p className="text-xl text-[#45D62E] font-ibm">
            Welcome to the ultimate NFT meme gaming experience!
            <br />
            Choose your game and compete for the highest score.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={game.comingSoon ? "#" : game.href}>
                <Card
                  className={`h-full bg-[#1A1A1A] border-2 ${
                    game.comingSoon ? "border-gray-700" : "border-[#FF0B7A]"
                  } hover:border-[#45D62E] transition-colors duration-300`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-[#0A0A0A] rounded-lg">
                        {game.icon}
                      </div>
                      {game.comingSoon && (
                        <span className="text-sm text-[#45D62E] font-ibm px-2 py-1 bg-[#45D62E]/10 rounded-full">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-[#FF0B7A] mb-2">
                      {game.title}
                    </h2>
                    <p className="text-gray-400">{game.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Background animation */}
        <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 bg-[#FF0B7A] opacity-20 blur-xl rounded-full w-64 h-64 animate-blob"></div>
          <div className="absolute top-3/4 right-1/4 bg-[#45D62E] opacity-20 blur-xl rounded-full w-64 h-64 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 bg-[#FF0B7A] opacity-20 blur-xl rounded-full w-64 h-64 animate-blob animation-delay-4000"></div>
        </div>
      </div>
    </div>
  );
}
