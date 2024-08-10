"use client";

import { fetchHighScores } from "@/actions/leaderboard";
import { useTheme } from "@/context/ThemeContext";
import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "usehooks-ts";
import Players from "./Players";

export default function IndividualStandings() {
  const { theme } = useTheme();
  const [userId] = useLocalStorage("userId", "");
  const [highScore] = useLocalStorage("highScore-classic", "");

  const { data, isLoading, error } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => fetchHighScores("classic"),
  });

  if (isLoading) {
    return <div style={{ color: theme.pieces.ghost }}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ color: theme.pieces.ghost }}>
        Failed to load leaderboard
      </div>
    );
  }

  const place = data
    ? data.findIndex((score) => score.userId === userId) + 1
    : 0;

  return (
    <div
      className="flex flex-col items-end"
      style={{ color: theme.pieces.ghost }}
    >
      {place > 0 ? (
        <p className="text-right">
          Your global ranking:{" "}
          <span style={{ color: theme.outline }}>#{place}</span>
          <br />
          Score
          <span style={{ color: theme.outline }}> {highScore}</span>
        </p>
      ) : (
        <p>
          Your highscore is{" "}
          <span style={{ color: theme.outline }}>
            {isNaN(parseInt(highScore)) ? "0" : highScore}
          </span>
        </p>
      )}
      <Players />
    </div>
  );
}
