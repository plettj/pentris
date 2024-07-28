"use client";

import { useTheme } from "@/context/ThemeContext";
import { score } from "game/objects";
import { useCallback, useState } from "react";

export default function Score({ width }: { width: number }) {
  const { theme } = useTheme();
  const [currentScore, setCurrentScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);

  const handleScore = useCallback(() => {
    setCurrentScore(score.score);
    setCurrentLevel(score.level);
  }, []);

  score.setOnChange(handleScore);

  return (
    <section className="absolute left-0 top-0 right-0 py-2 flex items-center justify-center tracking-tighter">
      <div className="flex gap-2 px-2" style={{ width: width }}>
        <p className="text-lg" style={{ color: theme.pieces.ghost }}>
          Score:
        </p>
        <p className="text-lg" style={{ color: theme.outline }}>
          {currentScore}
        </p>
        <div className="flex-1" />
        <p className="text-lg" style={{ color: theme.pieces.ghost }}>
          Level:
        </p>
        <p className="text-lg" style={{ color: theme.outline }}>
          {currentLevel + 1}
        </p>
      </div>
    </section>
  );
}
