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

    activePent.move(direction);
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
