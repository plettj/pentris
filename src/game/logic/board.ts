import { graphics, score, theme } from "game/objects";
import { bucketTwelve } from "../constants";
import { easeOutQuad, moveIsTranslate, shuffle } from "../util";
import Pent from "./pentomino";

class Board {
  // Board Display
  /**
   * The game board state. Anything besides 0 is a filled cell,
   * and the number represents the color and shape of the cell.
   */
  grid: number[][];
  unit: number = 22;
  size: Coor = [13, 26];
  readonly topGap: number = 5;

  breaksAnimating: number[] = [];
  breaksTimer: number = 0;
  readonly breaksTimerLimit: number = 25;

  // Pentominoes
  activePentomino: Pent | null = null;
  bankPentomino: Pent | null = null;
  upcomingPentominoes: Pent[] = [];

  // Dynamic Settling
  settleTimer: number = 0;
  settleCount: number = 0;
  readonly settleTimerLimit: number = 25;
  readonly settleCountLimit: number = 2;

  // Controls
  keys: boolean[] = [false, false, false]; // [left, right, down]
  slideTimer: number = 0;
  slideFirst: boolean = true;
  readonly slideSpeed: number = 4;

  // Banking
  canBank: boolean = true;
  private bucket: Pent[] = [];

  constructor() {
    this.grid = Array.from(
      { length: this.size[1] },
      () => Array(this.size[0]).fill(0) as number[]
    );
  }

  init(unit: number) {
    this.unit = unit;

    this.upcomingPentominoes = [];
    for (let i = 0; i < 3; i++) {
      this.upcomingPentominoes.push(this.newPentomino());
    }

    this.bankPentomino = this.newPentomino();
    this.activePentomino = this.newPentomino();
  }

  refreshSize(unit: number) {
    this.unit = unit;
    this.draw();
  }

  newPentomino(): Pent {
    if (this.bucket.length === 0) {
      this.bucket = bucketTwelve.map((name) => new Pent(name));
      this.bucket = shuffle(this.bucket);
    }

    return this.bucket.shift()!;
  }

  /**
   * Keypress utility for smooth translation controls.
   */
  handleKeys() {
    const key = this.keys.indexOf(true);

    if (key === -1) return;

    if (this.slideTimer < this.slideSpeed * (this.slideFirst ? 2.5 : 1)) {
      this.slideTimer++;
      return;
    } else {
      this.slideTimer = 0;
      this.slideFirst = false;
      this.activePentomino!.move(this.getMoveFromKey(key));
    }
  }

  getKeyFromMove(move: TranslateAction): number {
    switch (move) {
      case "left":
        return 0;
      case "right":
        return 1;
      case "down":
        return 2;
    }
  }

  getMoveFromKey(key: number): TranslateAction {
    switch (key) {
      case 0:
        return "left";
      case 1:
        return "right";
      case 2:
      default:
        return "down";
    }
  }

  move(move: GameAction, down: boolean = true) {
    if (moveIsTranslate(move)) {
      const key = this.getKeyFromMove(move as TranslateAction);
      const currentlyPressed = this.keys[key];

      if (currentlyPressed && down) return;

      this.keys[key] = down;

      if (!down && currentlyPressed) {
        this.slideTimer = 0;
        this.slideFirst = true;
      }
    }

    if (!down || !this.activePentomino) {
      return;
    }

    if (move === "bank") {
      if (!this.canBank) return;
      const temp = this.activePentomino;
      this.activePentomino = this.bankPentomino;
      this.bankPentomino = temp;
      this.bankPentomino.set();
      this.canBank = false;
      return;
    }

    this.activePentomino.move(move);
  }

  draw() {
    // Draw top line of the board.
    let ctx = graphics.contexts[0];
    graphics.clear(0);
    ctx.strokeStyle = theme.getTheme().outline;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, this.unit * this.topGap);
    ctx.lineTo(this.unit * this.size[0], this.unit * this.topGap);
    ctx.stroke();
    ctx.closePath();

    // Draw main board screen.
    ctx = graphics.contexts[1];
    graphics.clear(1);
    // This will be much more dynamic once piece themes are implemented.
    ctx.fillStyle = theme.getTheme().pieces.placed;

    const aCtx = graphics.contexts[3];
    if (this.breaksAnimating.length > 0) {
      graphics.clear(3);
      const progress = easeOutQuad(
        (this.breaksTimerLimit - this.breaksTimer) / this.breaksTimerLimit
      );
      aCtx.globalAlpha = progress;
      aCtx.fillStyle = theme.getTheme().pieces.placed;
    }
    for (let y = 0; y < this.size[1]; y++) {
      for (let x = 0; x < this.size[0]; x++) {
        if (this.breaksAnimating.includes(y)) {
          aCtx.fillRect(
            x * this.unit,
            (y + this.topGap) * this.unit,
            this.unit,
            this.unit
          );
        } else if (this.grid[y][x]) {
          ctx.fillRect(
            x * this.unit,
            (y + this.topGap) * this.unit,
            this.unit,
            this.unit
          );
        }
      }
    }

    // Draw bank + upcoming pentominoes.
    ctx = graphics.contexts[4];
    graphics.clear(4);

    if (this.bankPentomino) {
      this.bankPentomino.drawBank();
    }

    this.upcomingPentominoes.forEach((pent, i) => {
      pent.drawUpcoming(i);
    });
  }

  render() {
    if (this.breaksAnimating.length > 0) {
      this.breaksTimer++;

      if (this.breaksTimer < this.breaksTimerLimit) {
        this.draw();
        return;
      }

      graphics.contexts[3].globalAlpha = 1;

      this.breaksAnimating.forEach((row) => {
        this.grid.splice(row, 1);
        this.grid.unshift(new Array(this.size[0]).fill(0));
      });

      this.breaksAnimating = [];
      this.breaksTimer = 0;
      this.enterNewPentomino();
    }

    if (this.activePentomino) {
      this.handleKeys();
      this.activePentomino.render();

      if (this.activePentomino.isSettling) {
        this.settleTimer++;
        if (
          this.settleTimer > this.settleTimerLimit ||
          this.activePentomino.isStuck()
        ) {
          this.place();
          this.settleTimer = 0;
        }
      } else {
        this.settleTimer = 0;
      }
    }

    // TODO: Make this not happen on every single render!
    this.draw();
  }

  /**
   * Resets the settle timer. To be used by the active pentomino
   * when it moves while settling.
   */
  resetSettle() {
    if (this.settleCount < this.settleCountLimit) {
      this.settleTimer = 0;
    }

    this.settleCount++;
  }

  place() {
    if (!this.activePentomino) return;

    const shape = this.activePentomino.getShape();
    const coor = this.activePentomino.coor;

    let lostGame = false;
    shape.points.forEach(([x, y]) => {
      if (coor[1] + y < 0) {
        lostGame = true;
        return;
      }
      this.grid[coor[1] + y][coor[0] + x] = 1;
    });

    if (lostGame) {
      console.log("Game Over!");
      this.activePentomino = null;
      score.saveHighScore();
      return;
    }

    this.breaksAnimating = this.checkBreak();
    score.updateScore(this.breaksAnimating.length);

    if (this.breaksAnimating.length > 0) {
      this.canBank = false;
      this.activePentomino = null;
      graphics.clear(2);
      return;
    }

    this.enterNewPentomino();
  }

  enterNewPentomino() {
    this.canBank = true;
    this.settleTimer = 0;
    this.settleCount = 0;
    this.activePentomino = this.upcomingPentominoes.shift()!;
    this.upcomingPentominoes.push(this.newPentomino());
  }

  isCollide(shape: Shape, coor: Coor, wall: boolean = false): number {
    let wallCollisions = 0;
    let mainCollisions = shape.points.reduce((acc, [x, y]) => {
      if (
        coor[0] + x < 0 ||
        coor[0] + x >= this.size[0] ||
        coor[1] + y >= this.size[1]
      ) {
        wallCollisions++;
        return acc + 1;
      } else if (coor[1] + y < 0) {
        return acc;
      }

      return this.grid[coor[1] + y][coor[0] + x] !== 0 ? acc + 1 : acc;
    }, 0);

    return wall ? wallCollisions : mainCollisions;
  }

  checkBreak(points: Coor[] = []): number[] {
    let rows = [];

    for (let i = 0; i < this.grid.length; i++) {
      let gap = false;

      for (let j = 0; j < this.grid[i].length; j++) {
        if (
          this.grid[i][j] === 0 &&
          !points.some((p) => p[0] === j && p[1] === i)
        ) {
          gap = true;
          break;
        }
      }

      if (!gap) {
        rows.push(i);
      }
    }

    return rows;
  }
}

export default Board;
