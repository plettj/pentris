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
