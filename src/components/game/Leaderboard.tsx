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
  const [highScore] = useLocalStorage("highScore-classic", "");

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => fetchHighScores("classic"),
  });

  const noData = isPending || isFetching || error || data.length === 0;

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
      className="flex flex-col w-full h-full gap-3 py-2 text-center overflow-hidden"
      style={{ color: theme.outline }}
    >
      <h2 className="text-2xl">Leaderboard</h2>
      <hr className="border my-1" style={{ borderColor: theme.outline }} />
      <section className="max-h-80 overflow-y-auto scrollbar pr-1">
        {noData ? (
          <div style={{ color: theme.pieces.ghost }}>
            Loading high scores...
          </div>
        ) : (
          data.map((score, index) => (
            <div className="grid grid-cols-8 gap-1" key={index}>
              <p
                className="text-left col-span-1"
                style={{ color: theme.pieces.ghost }}
              >
                {index + 1}.
              </p>
              <div
                className="text-left col-span-5"
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
              <div
                className="text-right col-span-2"
                style={{ color: theme.outline }}
              >
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
