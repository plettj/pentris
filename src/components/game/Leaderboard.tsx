"use client";

import { fetchHighScores } from "@/actions/leaderboard";
import { useTheme } from "@/context/ThemeContext";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export default function Leaderboard() {
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false); // To prevent server<>client errors

  const [userId] = useLocalStorage("userId", "");
  const [username] = useLocalStorage("username", "");
  const [highScore, setHighScore] = useLocalStorage("highScore", "");

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => fetchHighScores("normal"),
  });

  if (error) throw new Error("Leaderboard fetching error:", error);

  const noData = isPending || isFetching || data.length === 0;

  if (!noData) {
    data.forEach((score) => {
      // Replacing the database username with your local username, to limit trollers :P
      if (score.userId === userId) {
        score.username = username;
      }
    });
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section
      className="flex flex-col w-full gap-3 py-2 text-center overflow-hidden"
      style={{ color: theme.outline }}
    >
      <h2 className="text-2xl">Leaderboard</h2>
      <hr className="border my-1" style={{ borderColor: theme.outline }} />
      <section className="overflow-y-auto max-h-full">
        {noData ? (
          <div style={{ color: theme.pieces.ghost }}>
            Loading high scores...
          </div>
        ) : (
          data.map((score, index) => (
            <div className="grid grid-cols-2 gap-1" key={index}>
              <div
                className="text-left"
                style={{
                  color:
                    score.username === "Anonymous"
                      ? theme.pieces.ghost
                      : theme.pieces.placed,
                  fontWeight:
                    score.username === "Anonymous" ? "normal" : "lighter",
                }}
              >
                {score.username}
              </div>
              <div className="text-right" style={{ color: theme.outline }}>
                {score.value}
              </div>
            </div>
          ))
        )}
      </section>
      <hr className="border my-1" style={{ borderColor: theme.outline }} />
      {isClient && (
        <div className="grid grid-cols-2 gap-2">
          <div
            className="text-left"
            style={{
              color: theme.pieces.placed,
            }}
          >
            {username === "" ? "You (Anonymous)" : username}
          </div>
          <div className="text-right" style={{ color: theme.outline }}>
            {highScore}
          </div>
        </div>
      )}
    </section>
  );
}
