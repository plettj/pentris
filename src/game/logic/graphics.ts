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

export class Graphics {
  private contexts: CanvasRenderingContext2D[];
  private lastStepTime: number;

  private static readonly GAME_STEP_SPEED = 45; // frames per game step

  constructor(contexts: CanvasRenderingContext2D[]) {
    this.contexts = contexts;
    this.lastStepTime = 0;

    console.log(this.contexts);
    drawCircle(this.contexts[2], 50, 100, this.lastStepTime);
    drawCircle(this.contexts[3], 100, 100, this.lastStepTime / 2);
  }

  render() {
    // drawCircle(this.contexts[2], 50, 100, this.lastStepTime);
    // drawCircle(this.contexts[3], 100, 100, this.lastStepTime / 2);
  }
}
