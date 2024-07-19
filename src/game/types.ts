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

type Grid = [
  [0 | 1, 0 | 1, 0 | 1, 0 | 1, 0 | 1],
  [0 | 1, 0 | 1, 0 | 1, 0 | 1, 0 | 1],
  [0 | 1, 0 | 1, 0 | 1, 0 | 1, 0 | 1],
  [0 | 1, 0 | 1, 0 | 1, 0 | 1, 0 | 1],
  [0 | 1, 0 | 1, 0 | 1, 0 | 1, 0 | 1]
];

interface Pentomino {
  color: string;
  grid: Grid;
}
