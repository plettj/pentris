export type GameMode = "legacy" | "normal";

export type ScoreList = { userId: string; username: string; value: number }[];

export type GameData = {
  level: number;
  score: number;
  lines: number;
  totalTime: number; // seconds
};

export type SetScoreSchema = {
  id: string;
  userId: string;
  username: string;
  value: number;
  mode: GameMode;
  gameData: GameData;
};
