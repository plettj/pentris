"use server";

import { sanitizeUsername } from "@/game/util";
import { prisma } from "@/lib/prisma";
import { GameMode, ScoreList, SetScoreSchema } from "./schema";

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

export async function putHighScore({
  id,
  userId,
  username,
  value,
  mode,
}: SetScoreSchema) {
  const sanitizedUsername = sanitizeUsername(username);

  await prisma.highScore.upsert({
    where: { id },
    update: { value, username: sanitizedUsername },
    create: { id, userId, username: sanitizedUsername, value, mode },
  });
}
