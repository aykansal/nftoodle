'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import type { GameCard, Meme } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Loader from '@/components/loader';
import { useRouter } from 'next/navigation';
import { Home, RefreshCcw } from 'lucide-react';
import { Modal } from '@/components/ui/modal';
import { toast } from 'sonner';
import Image from 'next/image';

export default function Matchmeme() {
  const router = useRouter();
  const [memes, setMemes] = useState<Meme[]>([]);
  const [cards, setCards] = useState<GameCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [showEndGameModal, setShowEndGameModal] = useState(false);
  const [showGameSummaryModal, setShowGameSummaryModal] = useState(false);

  // Fetch memes from Cloudinary
  useEffect(() => {
    const fetchMemes = async () => {
      try {
        setLoading(true);
        const memes = await axios
          .get('/api/memes?page=1&limit=13')
          .then((res) => res?.data?.memes);

        if (!memes.length) {
          toast.error('No Memes Found! Create Some then try again')
          throw new Error('No memes found');
        }
        console.log(memes)
        setMemes(memes);
      } catch (error) {
        console.error('Error fetching memes:', error);
        toast.error('Failed to load memes. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMemes();
  }, []);

  // Initialize game
  const initializeGame = () => {
    if (memes.length < 6) {
      toast.error(
        'Not enough memes to start the game. At least 6 memes are required.'
      );
      console.error(
        'Not enough memes to start the game. At least 6 memes are required.'
      );
      return;
    }

    // Select 6 random memes
    const shuffledMemes = [...memes]
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);

    // Create pairs of cards
    const gameCards: GameCard[] = [...shuffledMemes, ...shuffledMemes]
      .map((meme, index) => ({
        id: index,
        cloudinaryUrl: meme.cloudinaryUrl, // Use the secure cloudinary URL
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);

    setCards(gameCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setScore(0);
    setGameStarted(true);
  };

  // Handle card click
  const handleCardClick = (cardId: number, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default navigation

    if (
      !gameStarted ||
      flippedCards.length === 2 || // Don't allow more than 2 cards flipped
      flippedCards.includes(cardId) || // Don't allow same card to be flipped
      cards[cardId].isMatched // Don't allow matched cards to be flipped
    ) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    // Update cards state to show the flipped card
    setCards((prev) =>
      prev.map((card, idx) =>
        idx === cardId ? { ...card, isFlipped: true } : card
      )
    );

    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstCard, secondCard] = newFlippedCards;

      if (cards[firstCard].cloudinaryUrl === cards[secondCard].cloudinaryUrl) {
        // Match found
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card, idx) =>
              idx === firstCard || idx === secondCard
                ? { ...card, isMatched: true, isFlipped: true }
                : card
            )
          );
          setMatchedPairs((prev) => prev + 1);
          setScore((prev) => prev + 100); // Add 100 points for each match
          setFlippedCards([]);
        }, 500);
      } else {
        // No match - just flip the cards back
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card, idx) =>
              idx === firstCard || idx === secondCard
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Check for game completion
  useEffect(() => {
    if (gameStarted && matchedPairs === 6) {
      if (score > bestScore) {
        setBestScore(score);
        localStorage.setItem('memeGameBestScore', score.toString());
      }

      setTimeout(() => {
        setShowGameSummaryModal(true);
      }, 1000);
    }
  }, [matchedPairs, score, bestScore, gameStarted]);

  // Handle end game confirmation
  const handleEndGame = () => {
    setShowEndGameModal(true);
  };

  const handleEndGameConfirm = () => {
    setShowEndGameModal(false);
    setShowGameSummaryModal(true);
  };

  // Handle game restart
  const handleRestart = () => {
    setShowGameSummaryModal(false);
    initializeGame();
  };

  // Handle return to home
  const handleReturnHome = () => {
    router.push('/gamezone');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[66vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-8 min-h-full text-white">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#FF0B7A] mb-4">
            NFToodle Memory Game
          </h1>
          <p className="text-lg text-green-400 mb-4">
            Match the meme pairs to win! Each match is worth 100 points
          </p>
          <div className="flex justify-center gap-4 mb-4">
            <div className="text-[#FF0B7A]">Moves: {moves}</div>
            <div className="text-[#FF0B7A]">Score: {score}</div>
            <div className="text-[#FF0B7A]">Best Score: {bestScore}</div>
          </div>
          <div className="flex justify-center gap-4">
            <Button
              onClick={initializeGame}
              className="bg-[#FF0B7A] hover:bg-[#FF0B7A]/80 text-white px-6 py-2 rounded-full"
            >
              {gameStarted ? 'Restart Game' : 'Start Game'}
            </Button>
            {gameStarted && (
              <Button
                onClick={handleEndGame}
                className="bg-transparent hover:bg-[#FF0B7A]/10 text-[#FF0B7A] border-2 border-[#FF0B7A] px-6 py-2 rounded-full flex items-center gap-2"
              >
                <Home size={18} />
                End Game
              </Button>
            )}
          </div>
        </header>

        {gameStarted && (
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            <AnimatePresence>
              {cards.map((card) => (
                <motion.div
                  key={card.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square"
                >
                  <Card
                    className={`w-full h-full bg-[#1A1A1A] cursor-pointer transition-all duration-500 ${
                      card.isMatched ? 'opacity-60' : ''
                    }`}
                    onClick={(e) => handleCardClick(card.id, e)}
                  >
                    <CardContent className="p-0 w-full h-full relative">
                      <div
                        className={`w-full h-full transition-all duration-500 transform ${
                          card.isFlipped || card.isMatched
                            ? 'rotate-y-0'
                            : 'rotate-y-180'
                        }`}
                      >
                        <div className="w-full h-full">
                          {card.isFlipped || card.isMatched ? (
                            <div className="relative w-full h-full">
                              <Image
                                src={card.cloudinaryUrl}
                                alt="Meme Card"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover rounded-lg"
                                priority={true}
                                onError={(e) => {
                                  console.error(
                                    `Failed to load image: ${card.cloudinaryUrl}`
                                  );
                                  const target = e.target as HTMLImageElement;
                                  target.onerror = null;
                                  target.src = '/images/logo.jpg';
                                }}
                              />
                            </div>
                          ) : (
                            <div className="w-full h-full bg-[#1A1A1A] rounded-lg border-2 border-[#FF0B7A] flex items-center justify-center">
                              <span className="text-4xl text-[#FF0B7A]">?</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {matchedPairs === 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <h2 className="text-2xl font-bold text-[#FF0B7A] mb-4">
              🎉 Congratulations! 🎉
            </h2>
            <p className="text-lg">
              You completed the game in {moves} moves with a score of {score}!
            </p>
          </motion.div>
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
            <p className="text-white">Game Statistics:</p>
            <div className="grid grid-cols-2 gap-4 bg-[#0A0A0A] p-4 rounded-lg">
              <div>
                <p className="text-[#FF0B7A]">Moves Made</p>
                <p className="text-2xl font-bold">{moves}</p>
              </div>
              <div>
                <p className="text-[#FF0B7A]">Final Score</p>
                <p className="text-2xl font-bold">{score}</p>
              </div>
              <div>
                <p className="text-[#FF0B7A]">Best Score</p>
                <p className="text-2xl font-bold">{bestScore}</p>
              </div>
              <div>
                <p className="text-[#FF0B7A]">Pairs Matched</p>
                <p className="text-2xl font-bold">{matchedPairs}/6</p>
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
              onClick={handleReturnHome}
              className="bg-[#FF0B7A] hover:bg-[#FF0B7A]/80 flex items-center gap-2"
            >
              <Home size={18} />
              Return Gamezone
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
