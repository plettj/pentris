import { board, graphics, score, theme } from "game/objects";
import { kickTable, pentominoes } from "../constants";
import { reflect, rotate } from "../util";

class Pent {
  readonly name: PentName;
  readonly self: Pentomino;
  /** `0...7 % 8`, where `+1` is a cw rotation and `+4` is a reflection */
  orientation: number = 0;
  coor!: Coor;

  isSettling: boolean = false;

  constructor(name: PentName) {
    this.name = name;
    this.self = pentominoes[name];
    this.set();
  }

  getShape(orientation?: number): Shape {
    orientation = orientation ?? this.orientation;

    let newPoints = this.self.shape.points.map((point) => {
      let newPoint = rotate(point, this.self.shape.center, orientation % 4);

      if (orientation >= 4) {
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

  getBoardPoints(): Coor[] {
    return this.getShape().points.map(([x, y]) => [
      this.coor[0] + x,
      this.coor[1] + y,
    ]);
  }

  set() {
    this.orientation = 0;
    this.coor = [
      6 - Math.floor(this.self.shape.center[0]),
      (this.self.shape.center[1] + 0.5) * -2,
    ];
  }

  render() {
    const frame = graphics.frame;

    if (frame % score.getSpeed() === 0) {
      if (!this.isSettling) {
        this.move("down");
      }
    }

    graphics.clear(2);
    this.draw(frame);

    graphics.clear(3);
    this.drawGhost();
  }

  draw(frame: number) {
    const shape = this.getShape();
    const ctx = graphics.contexts[2];

    shape.points.forEach(([x, y]) => {
      const drawX = this.coor[0] + x;
      const drawY = this.coor[1] + y + board.topGap;
      const pixelY = Math.floor(
        drawY * board.unit +
          ((frame % score.getSpeed()) / score.getSpeed() - 0.5) * board.unit
      );

      if (
        !this.canMove("down") &&
        (pixelY >= drawY * board.unit || score.getSpeed() < 2)
      ) {
        this.isSettling = true;
      } else if (this.canMove("down")) {
        this.isSettling = false;
      }

      ctx.fillStyle = this.self.color;
      ctx.fillRect(
        drawX * board.unit,
        this.isSettling ? drawY * board.unit : pixelY,
        board.unit,
        board.unit
      );
    });
  }

  drawBank() {
    const shape = this.getShape();
    const ctx = graphics.contexts[4];

    shape.points.forEach(([x, y]) => {
      const drawX = 2.5 - this.getShape().center[0] + x;
      const drawY = -4 + y + board.topGap;
      ctx.fillStyle = this.self.color;
      ctx.fillRect(
        drawX * board.unit,
        drawY * board.unit,
        board.unit,
        board.unit
      );
    });
  }

  drawGhost() {
    const shape = this.getShape();
    const ctx = graphics.contexts[3];
    const coor = this.coor.slice();

    while (!board.isCollide(shape, [coor[0], coor[1] + 1])) {
      coor[1]++;
    }

    // This will become more dynamic with the introduction of custom pieces.
    ctx.fillStyle = theme.getTheme().pieces.ghost;
    shape.points.forEach(([x, y]) => {
      const drawX = coor[0] + x;
      const drawY = coor[1] + y + board.topGap;
      ctx.fillRect(
        drawX * board.unit,
        drawY * board.unit,
        board.unit,
        board.unit
      );
    });
  }

  drawUpcoming(spot: number) {
    const shape = this.getShape();
    const ctx = graphics.contexts[4];

    shape.points.forEach(([x, y]) => {
      const drawX = 22 - this.getShape().center[0] + x;
      const drawY = -4 + y + board.topGap + spot * 6;
      ctx.fillStyle = this.self.color;
      ctx.fillRect(
        drawX * board.unit,
        drawY * board.unit,
        board.unit,
        board.unit
      );
    });
  }

  isStuck() {
    const currCoor = this.coor.slice() as Coor;

    const moves: MoveAction[] = ["left", "right", "down"];
    if (this.name !== "X") {
      moves.push("rotateCw");
      moves.push("rotateCcw");
    }
    if (this.name !== "I") {
      moves.push("reflect");
    }

    for (let i = 0; i < moves.length; i++) {
      if (this.canMove(moves[i])) {
        this.coor = currCoor.slice() as Coor;
        return false;
      }
    }

    return true;
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
      case "sonicDrop":
      case "hardDrop":
        return true;
      case "rotateCw":
      case "rotateCcw":
      case "reflect":
        return this.canModifyMove(move);
    }
  }

  /**
   * Will modify the coordinates if it's necessary to bump the piece.
   */
  canModifyMove(move: ModifyAction): boolean {
    let newShape;
    switch (move) {
      case "rotateCw":
        newShape = this.getShape(this.rotate(true));
        break;
      case "rotateCcw":
        newShape = this.getShape(this.rotate(false));
        break;
      case "reflect":
        newShape = this.getShape(this.reflect());
        break;
    }

    const kickPreference = move === "rotateCw" ? 1 : -1;

    for (const coor of kickTable) {
      if (
        !board.isCollide(newShape, [
          this.coor[0] + coor[0] * kickPreference,
          this.coor[1] + coor[1],
        ])
      ) {
        if (coor[1] < 0 && board.settleCount >= board.settleCountLimit) {
          this.isSettling = true;
          return false;
        }
        this.coor[0] += coor[0] * kickPreference;
        this.coor[1] += coor[1];

        return true;
      }
    }

    return false;
  }

  move(move: MoveAction) {
    if (!this.canMove(move)) return;

    if (this.isSettling) {
      board.resetSettle();
    }

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
      case "sonicDrop":
        while (this.canMove("down")) {
          this.coor[1]++;
        }
        this.isSettling = true;
        break;
      case "hardDrop":
        while (this.canMove("down")) {
          this.coor[1]++;
        }
        board.place();
        break;
      case "rotateCw":
        this.orientation = this.rotate(true);
        break;
      case "rotateCcw":
        this.orientation = this.rotate(false);
        break;
      case "reflect":
        this.orientation = this.reflect();
        break;
    }
  }

  rotate(cw: boolean = true) {
    const isReflected = this.orientation >= 4;
    return (
      ((this.orientation + (isReflected ? (cw ? 1 : 3) : cw ? 3 : 1)) % 4) +
      (isReflected ? 4 : 0)
    );
  }

  reflect() {
    return (this.orientation + 4) % 8;
  }
}

export default Pent;
