"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Loader from "@/components/loader";
import { Swords, Shield, Zap, Home, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import type { CloudinaryUploadResponse } from "@/lib/types";
import { Modal } from "@/components/ui/modal";

interface MemeCard {
  id: number;
  imageUrl: string;
  power: number;
  defense: number;
  special: number;
  isPlayed: boolean;
}

export default function CardGame() {
  const router = useRouter();
  const [memes, setMemes] = useState<CloudinaryUploadResponse[]>([]);
  const [playerCards, setPlayerCards] = useState<MemeCard[]>([]);
  const [computerCards, setComputerCards] = useState<MemeCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<MemeCard | null>(null);
  const [computerCard, setComputerCard] = useState<MemeCard | null>(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [battleResult, setBattleResult] = useState<string>("");
  const [roundWinner, setRoundWinner] = useState<"player" | "computer" | null>(null);
  const [showEndGameModal, setShowEndGameModal] = useState(false);
  const [showGameSummaryModal, setShowGameSummaryModal] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await axios.get("/api/memes");
        setMemes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching memes:", error);
        setLoading(false);
      }
    };

    fetchMemes();
  }, []);

  const initializeGame = () => {
    const shuffledMemes = [...memes].sort(() => Math.random() - 0.5);
    const playerMemes = shuffledMemes.slice(0, 5).map((meme, index) => ({
      id: index,
      imageUrl: meme.url,
      power: Math.floor(Math.random() * 10) + 1,
      defense: Math.floor(Math.random() * 10) + 1,
      special: Math.floor(Math.random() * 10) + 1,
      isPlayed: false,
    }));

    const computerMemes = shuffledMemes.slice(5, 10).map((meme, index) => ({
      id: index + 5,
      imageUrl: meme.url,
      power: Math.floor(Math.random() * 10) + 1,
      defense: Math.floor(Math.random() * 10) + 1,
      special: Math.floor(Math.random() * 10) + 1,
      isPlayed: false,
    }));

    setPlayerCards(playerMemes);
    setComputerCards(computerMemes);
    setPlayerScore(0);
    setComputerScore(0);
    setGameStarted(true);
    setBattleResult("");
    setRoundWinner(null);
  };

  const handleCardSelect = (card: MemeCard) => {
    if (card.isPlayed) return;
    setSelectedCard(card);
    
    // Computer selects a random unplayed card
    const availableComputerCards = computerCards.filter(c => !c.isPlayed);
    const randomCard = availableComputerCards[Math.floor(Math.random() * availableComputerCards.length)];
    setComputerCard(randomCard);

    // Battle logic
    const battleScore = calculateBattleScore(card, randomCard);
    
    // Update scores and mark cards as played
    setPlayerCards(prev => prev.map(c => c.id === card.id ? { ...c, isPlayed: true } : c));
    setComputerCards(prev => prev.map(c => c.id === randomCard.id ? { ...c, isPlayed: true } : c));

    if (battleScore > 0) {
      setPlayerScore(prev => prev + 1);
      setRoundWinner("player");
      setBattleResult("You win this round!");
    } else if (battleScore < 0) {
      setComputerScore(prev => prev + 1);
      setRoundWinner("computer");
      setBattleResult("Computer wins this round!");
    } else {
      setBattleResult("It's a tie!");
      setRoundWinner(null);
    }

    // Clear cards after 2 seconds
    setTimeout(() => {
      setSelectedCard(null);
      setComputerCard(null);
      setBattleResult("");
      setRoundWinner(null);
    }, 2000);
  };

  const calculateBattleScore = (playerCard: MemeCard, computerCard: MemeCard) => {
    const playerTotal = playerCard.power + playerCard.defense + playerCard.special;
    const computerTotal = computerCard.power + computerCard.defense + computerCard.special;
    return playerTotal - computerTotal;
  };

  useEffect(() => {
  const checkGameOver = () => {
    const allPlayerCardsPlayed = playerCards.every(card => card.isPlayed);
    const allComputerCardsPlayed = computerCards.every(card => card.isPlayed);
    
    if (allPlayerCardsPlayed || allComputerCardsPlayed) {
      handleGameOver();
    }
  };

    if (gameStarted && !gameOver) {
      checkGameOver();
    }
  }, [playerCards, computerCards, gameStarted, gameOver]);

  const handleGameOver = () => {
    setGameOver(true);
    setShowGameSummaryModal(true);
  };

  // const handleEndGame = () => {
  //   setShowEndGameModal(true);
  // };

  const handleEndGameConfirm = () => {
    setShowEndGameModal(false);
    handleGameOver();
  };

  const handleRestart = () => {
    setGameOver(false);
    setShowGameSummaryModal(false);
    initializeGame();
  };

  if (loading) return <Loader />;

  return (
    <div className="p-8 min-h-screen text-white">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#FF0B7A] mb-4">
            Meme Trading Card Battle
          </h1>
          <p className="text-lg text-[#45D62E] font-ibm mb-4">
            Battle with your meme cards against the computer!
          </p>
          <div className="flex justify-center gap-4 mb-4">
            <div className="text-[#FF0B7A]">Player Score: {playerScore}</div>
            <div className="text-[#45D62E] font-ibm">Computer Score: {computerScore}</div>
          </div>
          <div className="flex justify-center gap-4">
            <Button
              onClick={initializeGame}
              className="bg-[#FF0B7A] hover:bg-[#FF0B7A]/80 text-white"
            >
              {gameStarted ? "Restart Game" : "Start Game"}
            </Button>
            <Button
              onClick={() => router.push("/gamecenter")}
              className="bg-transparent hover:bg-[#FF0B7A]/10 text-[#FF0B7A] border-2 border-[#FF0B7A]"
            >
              <Home className="mr-2" size={18} />
              Back to Games
            </Button>
          </div>
        </header>

        {gameStarted && (
          <>
            {/* Battle Area */}
            <div className="mb-8">
              <div className="flex justify-center items-center gap-8 min-h-[300px]">
                <AnimatePresence mode="wait">
                  {selectedCard && (
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className={`relative ${roundWinner === "player" ? "ring-4 ring-[#45D62E]" : ""}`}
                    >
                      <MemeCardComponent card={selectedCard} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {battleResult && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-2xl font-bold text-[#FF0B7A]"
                  >
                    {battleResult}
                  </motion.div>
                )}

                <AnimatePresence mode="wait">
                  {computerCard && (
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className={`relative ${roundWinner === "computer" ? "ring-4 ring-[#FF0B7A]" : ""}`}
                    >
                      <MemeCardComponent card={computerCard} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Player's Hand */}
            <div className="grid grid-cols-5 gap-4">
              {playerCards.map((card) => (
                <motion.div
                  key={card.id}
                  whileHover={!card.isPlayed ? { scale: 1.05 } : {}}
                  className={`cursor-pointer ${card.isPlayed ? "opacity-50" : ""}`}
                  onClick={() => !card.isPlayed && handleCardSelect(card)}
                >
                  <MemeCardComponent card={card} />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* End Game Confirmation Modal */}
      <Modal
        isOpen={showEndGameModal}
        onClose={() => setShowEndGameModal(false)}
        title="End Game"
      >
        <div className="space-y-4">
          <p className="text-white">
            Are you sure you want to end the game? Your progress will be lost.
          </p>
          <div className="flex justify-end gap-4">
            <Button
              onClick={() => setShowEndGameModal(false)}
              className="bg-transparent hover:bg-[#FF0B7A]/10 text-[#FF0B7A] border-2 border-[#FF0B7A]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleEndGameConfirm}
              className="bg-[#FF0B7A] hover:bg-[#FF0B7A]/80"
            >
              End Game
            </Button>
          </div>
        </div>
      </Modal>

      {/* Game Summary Modal */}
      <Modal
        isOpen={showGameSummaryModal}
        onClose={() => setShowGameSummaryModal(false)}
        title="Game Summary"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-white">Game Results:</p>
            <div className="grid grid-cols-2 gap-4 bg-[#0A0A0A] p-4 rounded-lg">
              <div>
                <p className="text-[#FF0B7A]">Your Score</p>
                <p className="text-2xl font-bold">{playerScore}</p>
              </div>
              <div>
                <p className="text-[#FF0B7A]">Computer Score</p>
                <p className="text-2xl font-bold">{computerScore}</p>
              </div>
              <div className="col-span-2">
                <p className="text-[#45D62E] font-ibm text-xl font-bold">
                  {playerScore > computerScore
                    ? "🎉 You Won! 🎉"
                    : playerScore < computerScore
                    ? "Better luck next time!"
                    : "It's a tie!"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              onClick={handleRestart}
              className="bg-transparent hover:bg-[#FF0B7A]/10 text-[#FF0B7A] border-2 border-[#FF0B7A] flex items-center gap-2"
            >
              <RefreshCcw size={18} />
              Play Again
            </Button>
            <Button
              onClick={() => router.push("/gamecenter")}
              className="bg-[#FF0B7A] hover:bg-[#FF0B7A]/80 flex items-center gap-2"
            >
              <Home size={18} />
              Return Home
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function MemeCardComponent({ card }: { card: MemeCard }) {
  return (
    <Card className="bg-[#1A1A1A] border-2 border-[#FF0B7A] overflow-hidden">
      <CardContent className="p-3">
        <div className="relative w-full h-40">
          <Image
            src={card.imageUrl}
            alt="Meme Card"
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="mt-2 space-y-1">
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              <Swords size={16} className="text-[#FF0B7A] mr-1" />
              {card.power}
            </span>
            <span className="flex items-center">
              <Shield size={16} className="text-[#45D62E] font-ibm mr-1" />
              {card.defense}
            </span>
            <span className="flex items-center">
              <Zap size={16} className="text-[#FF0B7A] mr-1" />
              {card.special}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 