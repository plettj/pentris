"use client";

import { fetchHighScores } from "@/actions/leaderboard";
import { useTheme } from "@/context/ThemeContext";
import { useQuery } from "@tanstack/react-query";

export default function Leaderboard() {
  const { theme } = useTheme();

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => fetchHighScores("normal"),
  });

  if (error) throw new Error("Leaderboard fetching error:", error);

  const noData = isPending || isFetching || data.length === 0;

  return (
    <section
      className="flex flex-col w-full gap-2 py-2 text-center"
      style={{ color: theme.outline }}
    >
      <h2 className="text-2xl font-bold">Leaderboard</h2>
      <hr className="border my-1" style={{ borderColor: theme.outline }} />
      {noData ? (
        <div style={{ color: theme.pieces.ghost }}>Loading high scores...</div>
      ) : (
        data.map((score, index) => (
          <div className="grid grid-cols-2 gap-2" key={index}>
            <div style={{ color: theme.pieces.ghost }}>{score.username}</div>
            <div className="font-bold" style={{ color: theme.outline }}>
              {score.value}
            </div>
          </div>
        ))
      )}
    </section>
  );
}
