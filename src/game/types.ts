type Coor = [number, number];

type PentName =
  | "F"
  | "I"
  | "L"
  | "N"
  | "P"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";

type Shape = { points: Coor[]; center: Coor };

interface Pentomino {
  color: string;
  shape: Shape;
}

type MoveAction =
  | "left"
  | "right"
  | "down"
  | "drop"
  | "rotateCw"
  | "rotateCcw"
  | "reflect";

type GameAction = MoveAction | "bank";

interface ControlMapping {
  [key: string]: MoveAction;
}
