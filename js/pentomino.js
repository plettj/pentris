// PENTOMINO PIECES

// Pentomino class
let Pentomino = class {
  constructor(name, color, shape) {
    this.name = name; // name of the pentomino.
    this.index = allPentominoes.findIndex((pent) => pent[0] === name); // index of the pentomino.
    this.color = color; // color of the pentomino.
    this.shape = shape; // 5x5 array of 0's and 1's representing a pentomino's shape.
    this.placed = false; // whether the pentomino has been placed.
    this.set();
  }

  set() {
    this.coor = [4, 0]; // [x, y] of the top-left corner of the pentomino's shape.
  }

  draw() {
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        if (this.shape[y][x]) {
          this.drawSquare(this.coor[0] + x, this.coor[1] + y);
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

  drawSquare(x, y, tiny = false) {
    let context = tiny ? 3 : 2;
    ctx[context].fillStyle = this.color;

    if (!tiny) {
      // Normal draw on screen
      ctx[context].fillRect(x * unit, unit * 4 + y * unit, unit, unit);
    } else {
      ctx[context].fillRect((x * unit) / 2, (y * unit) / 2, unit / 2, unit / 2);
    }
  }

  place() {
    this.placed = true;

    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        if (this.shape[y][x]) {
          map.screen[this.coor[1] + y][this.coor[0] + x] = this.index + 1;
        }
      }
    }

    map.checkBreak();
  }

  newFrame() {
    if (this.placed) return false;

    if (!this.checkCollision(this.shape, this.coor[0], this.coor[1] + 1)) {
      this.coor[1]++;
    } else {
      this.place();
    }

    return this.placed;
  }

  drawAsBucket(slot) {
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        if (this.shape[y][x]) {
          this.drawSquare(x + width / 2 + slot * 4 + 7, y + 4, true);
        }
      }
    }
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
        this.place();
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
const allPentominoes = [
  [
    // 0
    "F",
    "#8b21db",
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ],
  ],
  [
    // 1
    "I",
    "#21ccdb",
    [
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
    ],
  ],
  [
    // 2
    "L",
    "#f48519",
    [
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0],
    ],
  ],
  [
    // 3
    "N",
    "#f40910",
    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
    ],
  ],
  [
    // 4
    "P",
    "#ff1493",
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ],
  ],
  [
    // 5
    "T",
    "#83a7a9",
    [
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ],
  ],
  [
    // 6
    "U",
    "#faea19",
    [
      [0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
  ],
  [
    // 7
    "V",
    "#d948f8",
    [
      [0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
    ],
  ],
  [
    // 8
    "W",
    "#24a549",
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 1, 1, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
  ],
  [
    // 9
    "X",
    "#9c4011",
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ],
  ],
  [
    // 10
    "Y",
    "#212adb",
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
    ],
  ],
  [
    // 11
    "Z",
    "#29eb07",
    [
      [0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0],
    ],
  ],
];

const buckets = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  [1, 1],
  [1, 1, 7],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
];
