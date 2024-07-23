import { controlMapping } from "../constants";
import { board } from "game/objects";

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
  const action: GameAction | null = controlMapping.getAction(event.code);

  if (action === null) {
    return;
  }

  event.preventDefault();
  board.move(action, type === "down");
};
