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

type ModifyAction = "rotateCw" | "rotateCcw" | "reflect";

type MoveAction = ModifyAction | "left" | "right" | "down" | "drop";

type GameAction = MoveAction | "bank";

interface ThemeType {
  background: string;
  outline: string;
  pieces: {
    placed: string;
    ghost: string;
  };
}

interface ControlMappingType {
  [key: string]: MoveAction;
}
