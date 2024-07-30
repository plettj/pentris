"use server";

import { sanitizeUsername } from "@/game/util";
import { prisma } from "@/lib/prisma";
import { GameMode, ScoreList, SetScoreSchema } from "./schema";

export async function fetchHighScores(mode: GameMode) {
  const scores = await prisma.highScore.findMany({
    where: {
      mode,
    },
    select: {
      username: true,
      value: true,
    },
    orderBy: {
      value: "desc",
    },
  });

  return scores as ScoreList;
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
