import { board } from "game/objects";

export default class Graphics {
  paused: boolean = true;
  contexts: CanvasRenderingContext2D[] = [];
  frame: number = 0;
  animationFrameId: number = 0;
  private fps = 60;
  private fpsInterval = 1000 / this.fps;
  private then = 0;
  private now = 0;
  private elapsed = 0;

  constructor() {}

  init(contexts: CanvasRenderingContext2D[]) {
    this.contexts = contexts;
    // Preliminary render to draw background graphics.
    board.render();
  }

  animate(newTime: number = 0) {
    this.animationFrameId = requestAnimationFrame((t) => {
      this.animate(t);
    });

    this.now = newTime;
    this.elapsed = this.now - this.then;

    if (this.elapsed > this.fpsInterval) {
      this.then = this.now - (this.elapsed % this.fpsInterval);

      this.render();
    }
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
