// PENTOMINO PIECES

// Pentomino class
let Pentomino = class {
  constructor(name, color, shape) {
    this.name = name; // name of the pentomino.
    this.color = color; // color of the pentomino.
    this.shape = shape; // 5x5 array of 0's and 1's representing a pentomino's shape.
    this.coor = [7, 0]; // [x, y] of the top-left corner of the pentomino's shape.
    this.placed = false; // whether the pentomino has been placed.
  }

  draw() {
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        if (this.shape[y][x]) {
          this.drawSquare(this.coor[0] + x, this.coor[1] + y, this.color);
        }
      }
    }
  }

  rotate(right = true) {
    if (this.placed) return;
    let newShape = this.shape.map((row, y) =>
      row.map((val, x) => (right ? this.shape[4 - x][y] : this.shape[x][4 - y]))
    );
    if (!this.checkCollision(newShape, this.coor[0], this.coor[1])) {
      this.shape = newShape;
    }
  }

  reflect() {
    if (this.placed) return;
    let newShape = this.shape.map((row) => row.slice().reverse());
    if (!this.checkCollision(newShape, this.coor[0], this.coor[1])) {
      this.shape = newShape;
    }
  }

  drawSquare(x, y) {
    ctx[2].fillStyle = this.color;
    ctx[2].fillRect(x * unit, y * unit, unit, unit);
  }

  newFrame() {
    if (this.placed) return false;

    if (!this.checkCollision(this.shape, this.coor[0], this.coor[1] + 1)) {
      this.coor[1]++;
    } else {
      this.placed = true;
    }

    return this.placed;
  }

  move(direction) {
    if (this.placed) return;
    switch (direction) {
      case "left":
        if (!this.checkCollision(this.shape, this.coor[0] - 1, this.coor[1])) {
          this.coor[0]--;
        }
        break;
      case "right":
        if (!this.checkCollision(this.shape, this.coor[0] + 1, this.coor[1])) {
          this.coor[0]++;
        }
        break;
      case "down":
        if (!this.checkCollision(this.shape, this.coor[0], this.coor[1] + 1)) {
          this.coor[1]++;
        }
        break;
      case "rotate right":
        this.rotate(true);
        break;
      case "rotate left":
        this.rotate(false);
        break;
      case "reflect":
        this.reflect();
        break;
      case "drop":
        while (
          !this.checkCollision(this.shape, this.coor[0], this.coor[1] + 1)
        ) {
          this.coor[1]++;
        }
        this.placed = true;
        break;
    }
  }

  checkCollision(shape, x, y) {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (shape[i][j]) {
          let newX = x + j;
          let newY = y + i;
          if (
            newX < 0 ||
            newX >= map.screen[0].length ||
            newY < 0 ||
            newY >= map.screen.length ||
            map.screen[newY][newX]
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }
};

// Pentominoes
let allPentominoes = [
  [
    "F",
    "yellow",
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ],
  ],
  [
    "I",
    "blue",
    [
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
    ],
  ],
  [
    "L",
    "orange",
    [
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0],
    ],
  ],
  [
    "N",
    "lime",
    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
    ],
  ],
  [
    "P",
    "pink",
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ],
  ],
  [
    "T",
    "purple",
    [
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ],
  ],
  [
    "U",
    "cyan",
    [
      [0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
  ],
  [
    "V",
    "magenta",
    [
      [0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
    ],
  ],
  [
    "W",
    "green",
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 1, 1, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
  ],
  [
    "X",
    "red",
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ],
  ],
  [
    "Y",
    "brown",
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
    ],
  ],
  [
    "Z",
    "silver",
    [
      [0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0],
    ],
  ],
];
