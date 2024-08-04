import { board, score } from "game/objects";

export default class Graphics {
  paused: boolean = true;
  contexts: CanvasRenderingContext2D[] = [];
  frame: number = 0;

  constructor() {}

  init(contexts: CanvasRenderingContext2D[]) {
    this.contexts = contexts;
    // Preliminary render to draw background graphics.
    board.render();
  }

  render() {
    if (this.paused) return;
    this.frame++;

    board.render();

    if (this.frame % (60 * score.levelLength) === 0) {
      score.updateLevel();
    }
  }

  clear(context: number) {
    const ctx = this.contexts[context];
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  pause(pause?: boolean) {
    this.paused = pause !== undefined ? pause : !this.paused;
  }
}
