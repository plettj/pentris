import { controlMapping } from "../constants";
import Manager from "./manager";

export default class ControlMapping {
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

export const handleKey = (type: "down" | "up") => (event: KeyboardEvent) => {
  if (Manager.graphics.paused) return;

  const action: GameAction | null = controlMapping.getAction(event.code);

  if (action === null) {
    return;
  }

  event.preventDefault();
  Manager.board.move(action, type === "down");
};
