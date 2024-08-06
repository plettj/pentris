"use server";

import Score from "@/game/logic/score";
import { sanitizeUsername } from "@/game/util";
import { prisma } from "@/lib/prisma";
import { GameData, GameMode, ScoreList, SetScoreSchema } from "./schema";

function validateGame(data: GameData): boolean {
  if (
    data.level < 0 ||
    data.score < 0 ||
    data.lines < 0 ||
    data.totalTime < 0
  ) {
    return false;
  }
  if (Math.abs(data.totalTime / 60 - data.level) > 2) {
    return false;
  }
  if (data.lines > 10 && data.lines < data.level) {
    return false;
  }
  if ((Score.getPoints(5, data.level) * data.lines) / 5 > data.score) {
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

  if (!validateGame(gameData)) {
    return;
  }

  await prisma.highScore.upsert({
    where: { id },
    update: { value, username: sanitizedUsername },
    create: { id, userId, username: sanitizedUsername, value, mode },
  });
}
