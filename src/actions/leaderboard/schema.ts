export type GameMode = "normal";

export type ScoreList = { userId: string; username: string; value: number }[];

export type SetScoreSchema = {
  id: string;
  userId: string;
  username: string;
  value: number;
  mode: GameMode;
};
