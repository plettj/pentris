import Manager from "./manager";

export default class Graphics {
  paused: boolean = true;
  contexts: CanvasRenderingContext2D[] = [];
  frame: number = 0;

  constructor() {}

  init(contexts: CanvasRenderingContext2D[]) {
    this.contexts = contexts;
    // Preliminary render to draw background graphics.
    Manager.board.render();
  }

  render() {
    if (this.paused) return;
    this.frame++;

    Manager.board.render();

    if (this.frame % (60 * Manager.score.levelLength) === 0) {
      Manager.score.updateLevel();
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
