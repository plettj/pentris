"use client";

import { putHighScore } from "@/actions/leaderboard";
import { useTheme } from "@/context/ThemeContext";
import { useQueryClient } from "@tanstack/react-query";
import { score } from "game/objects";
import { useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { v4 as uuid } from "uuid";
import Modal from "../general/Modal";

export default function Score({ width }: { width: number }) {
  const queryClient = useQueryClient();
  const { theme } = useTheme();
  const [highScore, setHighScore] = useLocalStorage("highScore", "");
  const [userId, setUserId] = useLocalStorage("userId", "");
  const [username, setUsername] = useLocalStorage("username", "");
  const [usernameModalOpen, setUsernameModalOpen] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [tempUsername, setTempUsername] = useState(username);

  const handleScore = useCallback(() => {
    setCurrentScore(score.score);
    setCurrentLevel(score.level);
  }, []);

  score.setOnChange(handleScore);

  const handleHighScore = useCallback(async () => {
    setHighScore(score.score.toString());
    console.log("New high score:", score.score);
    await putHighScore({
      id: userId,
      userId: userId,
      username: username === "" ? "Anonymous" : username,
      value: score.score,
      mode: "normal",
    });
    queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
  }, [setHighScore, userId, username, queryClient]);

  score.setOnHighScoreChange(handleHighScore);

  useEffect(() => {
    if (userId === "") {
      setUserId(uuid());
    }

    score.init(parseInt(highScore), userId);
  }, [highScore, userId, setUserId]);

  useEffect(() => {
    if (username === "") {
      setUsernameModalOpen(true);
    } else {
      graphics?.pause(false);
    }
  }, [username, setUsernameModalOpen]);

  const handleSetUsername = (success: boolean) => {
    if (success) {
      setUsername(tempUsername);
    }

    graphics?.pause(false);
  };

  return (
    <>
      <section className="absolute left-0 top-0 right-0 py-2 flex items-center justify-center tracking-tighter">
        <div className="flex gap-2 px-2" style={{ width: width }}>
          <p className="text-lg" style={{ color: theme.pieces.ghost }}>
            Score:
          </p>
          <p className="text-lg" style={{ color: theme.outline }}>
            {currentScore}
          </p>
          <div className="flex-1" />
          <p className="text-lg" style={{ color: theme.pieces.ghost }}>
            Level:
          </p>
          <p className="text-lg" style={{ color: theme.outline }}>
            {currentLevel + 1}
          </p>
        </div>
      </section>
      <Modal
        title="Set your Username"
        description="This is what you'll be known as on the leaderboard. Hit cancel if you'd like to stay anonymous."
        action="Set"
        open={usernameModalOpen}
        setOpen={setUsernameModalOpen}
        submitAction={handleSetUsername}
        textInput={true}
        inputValue={tempUsername}
        setInputValue={setTempUsername}
      />
    </>
  );
}
