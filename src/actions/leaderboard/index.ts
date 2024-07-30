"use server";

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
  await prisma.highScore.upsert({
    where: { id },
    update: { value, username },
    create: { id, userId, username, value, mode },
  });
}
