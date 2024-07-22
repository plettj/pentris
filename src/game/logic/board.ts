import Pent from "./pentomino";
import { graphics } from "game/objects";

class Board {
  size: Coor = [13, 26];
  /**
   * The game board state. Anything besides 0 is a filled cell,
   * and the number represents the color and shape of the cell.
   */
  grid: number[][];
  unit: number = 22;

  pentomino: Pent | null = null;

  constructor() {
    this.grid = Array.from(
      { length: this.size[1] },
      () => Array(this.size[0]).fill(0) as number[]
    );
  }

  init(unit: number) {
    this.unit = unit;
    this.pentomino = new Pent("P");
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

    if (!this.pentomino) return;

    this.pentomino.move(move);
  }

  draw() {
    let ctx = graphics.contexts[1];

    const cellWidth = ctx.canvas.width / this.size[0];
    const cellHeight = ctx.canvas.height / this.size[1];
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (let y = 0; y < this.size[1]; y++) {
      for (let x = 0; x < this.size[0]; x++) {
        if (this.grid[y][x]) {
          ctx.fillStyle = "#FFF";
          ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
        }
      }
    }
  }

  render() {
    if (this.pentomino) {
      this.pentomino.draw();
    }
    this.draw();
  }
}

export default Board;
