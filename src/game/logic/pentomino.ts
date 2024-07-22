import { graphics, board } from "game/objects";
import { pentominoes } from "../constants";

class Pent {
  readonly self: Pentomino;
  /** `0...7 % 8`, where `+1` is a cw rotation and `+4` is a reflection */
  orientation: number = 0;
  coor!: Coor;

  constructor(name: PentName) {
    this.self = pentominoes[name];
    this.set();
  }

  getShape(): Shape {
    const transformedShape = {
      points: this.self.shape.points.map(([x, y]) => {
        let newX = x;
        let newY = y;

        for (let i = 0; i < this.orientation % 4; i++) {
          [newX, newY] = [newY, -newX];
        }

        if (this.orientation >= 4) {
          newX = -newX;
        }

        return [newX, newY] as Coor;
      }),
      center:
        this.orientation < 4
          ? this.self.shape.center
          : ([this.self.shape.center[1], this.self.shape.center[0]] as Coor),
    };

    return transformedShape;
  }

  set() {
    this.coor = [
      6 + this.self.shape.center[0] * -2,
      (this.self.shape.center[1] + 0.5) * -2,
    ];
  }

  render() {
    // Updates the pentomino position on a new frame (if needed)
  }

  draw() {
    const shape = this.getShape();
    const ctx = graphics.contexts[2];

    shape.points.forEach(([x, y]) => {
      const drawX = this.coor[0] + x;
      const drawY = this.coor[1] + y + 5;
      ctx.fillStyle = this.self.color;
      ctx.fillRect(
        drawX * board.unit,
        drawY * board.unit,
        board.unit,
        board.unit
      );
    });
  }

  canMove(move: MoveAction): boolean {
    // TODO: Implement dynamic collision detection algorithms.
    switch (move) {
      case "left":
        return true;
      case "right":
        return true;
      case "down":
        return true;
      case "drop":
        return true;
      case "rotateCw":
        return true;
      case "rotateCcw":
        return true;
      case "reflect":
        return true;
    }
  }

  move(move: MoveAction) {
    if (!this.canMove(move)) return;

    switch (move) {
      case "left":
        this.coor[0]--;
        break;
      case "right":
        this.coor[0]++;
        break;
      case "down":
        this.coor[1]++;
        break;
      case "drop":
        while (this.canMove("down")) {
          this.coor[1]++;
        }
        break;
      case "rotateCw":
        this.rotate(true);
        break;
      case "rotateCcw":
        this.rotate(false);
        break;
      case "reflect":
        this.reflect();
        break;
    }
  }

  rotate(cw: boolean = true) {
    this.orientation =
      ((this.orientation + (cw ? 1 : 3)) % 4) + (this.orientation >= 4 ? 4 : 0);
  }

  reflect() {
    this.orientation = (this.orientation + 4) % 8;
  }

  place() {
    // board.place(this);
  }
}

export default Pent;
