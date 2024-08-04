import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { board, graphics, score } from "game/objects";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function GameSelect() {
  const { theme } = useTheme();

  const [isMenu, setIsMenu] = useState(true);
  const [finalScores, setFinalScores] = useState<number[]>([]); // [level, score]

  const handleSubmit = () => {
    setIsMenu(false);
    score.start();
    if (graphics.animationFrameId === 0) {
      graphics.animate(0);
    } else {
      graphics.pause(false);
    }
  };

  const handleGameOver = () => {
    setIsMenu(true);
    setFinalScores([score.level, score.score]);
    score.reset();
    graphics.pause(true);
    board.reset();
  };

  useEffect(() => {
    score.setOnGameOver(handleGameOver);
  }, []);

  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col justify-center items-center",
        { hidden: !isMenu }
      )}
      style={{ backgroundColor: theme.background, color: theme.outline }}
    >
      {finalScores.length > 0 ? (
        <>
          <h2 className="text-xl mb-4">Game Over</h2>
          <p style={{ color: theme.pieces.ghost }}>
            Level:{" "}
            <span style={{ color: theme.outline }}>{finalScores[0]}</span>
          </p>
          <p className="mb-6" style={{ color: theme.pieces.ghost }}>
            Score:{" "}
            <span style={{ color: theme.outline }}>{finalScores[1]}</span>
          </p>
        </>
      ) : (
        <h2 className="text-2xl mb-6">Pentris</h2>
      )}
      <Button className="text-black" variant="outline" onClick={handleSubmit}>
        {finalScores.length > 0 ? "Play Again" : "Start Game"}
      </Button>
    </div>
  );
}
