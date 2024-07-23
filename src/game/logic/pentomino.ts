import { graphics, board } from "game/objects";
import { pentominoes } from "../constants";

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

  getShape(action?: MoveAction): Shape {
    let newOrientation = this.orientation;

    if (action === "rotateCw" || action === "rotateCcw") {
      const cw = action === "rotateCw";
      newOrientation =
        ((this.orientation + (cw ? 1 : 3)) % 4) +
        (this.orientation >= 4 ? 4 : 0);
    } else if (action === "reflect") {
      newOrientation = (this.orientation + 4) % 8;
    }

    const newCenter =
      newOrientation < 4
        ? this.self.shape.center
        : ([this.self.shape.center[1], this.self.shape.center[0]] as Coor);

    let offX = false;
    let offY = false;

    let newPoints = this.self.shape.points.map(([x, y]) => {
      let newX = x;
      let newY = y;

      for (let i = 0; i < newOrientation % 4; i++) {
        [newX, newY] = [newY, -newX];
      }

      if (newOrientation >= 4) {
        newX = -newX;
      }

      offX = offX || newX < 0;
      offY = offY || newY < 0;

      return [newX, newY] as Coor;
    });

    // Ensure the shape rotated around its center.
    newPoints = newPoints.map(([x, y]) => {
      return [
        x + (offX ? newCenter[0] * 2 : 0),
        y + (offY ? newCenter[1] * 2 : 0),
      ] as Coor;
    });

    const transformedShape = {
      points: newPoints,
      center: newCenter,
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
      case "rotateCcw":
      case "reflect":
        return !board.isCollide(this.getShape(move), [
          this.coor[0],
          this.coor[1],
        ]);
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
