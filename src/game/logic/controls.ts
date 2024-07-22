import { controlMapping } from "../constants";
import { board } from "game/objects";

export const handleKey = (type: "down" | "up") => (event: KeyboardEvent) => {
  const action: GameAction | null = controlMapping.getAction(event.code);

  if (action === null) {
    return;
  }

  event.preventDefault();
  board.move(action, type === "down");
};
