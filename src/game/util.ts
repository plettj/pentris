export function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export function rotate(point: Coor, center: Coor, angle: number): Coor {
  let newPoint = point;

  for (let i = 0; i < angle; i++) {
    newPoint = [
      newPoint[1] - center[1] + center[0],
      center[0] - newPoint[0] + center[1],
    ];
  }

  // Points may end up as floats. Round only if so.
  if (center[0] + (center[1] % 1) !== 0) {
    newPoint = newPoint.map((v) => Math.floor(v)) as Coor;
  }

  return newPoint;
}

export function reflect(
  point: Coor,
  center: Coor,
  yAxis: boolean = true
): Coor {
  return [
    yAxis ? center[0] * 2 - point[0] : point[0],
    yAxis ? point[1] : center[1] * 2 - point[1],
  ];
}

export function getUnitFromHeight(height: number): number {
  return Math.floor(
    height / (26 /* board.size[1] */ + 5 /* board.topGap */ + 2)
  );
}

export function moveIsTranslate(move: GameAction): boolean {
  return move === "left" || move === "right" || move === "down";
}

export function easeOutQuad(r: number): number {
  return 1 - (1 - r) * (1 - r);
}

const profanity: [string, string][] = [
  ["shit", "unicorn"],
  ["piss", "frog"],
  ["fuck", "pop tart"],
  ["nigger", "noodle"],
  ["faggot", "marmot"],
  ["cunt", "sparkle"],
  ["cocksucker", "pony"],
  ["motherfucker", "platypus"],
  ["tits", "butterfly"],
  ["penis", "pentris"],
];

export function sanitizeUsername(username: string): string {
  for (const [badWord, replacement] of profanity) {
    const regex = new RegExp(badWord, "gi");
    username = username.replace(regex, replacement);
  }

  let sanitized = username.trim().slice(0, 15);

  return sanitized;
}
