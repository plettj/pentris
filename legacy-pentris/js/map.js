// MAP

// Pentris map!
let map = {
  screen: [], // 2D array of the map.
  activePentomino: null, // The pentomino currently being controlled.
  paused: true, // Whether the game is paused.
  pentBucket: [], // Remaining pentominoes in current 12-pentomino bucket.
  upcomingPentominoes: [], // Next 3 pentominoes to be used.
  holdPentomino: null, // The pentomino being held by the user.
  canHold: true, // Whether user can swap hold.
  topOffset: 6, // Offset from the top of the screen.
  init: function (x, y) {
    // x = width in units, y = height in units
    this.screen = [];
    this.upcomingPentominoes = [];
    this.pentBucket = [];
    this.holdPentomino = null;
    this.activePentomino = null;

    for (let i = 0; i < y - this.topOffset; i++) {
      let row = [];
      for (let j = 0; j < x; j++) {
        row.push(0);
      }
      this.screen.push(row);
    }

    // Draw death line as a black line
    ctx[0].strokeStyle = "#000000";
    ctx[0].lineWidth = 1;
    ctx[0].beginPath();
    ctx[0].moveTo(0, unit * 6);
    ctx[0].lineTo(unit * width, unit * 6);
    ctx[0].stroke();
    ctx[0].closePath();

    // Initialize the bucket with the next 3 pentominoes.
    for (let i = 0; i < 3; i++) {
      this.getNewPentomino(true);
    }

    this.activePentomino = this.getNewPentomino();

    this.hold(true);
    this.drawMiniPentominoes();
  },
  drawSquare(x, y, index) {
    ctx[2].fillStyle = allPentominoes[index - 1][1];
    ctx[2].fillRect(x * unit, unit * this.topOffset + y * unit, unit, unit);
    // Draw black outline
    ctx[2].strokeStyle = "#000000";
    ctx[2].lineWidth = 1;
    ctx[2].strokeRect(
      x * unit + 0.5,
      unit * this.topOffset + y * unit + 0.5,
      unit,
      unit
    );
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

      this.checkBreak();
      score.newPlaced();
      this.canHold = true;
    }

    this.drawMiniPentominoes();
  },
  drawMiniPentominoes: function () {
    clear(3); // Bucket canvas
    // Draw bucket pentominoes
    for (let i = 0; i < this.upcomingPentominoes.length; i++) {
      this.upcomingPentominoes[i].drawAsBucket(i);
    }

    this.holdPentomino.drawAsBucket(-3.5);
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
  move: function (action, pressing) {
    if (!pressing) return;

    if (action == "hold") {
      this.hold();
    } else {
      this.activePentomino.move(action);
    }
  },
  hold: function (init = false) {
    if (!this.canHold) return;

    let newPent = this.holdPentomino;
    if (!init) {
      this.holdPentomino = this.activePentomino;
      this.activePentomino = newPent;
      this.canHold = false;
    } else {
      this.holdPentomino = this.getNewPentomino();
    }
    this.activePentomino.set();

    this.drawMiniPentominoes();
  },
  startGame: function (paused) {
    this.animate();
    this.paused = paused;
  },
};

// Score object
let score = {
  score: 0,
  rowScores: [1, 5, 10, 15, 30],
  progress: 0, // Progress in terms of time played (for game speed).
  level: 0, // Current level (for game speed)
  levelSpeeds: [
    1.2, 1.5, 1.8, 2, 2.3, 2.6, 3, 3.4, 3.8, 4.2, 4.7, 5.2, 5.8, 6.5, 7,
  ], // Game speeds for each level.
  speed: 1, // Number of game steps per 60 frames.
  totalPlaced: 0, // Total number of pentominoes placed.
  init: function () {
    this.score = 0;
    this.speed = 1;
    this.totalPlaced = 0;
    document.querySelector("#score").innerText = this.score;
    dom.setLevel();
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
  startGame: function () {
    this.init();
    map.init(width, height);
    map.startGame();
  },
  gameOver: function () {
    map.paused = true;

    setTimeout(() => {
      map.paused = false;
      score.startGame();
    }, 5000);
  },
};
