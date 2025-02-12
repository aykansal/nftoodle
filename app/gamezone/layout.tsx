import { GameProvider } from '@/contexts/GameContext';

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GameProvider>{children}</GameProvider>;
} 