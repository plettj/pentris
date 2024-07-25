export default class Score {
  score: number = 0;

  private rowScores: number[] = [0, 1, 5, 10, 15, 30];
  private levelSpeeds: number[] = [
    50, 45, 40, 36, 32, 28, 25, 22, 19, 17, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6,
    5,
  ];

  levelLength: number = 5;
  level = 0;

  private onChange: () => void = () => {};

  constructor() {}

  init() {
    this.score = 0;
    this.level = 0;
  }

  getSpeed() {
    return this.levelSpeeds[
      this.level >= this.levelSpeeds.length
        ? this.levelSpeeds.length - 1
        : this.level
    ];
  }

  updateScore(rows: number) {
    if (rows < 1) return;

    this.score += this.rowScores[rows] * Math.floor(Math.sqrt(this.level) + 1);
    this.onChange();
  }

  updateLevel() {
    this.level++;
    this.onChange();
  }

  setOnChange(callback: () => void) {
    this.onChange = callback;
  }
}
