import { graphics, board } from "game/objects";
import { pentominoes } from "../constants";
import { reflect, rotate } from "../util";

class Pent {
  readonly name: PentName;
  readonly self: Pentomino;
  /** `0...7 % 8`, where `+1` is a cw rotation and `+4` is a reflection */
  orientation: number = 0;
  coor!: Coor;

  constructor(name: PentName) {
    this.name = name;
    this.self = pentominoes[name];
    this.set();
  }

  getShape(): Shape {
    let newPoints = this.self.shape.points.map((point) => {
      let newPoint = rotate(
        point,
        this.self.shape.center,
        this.orientation % 4
      );

      if (this.orientation >= 4) {
        newPoint = reflect(newPoint, this.self.shape.center);
      }

      return newPoint;
    });

    const transformedShape = {
      points: newPoints,
      center: this.self.shape.center,
    };

    return transformedShape;
  }

  set() {
    this.coor = [
      6 - Math.floor(this.self.shape.center[0]),
      (this.self.shape.center[1] + 0.5) * -2,
    ];
  }

  render() {
    const frame = graphics.frame;

    if (frame % graphics.dropSpeed === 0) {
      if (this.canMove("down")) {
        this.move("down");
      } else {
        board.place();
        return;
      }
    }

    graphics.clear(2);
    this.draw(frame);
  }

  draw(frame: number) {
    const shape = this.getShape();
    const ctx = graphics.contexts[2];
    const stable = !this.canMove("down");

    shape.points.forEach(([x, y]) => {
      const drawX = this.coor[0] + x;
      const drawY = this.coor[1] + y + board.topGap;
      ctx.fillStyle = this.self.color;
      ctx.fillRect(
        drawX * board.unit,
        stable
          ? drawY * board.unit
          : Math.floor(
              drawY * board.unit +
                ((frame % graphics.dropSpeed) / graphics.dropSpeed) * board.unit
            ),
        board.unit,
        board.unit
      );
    });
  }

  canMove(move: MoveAction): boolean {
    switch (move) {
      case "left":
        return !board.isCollide(this.getShape(), [
          this.coor[0] - 1,
          this.coor[1],
        ]);
      case "right":
        return !board.isCollide(this.getShape(), [
          this.coor[0] + 1,
          this.coor[1],
        ]);
      case "down":
        return !board.isCollide(this.getShape(), [
          this.coor[0],
          this.coor[1] + 1,
        ]);
      case "drop":
        return true;
      case "rotateCw":
        // TODO: Implement.
        return true;
      case "rotateCcw":
        // TODO: Implement.
        return true;
      case "reflect":
        // TODO: Implement.
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
}

export default Pent;
