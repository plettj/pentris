// FUNCTIONS, LEVELS, & GRAPHIC HANDLING

// FUNCTIONS

// Miscellaneous functions
function clear(index, coor = false) {
  // clears contexts
  if (!coor)
    ctx[index].clearRect(
      0,
      0,
      ctx[index].canvas.width,
      ctx[index].canvas.height
    );
  else
    ctx[index].clearRect(
      coor[0] - unit / 20,
      coor[1] - unit / 20,
      unit * 1.1,
      unit * 1.1
    );
}

function save() {
  saved["bestLevel"] = 1;
}

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

// MAP

// Pentris map!
let map = {
  screen: [], // 2D array of the map.
  pentominoes: [], // List of all pentominoes in play.
  paused: true, // Whether the game is paused.
  speed: 0.75, // Number of game steps per second.
  pentBucket: [], // Remaining pentominoes in current 12-pentomino bucket.
  init: function (x, y) {
    // x = width in units, y = height in units
    for (let i = 0; i < y; i++) {
      let row = [];
      for (let j = 0; j < x; j++) {
        row.push(0);
      }
      this.screen.push(row);
    }
  },
  draw: function () {
    clear(1); // Background canvas
    clear(2); // Block canvas
  },
  refresh: function () {
    clear(2); // Block canvas
    this.pentominoes.forEach((pentomino) => {
      pentomino.draw();
    });
  },
  newFrame: function () {
    console.log("New map frame.");

    let newPlaced = false;
    this.pentominoes.forEach((pentomino) => {
      newPlaced |= pentomino.newFrame();
    });

    if (newPlaced) {
      let newPent = this.newPentomino();
      newPent.draw();
    }
  },
  newPentomino: function () {
    if (this.pentBucket.length === 0) {
      this.pentBucket = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    }

    let nextPent = this.pentBucket.splice(
      Math.floor(Math.random() * this.pentBucket.length),
      1
    )[0];

    let pentomino = new Pentomino(
      allPentominoes[nextPent][0],
      allPentominoes[nextPent][1],
      allPentominoes[nextPent][2]
    );

    this.pentominoes.push(pentomino);

    return pentomino;
  },
  startGame: function () {
    this.draw();
    this.paused = false;
    this.newPentomino();

    console.log("Starting game of Pentris!");
  },
  move: function (direction, pressing) {
    if (!pressing) return;

    let activePent = this.pentominoes[this.pentominoes.length - 1];

    switch (direction) {
      case "left":
        if (
          !activePent.checkCollision(
            activePent.shape,
            activePent.coor[0] - 1,
            activePent.coor[1]
          )
        ) {
          activePent.coor[0]--;
        }
        break;
      case "right":
        if (
          !activePent.checkCollision(
            activePent.shape,
            activePent.coor[0] + 1,
            activePent.coor[1]
          )
        ) {
          activePent.coor[0]++;
        }
        break;
      case "down":
        if (
          !activePent.checkCollision(
            activePent.shape,
            activePent.coor[0],
            activePent.coor[1] + 1
          )
        ) {
          activePent.coor[1]++;
        }
        break;
      case "rotate":
        activePent.rotate();
        break;
      case "reflect":
        activePent.reflect();
        break;
    }
  },
};

// Score object
let score = {
  score: 0,
  rowScores: [1, 2, 4, 8, 16],
  init: function () {
    this.score = 0;
  },
  add: function (rows) {
    this.score += this.rowScores[rows - 1];
  },
};

function pauseGame() {
  map.paused = true;
}

function unPauseGame() {
  map.paused = false;
}
