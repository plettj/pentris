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

type TranslateAction = "left" | "right" | "down";

type MoveAction = ModifyAction | TranslateAction | "drop";

type GameAction = MoveAction | "bank";

interface ThemeType {
  background: string;
  outline: string;
  grid: string;
  pieces: {
    placed: string;
    ghost: string;
  };
}

type Keybinds = Map<string, GameAction>;

interface ControlMappingType {
  [key: string]: MoveAction;
}
