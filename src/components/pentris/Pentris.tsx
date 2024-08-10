"use client";

import Game from "@/components/game/Game";
import { useTheme } from "@/context/ThemeContext";
import { ErrorBoundary } from "react-error-boundary";
import GameSelect from "../game/GameSelect";
import Leaderboard from "../game/Leaderboard";
import Time from "../game/Time";

export default function Pentris() {
  const { theme } = useTheme();

  return (
    <div className="h-full hidden lg:inline-block">
      <div className="relative">
        <div className="absolute flex flex-col top-6 left-4 gap-4">
          <Time />
        </div>
      </div>
      <main
        className={`size-full flex justify-center items-center`}
        style={{
          // Inline because of tailwind :/ https://stackoverflow.com/a/71068925/8360465
          backgroundColor: theme.background,
          color: theme.outline,
        }}
      >
        <Game />
      </main>
      <div className="absolute flex flex-col top-6 right-4 gap-4">
        <ErrorBoundary
          fallback={
            <p style={{ color: theme.pieces.ghost }}>Leaderboard error.</p>
          }
        >
          <Leaderboard />
        </ErrorBoundary>
      </div>
      <GameSelect />
    </div>
  );
}
