import { GameProvider } from "@/contexts/GameContext";
import { Outlet } from "react-router";

const GameLayout = () => {
  return (
    <GameProvider>
      <Outlet />
    </GameProvider>
  );
};

export default GameLayout;
