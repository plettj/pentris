export type GameMode = "normal" | "classic";

export type ScoreList = { userId: string; username: string; value: number }[];

export type GameData = {
  startLevel: number;
  level: number;
  score: number;
  lines: number;
  totalTime: number; // seconds
};

export type SetScoreSchema = {
  userId: string;
  username: string;
  value: number;
  mode: GameMode;
  gameData: GameData;
};
