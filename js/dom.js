let dom = {
  play: document.querySelector("#play"),
  togglePause: function () {
    map.paused = !map.paused;
    this.play.innerText = map.paused ? "Play" : "Pause";
  },
  setLevel: function () {
    document.querySelector("#level").innerText = score.level + 1;
  },
};
