import { board } from "game/objects";

export default class Graphics {
  paused: boolean = false;
  contexts: CanvasRenderingContext2D[] = [];
  frame: number = 0;

  dropSpeed: number = 25; // Frames fallen per unit.

  constructor() {}

  init(contexts: CanvasRenderingContext2D[]) {
    this.contexts = contexts;
  }

  render() {
    if (this.paused) return;
    this.frame++;

    board.render();
  }

  clear(context: number) {
    const ctx = this.contexts[context];
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  pause(pause?: boolean) {
    this.paused = pause !== undefined ? pause : !this.paused;
  }
}
