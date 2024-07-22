const pentominoes: Record<PentName, Pentomino> = {
  F: {
    color: "#8b21db",
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
    color: "#21ccdb",
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
    color: "#f48519",
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
    color: "#f40910",
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
  P: {
    color: "#ff1493",
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
    color: "#83a7a9",
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
    color: "#faea19",
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
    color: "#d948f8",
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
    color: "#24a549",
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
    color: "#9c4011",
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
    color: "#212adb",
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
    color: "#29eb07",
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

class ControlMapping {
  private mapping: Map<string, GameAction>;

  constructor(mapping: Record<GameAction, string[]>) {
    this.mapping = new Map<string, GameAction>();
    for (const [action, codes] of Object.entries(mapping)) {
      codes.forEach((code) => {
        this.mapping.set(code, action as GameAction);
      });
    }
  }

  getAction(code: string): GameAction | null {
    return this.mapping.get(code) || null;
  }
}

const controlMapping = new ControlMapping({
  left: ["ArrowLeft", "KeyA"], // Left arrow, A
  right: ["ArrowRight", "KeyD"], // Right arrow, D
  down: ["ArrowDown", "KeyS"], // Down arrow, S
  drop: ["ArrowUp", "KeyW"], // Up arrow, W
  rotateCw: ["KeyF", "ShiftRight"], // F, Shift
  rotateCcw: ["KeyQ", "Slash"], // Q, /
  reflect: ["Space", "KeyT", "KeyP"], // Space, T, P
  bank: ["CapsLock", "Tab", "KeyX", "KeyC"], // CapsLock, Tab, X, C
});

export { pentominoes, controlMapping };
