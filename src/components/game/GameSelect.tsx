import { useTheme } from "@/context/ThemeContext";
import { HOME_HREF } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { board, graphics, score } from "game/objects";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Players from "./Players";

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
    setFinalScores([score.level + 1, score.score]);
    score.reset();
    graphics.pause(true);
    board.reset();
  };

  useEffect(() => {
    score.setOnGameOver(handleGameOver);
  }, []);

  return (
    <div
      className={cn("absolute inset-0", { hidden: !isMenu })}
      style={{ backgroundColor: theme.background, color: theme.outline }}
    >
      <div className="relative size-full flex flex-col justify-center items-center">
        <Button
          variant="ghost"
          className="absolute left-2 top-4 hover:bg-transparent hover:text-inherit"
          style={{ color: theme.outline }}
        >
          <Link
            href="https://github.com/plettj/pentris"
            className="flex items-center"
          >
            <GitHubLogoIcon className="size-5 mr-2" />
            Star the Code
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="absolute left-2 top-14 hover:bg-transparent hover:text-inherit"
          style={{ color: theme.outline }}
        >
          <Link
            href="https://discord.gg/TPxNT4k2DW"
            className="flex items-center"
          >
            <DiscordLogoIcon className="size-5 mr-2" />
            Join the Discord
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="absolute left-2 bottom-4 hover:bg-transparent hover:text-inherit"
          style={{ color: theme.outline }}
        >
          <Link href={HOME_HREF}>Home</Link>
        </Button>
        <div className="absolute top-4 right-4">
          <Players />
        </div>
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
    </div>
  );
}
