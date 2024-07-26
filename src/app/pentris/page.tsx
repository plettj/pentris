"use client";

import Game from "@/components/game/Game";
import ThemeButton from "@/components/general/ThemeButton";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";

export default function Pentris() {
  const { themeName, theme } = useTheme();

  return (
    <>
      <div className="relative">
        <div className="absolute flex flex-col top-6 left-4 gap-4">
          <ThemeButton />
          <Image
            src={
              themeName === "light"
                ? "/static/controlsLight.png"
                : "/static/controlsDark.png"
            }
            alt="Controls: Arrow keys for movement, A and D to rotate, W/Space to reflect, S to bank"
            width={340}
            height={160}
            className="w-64 h-auto"
          />
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
    </>
  );
}
