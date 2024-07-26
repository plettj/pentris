import ControlMapping from "./logic/controls";

const pentominoes: Record<PentName, Pentomino> = {
  F: {
    color: "#8745fd",
    /**
     *   0 1
     * 2 3
     *   4
     */
    shape: {
      points: [
        [1, 0],
        [2, 0],
        [0, 1],
        [1, 1],
        [1, 2],
      ],
      center: [1, 1],
    },
  },
  I: {
    color: "#28eafb",
    /**
     * 0
     * 1
     * 2
     * 3
     * 4
     */
    shape: {
      points: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
      ],
      center: [0, 2],
    },
  },
  L: {
    color: "#f89912",
    /**
     * 0
     * 1
     * 2
     * 3 4
     */
    shape: {
      points: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 3],
      ],
      center: [0.5, 1.5],
    },
  },
  N: {
    color: "#ff1e1e",
    /**
     *   0
     * 1 2
     * 3
     * 4
     */
    shape: {
      points: [
        [1, 0],
        [0, 1],
        [1, 1],
        [0, 2],
        [0, 3],
      ],
      center: [0.5, 1.5],
    },
  },
  P: {
    color: "#ff1488",
    /**
     * 0 1
     * 2 3
     * 4
     */
    shape: {
      points: [
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
        [0, 2],
      ],
      center: [0.5, 1],
    },
  },
  T: {
    color: "#a8b9bb",
    /**
     * 0 1 2
     *   3
     *   4
     */
    shape: {
      points: [
        [0, 0],
        [1, 0],
        [2, 0],
        [1, 1],
        [1, 2],
      ],
      center: [1, 1],
    },
  },
  U: {
    color: "#ecff16",
    /**
     * 0   1
     * 2 3 4
     */
    shape: {
      points: [
        [0, 0],
        [2, 0],
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      center: [1, 0.5],
    },
  },
  V: {
    color: "#e245fd",
    /**
     * 0
     * 1
     * 2 3 4
     */
    shape: {
      points: [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      center: [1, 1],
    },
  },
  W: {
    color: "#5ded8b",
    /**
     *   0 1
     * 2 3
     * 4
     */
    shape: {
      points: [
        [1, 0],
        [2, 0],
        [0, 1],
        [1, 1],
        [0, 2],
      ],
      center: [1, 1],
    },
  },
  X: {
    color: "#db662b",
    /**
     *   0
     * 1 2 3
     *   4
     */
    shape: {
      points: [
        [1, 0],
        [0, 1],
        [1, 1],
        [2, 1],
        [1, 2],
      ],
      center: [1, 1],
    },
  },
  Y: {
    color: "#4569fd",
    /**
     *   0
     * 1 2
     *   3
     *   4
     */
    shape: {
      points: [
        [1, 0],
        [0, 1],
        [1, 1],
        [1, 2],
        [1, 3],
      ],
      center: [0.5, 1.5],
    },
  },
  Z: {
    color: "#33eb1c",
    /**
     * 0 1
     *   2
     *   3 4
     */
    shape: {
      points: [
        [0, 0],
        [1, 0],
        [1, 1],
        [1, 2],
        [2, 2],
      ],
      center: [1, 1],
    },
  },
};

const bucketTwelve: PentName[] = [
  "F",
  "I",
  "L",
  "N",
  "P",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const controlMapping = new ControlMapping({
  left: ["ArrowLeft"],
  right: ["ArrowRight"],
  down: ["ArrowDown"],
  drop: ["ArrowUp"],
  rotateCw: ["KeyA"],
  rotateCcw: ["KeyD"],
  reflect: ["Space", "KeyW"],
  bank: ["KeyS"],
});

export { bucketTwelve, controlMapping, pentominoes };
