function drawCircle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  frameCount: number
) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.arc(x, y, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
  ctx.fill();
}

export class Renderer {
  initialized: boolean = false;
  private contexts: CanvasRenderingContext2D[] = [];

  private static readonly GAME_STEP_SPEED = 45; // frames per game step

  constructor() {}

  init(contexts: CanvasRenderingContext2D[]) {
    this.contexts = contexts;
    this.initialized = true;
  }

  render(frame: number) {
    drawCircle(this.contexts[2], 50, 100, frame);
    drawCircle(this.contexts[3], 100, 100, frame / 2);
  }
}
