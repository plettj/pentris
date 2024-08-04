"use client";

import { useTheme } from "@/context/ThemeContext";
import { score } from "game/objects";
import { useEffect, useState } from "react";

export default function Time() {
  const { theme } = useTheme();

  const [isClient, setIsClient] = useState(false); // To prevent server<>client errors
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <p style={{ color: theme.pieces.ghost }}>
      Time:{" "}
      <span style={{ color: theme.outline }}>
        {isClient ? score?.getSeconds() ?? 0 : 0}
      </span>
    </p>
  );
}
