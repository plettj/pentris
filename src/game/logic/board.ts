import { graphics, score, theme } from "game/objects";
import { bucketTwelve } from "../constants";
import { shuffle } from "../util";
import Pent from "./pentomino";

class Board {
  /**
   * The game board state. Anything besides 0 is a filled cell,
   * and the number represents the color and shape of the cell.
   */
  grid: number[][];
  topGap: number = 5;
  unit: number = 22;
  size: Coor = [13, 26];

  activePentomino: Pent | null = null;
  bankPentomino: Pent | null = null;
  upcomingPentominoes: Pent[] = [];

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

  move(move: GameAction, down: boolean = true) {
    if (!down) {
      return;
    }

    if (move === "bank") {
      if (!this.canBank) return;
      const temp = this.activePentomino!;
      this.activePentomino = this.bankPentomino;
      this.bankPentomino = temp;
      this.bankPentomino.set();
      this.canBank = false;
      return;
    }

    if (!this.activePentomino) return;

    this.activePentomino.move(move);
  }

  draw() {
    // Draw top line of the board.
    let ctx = graphics.contexts[0];
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.strokeStyle = theme.getTheme().outline;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, this.unit * this.topGap);
    ctx.lineTo(this.unit * this.size[0], this.unit * this.topGap);
    ctx.stroke();
    ctx.closePath();

    // Draw main board screen.
    ctx = graphics.contexts[1];
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // This will be much more dynamic once piece themes are implemented.
    ctx.fillStyle = theme.getTheme().pieces.placed;
    for (let y = 0; y < this.size[1]; y++) {
      for (let x = 0; x < this.size[0]; x++) {
        if (this.grid[y][x]) {
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
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (this.bankPentomino) {
      this.bankPentomino.drawBank();
    }

    this.upcomingPentominoes.forEach((pent, i) => {
      pent.drawUpcoming(i);
    });
  }

  render() {
    if (this.activePentomino) {
      this.activePentomino.render();
    }

    // TODO: Make this not happen on every single render!
    this.draw();
  }

  place() {
    if (!this.activePentomino) return;

    const shape = this.activePentomino.getShape();
    const coor = this.activePentomino.coor;

    shape.points.forEach(([x, y]) => {
      this.grid[coor[1] + y][coor[0] + x] = 1;
    });

    this.checkBreak();

    this.canBank = true;
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

  checkBreak() {
    let rows = 0;

    for (let i = 0; i < this.grid.length; i++) {
      if (this.grid[i].every((val) => val)) {
        this.grid.splice(i, 1);
        this.grid.unshift(new Array(this.grid[0].length).fill(0));
        rows++;
      }
    }

    score.updateScore(rows);
  }
}

export default Board;
