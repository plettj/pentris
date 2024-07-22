"use client";

import { useEffect, useRef } from "react";
import { graphics } from "../graphics";
import { handleKey } from "../logic/controls";
import Canvas from "./Canvas";

export default function Game() {
  const cStaticRef = useRef<HTMLCanvasElement | null>(null);
  const cActionRef = useRef<HTMLCanvasElement | null>(null);
  const cAnimationRef = useRef<HTMLCanvasElement | null>(null);
  const cOverlayRef = useRef<HTMLCanvasElement | null>(null);

  const width = 250;
  const height = 500;

  useEffect(() => {
    const canvases = [cStaticRef, cActionRef, cAnimationRef, cOverlayRef];

    const contexts = canvases.map((canvasRef) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return undefined;
      }

      const context = canvas.getContext("2d")!;

      // Set up the canvas for high-DPI displays.
      // Helpful link: https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258#:~:text=high%20pixel%20density%20devices
      const { devicePixelRatio: ratio = 1 } = window;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.scale(ratio, ratio);

      return context;
    });

    if (!contexts.every((context) => context !== undefined)) {
      console.error("Game context setup failed.");
      return;
    }

    graphics.init(contexts as CanvasRenderingContext2D[]);

    /**
     * Global animation frame value.
     */
    let frame = 0;

    // Set up the animation loop with browser best-practices.
    // Helpful link: https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe#comment38674664_19772220
    let fps = 60;
    let fpsInterval = 1000 / fps;
    let then = window.performance.now();
    let now, elapsed;

    const animate = (newTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      now = newTime;
      elapsed = now - then;

      if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        frame++;

        graphics.render(frame);
      }
    };

    let animationFrameId = requestAnimationFrame(animate);

    window.addEventListener("keydown", handleKey("down"));
    window.addEventListener("keyup", handleKey("up"));

    return () => {
      window.removeEventListener("keydown", handleKey("down"));
      window.removeEventListener("keyup", handleKey("up"));
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      className={`relative border border-white w-[${width}px] h-[${height}px]`}
    >
      <Canvas ref={cStaticRef} width={width} height={height} />
      <Canvas ref={cActionRef} width={width} height={height} />
      <Canvas ref={cAnimationRef} width={width} height={height} />
      <Canvas ref={cOverlayRef} width={width} height={height} />
    </section>
  );
}
