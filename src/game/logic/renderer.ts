function drawCircle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  frameCount: number
) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.arc(x, y, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
  ctx.fill();
}

export class Renderer {
  initialized: boolean = false;
  private paused: boolean = false;
  private contexts: CanvasRenderingContext2D[] = [];

  private static readonly GAME_STEP_SPEED = 45; // frames per game step

  constructor() {}

  init(contexts: CanvasRenderingContext2D[]) {
    this.contexts = contexts;
    this.initialized = true;
  }

  render(frame: number) {
    if (this.paused) return;
    drawCircle(this.contexts[2], 50, 50, frame);
    drawCircle(this.contexts[3], 150, 50, frame / 2);
  }

  pause(pause?: boolean) {
    this.paused = pause !== undefined ? pause : !this.paused;
  }
}
