import { bucketTwelve } from "../constants";
import { shuffle } from "../util";
import Pent from "./pentomino";
import { graphics } from "game/objects";

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
    this.activePentomino = new Pent("P");

    // Draw top line as a FIXME: `white` line
    const ctx = graphics.contexts[0];
    ctx.strokeStyle = "#FFF";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, unit * this.topGap);
    ctx.lineTo(unit * this.size[0], unit * this.topGap);
    ctx.stroke();
    ctx.closePath();

    for (let i = 0; i < 3; i++) {
      this.upcomingPentominoes.push(this.newPentomino());
    }

    this.bankPentomino = this.newPentomino();
    this.activePentomino = this.newPentomino();
  }

  newPentomino(): Pent {
    if (this.bucket.length === 0) {
      this.bucket = bucketTwelve.map((name) => new Pent(name));
      this.bucket = shuffle(this.bucket);
    }

    return this.bucket.shift()!;
  }

  move(move: GameAction, down: boolean = true) {
    console.log(move);

    if (!down) {
      return;
    }

    if (move === "bank") {
      // TODO: Implement banking
      return;
    }

    if (!this.activePentomino) return;

    this.activePentomino.move(move);
  }

  draw() {
    let ctx = graphics.contexts[1];

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (let y = 0; y < this.size[1]; y++) {
      for (let x = 0; x < this.size[0]; x++) {
        if (this.grid[y][x]) {
          ctx.fillStyle = "#FFF";
          ctx.fillRect(
            x * this.unit,
            (y + this.topGap) * this.unit,
            this.unit,
            this.unit
          );
        }
      }
    }
  }

  render() {
    if (this.activePentomino) {
      this.activePentomino.render();
    }
    this.draw();
  }

  place() {
    if (!this.activePentomino) return;

    const shape = this.activePentomino.getShape();
    const coor = this.activePentomino.coor;

    shape.points.forEach(([x, y]) => {
      this.grid[coor[1] + y][coor[0] + x] = 1;
    });

    this.activePentomino = this.newPentomino();
  }

  isCollide(shape: Shape, coor: Coor): boolean {
    return shape.points.some(([x, y]) => {
      if (
        coor[0] + x < 0 ||
        coor[0] + x >= this.size[0] ||
        coor[1] + y >= this.size[1]
      ) {
        return true;
      } else if (coor[1] + y < 0) {
        return false;
      }

      return this.grid[coor[1] + y][coor[0] + x] !== 0;
    });
  }
}

export default Board;
