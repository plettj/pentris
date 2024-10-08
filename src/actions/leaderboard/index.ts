"use server";

import { sanitizeUsername } from "@/game/util";
import { prisma } from "@/lib/prisma";
import { GameData, GameMode, ScoreList, SetScoreSchema } from "./schema";

async function validateGame(data: GameData) {
  if (
    data.level < 0 ||
    data.score < 0 ||
    data.lines < 0 ||
    data.totalTime < 0
  ) {
    console.warn("Player submitted explicitly invalid game data.");
    return false;
  }
  if (
    data.level < data.startLevel ||
    (Math.floor(data.lines / 10) > data.startLevel &&
      Math.floor(data.lines / 10) !== data.level)
  ) {
    console.warn(
      "Player cleared the wrong amount of lines for their level achieved."
    );
    return false;
  }
  if (
    (25 * Math.floor(Math.sqrt(data.level + 1)) * data.lines) / 5 <
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

  return scores as ScoreList;
}

export async function getTotalPlayers() {
  return prisma.highScore.count();
}

export async function putHighScore({
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
    where: {
      id: "00000000-0000-0000-0000-000000000000",
      userId,
      mode,
    },
    update: { value, username: sanitizedUsername },
    create: { userId, username: sanitizedUsername, value, mode },
  });

  return highScore !== null;
}
