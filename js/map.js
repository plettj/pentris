// MAP

// Pentris map!
let map = {
  screen: [], // 2D array of the map.
  activePentomino: null, // The pentomino currently being controlled.
  paused: true, // Whether the game is paused.
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

    // Initialize the bucket with the next 3 pentominoes.
    for (let i = 0; i < 3; i++) {
      this.getNewPentomino(true);
    }

    delete this.activePentomino;
    this.activePentomino = this.getNewPentomino();
  },
  drawSquare(x, y, index) {
    ctx[2].fillStyle = allPentominoes[index - 1][1];
    ctx[2].fillRect(x * unit, unit * 4 + y * unit, unit, unit);
  },
  animate: function () {
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
    this.activePentomino.newFrame();

    if (this.activePentomino.placed) {
      delete this.activePentomino;
      this.activePentomino = this.getNewPentomino();

      score.newPlaced();
    }

    clear(3); // Bucket canvas
    // Draw bucket pentominoes
    for (let i = 0; i < this.upcomingPentominoes.length; i++) {
      this.upcomingPentominoes[i].drawAsBucket(i);
    }
  },
  getNewPentomino: function (noShift = false) {
    if (this.pentBucket.length === 0) {
      this.pentBucket = !developmentMode
        ? structuredClone(buckets[0])
        : structuredClone(buckets[0]);
    }

    let nextPent = this.pentBucket.splice(
      Math.floor(Math.random() * this.pentBucket.length),
      1
    )[0];

    let nextPentObject = new Pentomino(
      allPentominoes[nextPent][0],
      allPentominoes[nextPent][1],
      allPentominoes[nextPent][2]
    );

    this.upcomingPentominoes.push(nextPentObject);

    return noShift
      ? this.upcomingPentominoes[this.upcomingPentominoes.length - 1]
      : this.upcomingPentominoes.shift();
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
  move: function (direction, pressing) {
    if (!pressing) return;

    this.activePentomino.move(direction);
  },
  startGame: function () {
    this.animate();
    this.paused = false;
  },
};

// Score object
let score = {
  score: 0,
  rowScores: [1, 2, 8, 32, 128],
  progress: 0, // Progress in terms of time played (for game speed).
  level: 0, // Current level (for game speed)
  levelSpeeds: [
    1.2, 1.5, 1.8, 2, 2.3, 2.6, 3, 3.4, 3.8, 4.2, 4.7, 5.2, 5.8, 6.5, 7,
  ], // Game speeds for each level.
  speed: 1, // Number of game steps per 60 frames.
  totalPlaced: 0, // Total number of pentominoes placed.
  init: function () {
    this.score = 0;
  },
  add: function (rows) {
    this.score += this.rowScores[rows - 1];
    document.querySelector("#score").innerText = this.score;
  },
  newPlaced: function () {
    this.totalPlaced++;

    if (this.totalPlaced % 12 === 0) {
      this.level++;
      dom.setLevel();

      if (this.level < this.levelSpeeds.length) {
        this.speed = this.levelSpeeds[this.level];
      }
    }
  },
};
