import { GameMode } from "@/actions/leaderboard/schema";
import { levelLength, levelSpeeds, rowScores } from "../constants";

export default class Score {
  score: number = 0;
  lines: number = 0;
  highScore: number = 0;
  userId: string = "";
  mode: GameMode = "classic";

  private rowScores: number[] = rowScores;
  private levelSpeeds: number[] = levelSpeeds;
  private startTime: number = 0;

  levelLength: number = levelLength;
  startLevel = 0;
  level = 0;

  private onChange: () => void = () => {};
  private onHighScoreChange: () => void = () => {};
  private onGameOver: () => void = () => {};

  constructor() {}

  init(highScore: number, userId: string) {
    this.score = 0;
    this.level = this.startLevel;
    this.lines = 0;
    this.highScore = highScore;
    this.userId = userId;
  }

  start() {
    this.startTime = Date.now();
  }

  reset() {
    this.score = 0;
    this.level = this.startLevel;
    this.lines = 0;
    this.onChange();
  }

  getSpeed() {
    if (this.level + 1 >= 36) return 1;
    return this.levelSpeeds[
      this.level >= this.levelSpeeds.length
        ? this.levelSpeeds.length - 1
        : this.level
    ];
  }

  getSeconds() {
    const seconds = Math.floor(Math.abs(Date.now() - this.startTime) / 1000);
    return this.startTime === 0 ? 0 : seconds;
  }

  updateScore(rows: number) {
    if (rows < 1) return;

    this.lines += rows;
    if (this.lines >= (this.level + 1) * 10) {
      this.updateLevel();
    }
    this.score += this.rowScores[rows] * Math.floor(Math.sqrt(this.level + 1));
    this.onChange();
  }

  updateLevel() {
    this.level++;
    this.onChange();
  }

  setOnChange(callback: () => void) {
    this.onChange = callback;
  }

  setOnHighScoreChange(callback: () => void) {
    this.onHighScoreChange = callback;
  }

  setOnGameOver(callback: () => void) {
    this.onGameOver = callback;
  }

  gameOver() {
    this.onChange();
    this.saveHighScore();
    setTimeout(() => {
      this.onGameOver();
    }, 3000);
  }

  saveHighScore() {
    const newHighScore = !this.highScore || this.score > this.highScore;

    if (!newHighScore) {
      return;
    }

    this.onHighScoreChange();
  }
}
