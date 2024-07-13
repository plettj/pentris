// MAP

// Pentris map!
let map = {
  screen: [], // 2D array of the map.
  activePentomino: null, // The pentomino currently being controlled.
  paused: true, // Whether the game is paused.
  speed: 3, // Number of game steps per second.
  pentBucket: [], // Remaining pentominoes in current 12-pentomino bucket.
  upcomingPentominoes: [], // Next 3 pentominoes to be used.
  init: function (x, y) {
    // x = width in units, y = height in units
    for (let i = 0; i < y; i++) {
      let row = [];
      for (let j = 0; j < x; j++) {
        row.push(0);
      }
      this.screen.push(row);
    }

    this.newPentomino();
  },
  drawSquare(x, y, index) {
    ctx[2].fillStyle = allPentominoes[index - 1][1];
    ctx[2].fillRect(x * unit, unit * 4 + y * unit, unit, unit);
  },
  refresh: function () {
    clear(2); // Block canvas

    for (let i = 0; i < this.screen.length; i++) {
      for (let j = 0; j < this.screen[i].length; j++) {
        if (this.screen[i][j]) {
          this.drawSquare(j, i, this.screen[i][j]);
        }
      }
    }

    this.activePentomino.draw();
  },
  newFrame: function () {
    console.log("New map frame.");
    clear(1);

    this.activePentomino.newFrame();

    if (this.activePentomino.placed) {
      this.newPentomino();
    }

    // this.refresh() is in animation loop
  },
  newPentomino: function () {
    console.log(this.pentBucket.length);

    if (this.pentBucket.length === 0) {
      this.pentBucket = !developmentMode
        ? structuredClone(buckets[0])
        : structuredClone(buckets[0]);
    }

    let nextPent = this.pentBucket.splice(
      Math.floor(Math.random() * this.pentBucket.length),
      1
    )[0];

    console.log(nextPent);

    delete this.activePentomino;

    this.activePentomino = new Pentomino(
      allPentominoes[nextPent][0],
      allPentominoes[nextPent][1],
      allPentominoes[nextPent][2]
    );
  },
  checkBreak: function () {
    let rows = 0;

    for (let i = 0; i < this.screen.length; i++) {
      if (this.screen[i].every((val) => val)) {
        this.screen.splice(i, 1);
        this.screen.unshift(new Array(this.screen[0].length).fill(0));
        rows++;
      }
    }

    if (rows) {
      score.add(rows);
    }
  },
  startGame: function () {
    this.refresh();
    this.paused = false;
    this.newPentomino();

    console.log("Starting game of Pentris!");
  },
  move: function (direction, pressing) {
    if (!pressing) return;

    this.activePentomino.move(direction);
  },
};

// Score object
let score = {
  score: 0,
  rowScores: [1, 2, 8, 32, 128],
  init: function () {
    this.score = 0;
  },
  add: function (rows) {
    this.score += this.rowScores[rows - 1];
    document.querySelector("#score").innerText = this.score;
  },
};

function pauseGame() {
  map.paused = true;
}

function unPauseGame() {
  map.paused = false;
}
