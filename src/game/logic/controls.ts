import { board, controls, graphics } from "game/objects";

export default class Controls {
  private mapping: Keybinds;

  constructor(mapping: Record<GameAction, string[]>) {
    this.mapping = new Map();
    for (const [action, codes] of Object.entries(mapping)) {
      codes.forEach((code) => {
        this.mapping.set(code, action as GameAction);
      });
    }
  }

  getAction(code: string): GameAction | null {
    return this.mapping.get(code) || null;
  }

  getMapping(): Keybinds {
    return this.mapping;
  }

  setMapping(mapping: Keybinds) {
    this.mapping = mapping;
  }
}

const handleKey = (type: "down" | "up") => (event: KeyboardEvent) => {
  if (graphics.paused || !controls) return;

  const action: GameAction | null = controls.getAction(event.code);

  if (action === null) {
    return;
  }

  event.preventDefault();
  board.move(action, type === "down");
};

export function handleKeyDown(event: KeyboardEvent) {
  handleKey("down")(event);
}

export function handleKeyUp(event: KeyboardEvent) {
  handleKey("up")(event);
}
