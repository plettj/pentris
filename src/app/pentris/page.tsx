"use client";

import Game from "@/components/game/Game";
import ThemeButton from "@/components/general/ThemeButton";
import { useTheme } from "@/context/ThemeContext";

export default function Pentris() {
  const { theme } = useTheme();

  return (
    <>
      <div className="relative">
        <div className="absolute top-6 left-4">
          <ThemeButton />
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
