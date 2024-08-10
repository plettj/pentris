"use client";

import { useTheme } from "@/context/ThemeContext";
import { PENTRIS_HREF } from "@/lib/constants";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "../ui/button";
import Keybinds from "./Keybinds";

export default function PentrisSettings() {
  const { theme } = useTheme();

  return (
    <div
      className="relative w-screen h-screen flex flex-col justify-center items-center"
      style={{ backgroundColor: theme.background, color: theme.outline }}
    >
      <section className="w-96 flex flex-col justify-center items-center">
        <h1 className="text-2xl mb-6">Keybinds</h1>
        <Keybinds />
      </section>
      <Button
        variant="ghost"
        className="absolute left-2 top-4 hover:bg-transparent hover:text-inherit"
        style={{ color: theme.outline }}
      >
        <Link href={PENTRIS_HREF} className="flex items-center">
          <ArrowLeftIcon className="size-5 mr-2" />
          Back
        </Link>
      </Button>
    </div>
  );
}
