import { graphics, board } from "game/objects";

export default class Graphics {
  paused: boolean = false;
  contexts: CanvasRenderingContext2D[] = [];
  frame: number = 0;

  constructor() {}

  init(contexts: CanvasRenderingContext2D[]) {
    this.contexts = contexts;
  }

  render() {
    if (this.paused) return;

    this.frame++;
    board.render();
  }

  pause(pause?: boolean) {
    this.paused = pause !== undefined ? pause : !this.paused;
  }
}
