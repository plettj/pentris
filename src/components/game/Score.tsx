"use client";

import { score } from "game/objects";
import { useCallback, useState } from "react";

export default function Score() {
  const [currentScore, setCurrentScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);

  const handleScore = useCallback(() => {
    setCurrentScore(score.score);
    setCurrentLevel(score.level);
  }, []);

  score.setOnChange(handleScore);

  return (
    <section className="absolute left-0 top-0 right-0 py-2 flex items-center justify-center">
      <div className="flex items-center gap-2">
        <p className="text-zinc-400 text-lg">Score:</p>
        <p className="text-white text-lg">{currentScore}</p>
        <div className="w-14" />
        <p className="text-zinc-400 text-lg">Level:</p>
        <p className="text-white text-lg">{currentLevel}</p>
      </div>
    </section>
  );
}
