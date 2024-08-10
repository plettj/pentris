import { board, graphics } from "game/objects";
import { newbieControlMapping } from "../constants";

export default class ControlMapping {
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
}

export const handleKey = (type: "down" | "up") => (event: KeyboardEvent) => {
  if (graphics.paused) return;

  const action: GameAction | null = newbieControlMapping.getAction(event.code);

  if (action === null) {
    return;
  }

  event.preventDefault();
  board.move(action, type === "down");
};
