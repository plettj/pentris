// GLOBAL, INITIALIZATION, & EVENTS

// GLOBAL VARIABLES
let width = 13; // in units
let height = 28;
let assetLocation = "assets";
let unit = Math.floor(window.innerHeight / (height + 0.1) / 2) * 2;
if (window.innerWidth < (width + 0.1) * unit)
  unit = Math.floor(window.innerWidth / (width + 0.1) / 4) * 4;
let pixel = unit / 10;

let developmentMode = true;

document.body.style.setProperty("--unit", unit + "px");
document.body.style.setProperty("--width", width);
document.body.style.setProperty("--height", height);

let frame = 0; // animation frame
let step = 0; // animation steps (for block movement)

let saved = {
  bestLevel: 0,
  scores: [],
  copyJlp: true,
};

let previousSaved = localStorage.getItem("Pentris-Saved");
let firstOpen = false;
let bestLevel = 0;

if (!previousSaved) {
  // nothing has been saved yet
  setTimeout(function () {
    save();
  }, 2000);
} else {
  // update based on save
  saved = JSON.parse(localStorage.getItem("Pentris-Saved"));
  bestLevel = saved["bestLevel"];
}

// INITIALIZATION

// Canvas holder
let ctx = []; // [0-background, 1-arena, 2-blocks, 3-animations]
function makeContexts(num) {
  for (let i = 0; i < num; i++) {
    let canvas = document.createElement("CANVAS");
    canvas.id = "Canvas" + i;
    canvas.width = unit * width;
    canvas.height = unit * height;
    document.body.insertBefore(
      canvas,
      document.querySelector(".belowCanvases")
    );
    let thisCTX = canvas.getContext("2d");
    thisCTX.imageSmoothingEnabled = false;
    ctx.push(thisCTX);
  }
}
makeContexts(4);

// Image holder
let img = [];
function makeImages(imgs) {
  for (let i = 0; i < imgs.length; i++) {
    let image = new Image();
    image.src = imgs[i];
    img.push(image);
  }
}
makeImages([assetLocation + "/Background.png"]);

// *** Where it all starts ***
window.onload = function () {
  if (document.body.querySelector(":focus") != null)
    document.body.querySelector(":focus").blur();

  if (!firstOpen) {
    startAnimating(30); // 30 fps
  }

  ctx[0].drawImage(img[0], 0, 0, unit * width, unit * height);

  map.init(width, height - 4);
  score.init();

  map.startGame();
};

// To run actual frame-by-frame animation
let stop = false;
let frameCount = 0;
let fps = 30;
let fpsInterval, startTime, now, then, elapsed;

function startAnimating() {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  now = Date.now();
  elapsed = now - then;
  // if enough time has elapsed, draw the next frame
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    // actual looping code below!
    if (!map.paused) {
      frame++;

      if (!(frame % Math.round(fps / score.speed))) {
        step++;
        map.newFrame();
      }

      map.animate();
    }
  }
}

// EVENTS

function keyPressed(code, action) {
  if (!map.paused || !action) {
    if (code == 37 || code == 65) map.move("left", action); // Left
    else if (code == 38 || code == 87) map.move("drop", action); // Up
    else if (code == 39 || code == 68) map.move("right", action); // Right
    else if (code == 40 || code == 83) map.move("down", action); // Down
    else if (code == 81 || code == 191)
      map.move("rotate left", action); // Q or /
    else if (code == 70 || code == 16)
      map.move("rotate right", action); // F or Shift
    else if (code == 32 || code == 84 || code == 80)
      map.move("reflect", action); // Space or F or R
  }
}

document.addEventListener(
  "keydown",
  function (event) {
    let k = event.keyCode;
    if (k == 9 || k == 38 || k == 40) {
      event.preventDefault();
    } else if (
      k == 123 ||
      (event.ctrlKey && event.shiftKey && (k == 73 || k == 74)) ||
      (event.metaKey && event.altKey && (k == 73 || k == 74))
    ) {
      event.preventDefault();
      return false;
    }
    keyPressed(k, 1);
  },
  false
);

document.addEventListener("keyup", function (event) {
  keyPressed(event.keyCode, 0);
});

window.addEventListener("resize", function () {
  this.location.reload();
});

document.addEventListener("contextmenu", (event) => event.preventDefault());
