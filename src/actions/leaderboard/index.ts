"use server";

import { sanitizeUsername } from "@/game/util";
import { prisma } from "@/lib/prisma";
import { GameData, GameMode, ScoreList, SetScoreSchema } from "./schema";

async function validateGame(data: GameData) {
  if (
    data.level < 0 ||
    data.score < 0 ||
    data.lines < 0 ||
    data.totalTime < 1
  ) {
    console.warn("Player submitted explicitly invalid game data.");
    return false;
  }
  if (Math.floor(Math.abs(data.totalTime / 60 - data.level)) > data.level) {
    console.warn("Player either cheated past levels or paused the game.");
    return false;
  }
  if (data.lines < data.level - 10) {
    console.warn("Player didn't clear enough lines for their level achieved.");
    return false;
  }
  if (
    (25 * Math.floor(Math.pow(data.level, 0.72) + 1) * data.lines) / 5 <
    data.score
  ) {
    console.warn(
      "Player's score is impossibly large given their lines cleared."
    );
    return false;
  }

  return true;
}

export async function fetchHighScores(mode: GameMode) {
  const scores = await prisma.highScore.findMany({
    where: {
      value: { gte: 100 },
      mode,
    },
    select: {
      userId: true,
      username: true,
      value: true,
    },
    orderBy: {
      value: "desc",
    },
  });

  return scores.slice(0, 100) as ScoreList;
}

export async function getTotalPlayers() {
  return prisma.highScore.count();
}

export async function putHighScore({
  id,
  userId,
  username,
  value,
  mode,
  gameData,
}: SetScoreSchema) {
  const sanitizedUsername = sanitizeUsername(username);

  const legalGame = await validateGame(gameData);

  if (!legalGame) {
    return false;
  }

  const highScore = await prisma.highScore.upsert({
    where: { id },
    update: { value, username: sanitizedUsername },
    create: { id, userId, username: sanitizedUsername, value, mode },
  });

  return highScore !== null;
}
