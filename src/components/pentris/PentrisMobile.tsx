"use client";

import { useTheme } from "@/context/ThemeContext";
import { HOME_HREF } from "@/lib/constants";
import Link from "next/link";
import Leaderboard from "../game/Leaderboard";
import { Button } from "../ui/button";

export default function PentrisMobile() {
  const { theme } = useTheme();
  return (
    <div
      className="lg:hidden flex flex-col items-center justify-center h-full px-4"
      style={{ backgroundColor: theme.background, color: theme.outline }}
    >
      <h1 className="text-3xl">Pentris</h1>
      <p>Pentris requires a larger screen to play.</p>
      <Button className="my-6 text-black" variant="outline" asChild>
        <Link href={HOME_HREF}>Back to Home</Link>
      </Button>
      <div className="max-w-96">
        <Leaderboard />
      </div>
    </div>
  );
}
