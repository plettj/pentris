import { useTheme } from "@/context/ThemeContext";
import { HOME_HREF, PENTRIS_SETTINGS_HREF } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  DiscordLogoIcon,
  GearIcon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons";
import { board, controls, graphics, score } from "game/objects";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "../ui/button";
import IndividualStandings from "./IndividualStandings";

type Keybinds = Map<string, GameAction>;

export default function GameSelect() {
  const { theme } = useTheme();
  const [isMenu, setIsMenu] = useState(true);
  const [startLevel] = useLocalStorage("startLevel", 1);
  const [storedKeybinds] = useLocalStorage<string>(
    "keybinds",
    JSON.stringify(Array.from(controls?.getMapping()))
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    score.setOnGameOver(handleGameOver);
  }, []);

  const handleSubmit = () => {
    setIsMenu(false);

    try {
      const parsedKeybinds: Keybinds = new Map(JSON.parse(storedKeybinds));
      controls.setMapping(parsedKeybinds);
    } catch (error) {
      console.error("Failed to parse stored keybinds:", error);
    }

    score.startLevel = startLevel - 1;
    board.reset();
    score.reset();
    score.start();
    if (graphics.animationFrameId === 0) {
      graphics.animate(0);
    } else {
      graphics.pause(false);
    }
  };

  const handleGameOver = () => {
    setIsMenu(true);
    score.reset();
    graphics.pause(true);
    board.reset();
  };

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
          <Link href={PENTRIS_SETTINGS_HREF} className="flex items-center">
            <GearIcon className="size-5 mr-2" />
            Settings
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="absolute left-2 top-14 hover:bg-transparent hover:text-inherit"
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
          className="absolute left-2 top-24 hover:bg-transparent hover:text-inherit"
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
          <IndividualStandings />
        </div>
        <h1 className="text-2xl mb-6">Pentris</h1>
        {isMounted && (
          <Button
            className="text-black"
            variant="outline"
            onClick={handleSubmit}
          >
            {`Start Game ${startLevel > 1 ? `- lvl ${startLevel}` : ""}`}
          </Button>
        )}
      </div>
    </div>
  );
}
