'use client';

import { createContext, useContext, useState } from 'react';

interface GameContextType {
  score: number;
  setScore: (score: number) => void;
  bestScore: number;
  setBestScore: (score: number) => void;
  isGameStarted: boolean;
  setIsGameStarted: (started: boolean) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);

  return (
    <GameContext.Provider
      value={{
        score,
        setScore,
        bestScore,
        setBestScore,
        isGameStarted,
        setIsGameStarted,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
} 