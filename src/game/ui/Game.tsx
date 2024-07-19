"use client";

import { useEffect, useRef } from "react";
import Canvas from "./Canvas";
import { handleKey } from "../logic/controls";
import { Graphics } from "../logic/graphics";

export default function Game() {
  const cStaticRef = useRef<HTMLCanvasElement | null>(null); // Static graphics canvas - Renders once.
  const cActionRef = useRef<HTMLCanvasElement | null>(null); // Un-animated canvas - Renders on major game actions.
  const cAnimationRef = useRef<HTMLCanvasElement | null>(null); // Animated canvas - Renders every frame.
  const cOverlayRef = useRef<HTMLCanvasElement | null>(null); // Overlay canvas - Renders whenever you call it.

  const width = 250;
  const height = 500;

  // Initialize the game canvases when this component mounts.
  // Helpful link: https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once
  useEffect(() => {
    const canvases = [cStaticRef, cActionRef, cAnimationRef, cOverlayRef];

    const contexts = canvases.map((canvasRef) => {
      const canvas = canvasRef.current;

      if (!canvas) {
        return;
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

    if (!contexts.every((context) => context != undefined)) {
      console.error("Game context setup failed.");
      return;
    }

    // This will log twice in dev mode if you have `strict: true` in your ts config. That's fine.
    // Helpful link: https://stackoverflow.com/questions/48846289/why-is-my-react-component-is-rendering-twice
    console.log("Game context setup complete.");

    // Hook up the keyboard event listeners.
    window.addEventListener("keydown", handleKey("down"));
    window.addEventListener("keyup", handleKey("up"));

    // TODO: Move pretty much all of the below into the Graphics class.
    // Initialize the game graphics engine.

    // FIXME: Currently the graphics class can't render anything
    //        because the contexts can't be referenced outside a react component (apparently...)
    const graphics = new Graphics(contexts);

    // Set up the animation loop with browser best-practices.
    // Helpful link: https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe#comment38674664_19772220
    let frameCount = 0;
    let animationFrameId: number;
    let fps = 60;
    let fpsInterval = 1000 / fps;
    let then = window.performance.now();
    let now, elapsed;

    const animate = (newTime: number) => {
      requestAnimationFrame(animate);

      now = newTime;
      elapsed = now - then;

      if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        frameCount++;

        // Where it all starts.
        graphics.render();
      }
    };

    then = window.performance.now();
    animate(then);

    return () => {
      window.removeEventListener("keydown", handleKey("down"));
      window.removeEventListener("keyup", handleKey("up"));
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative border">
      <Canvas ref={cStaticRef} width={width} height={height} />
      <Canvas ref={cActionRef} width={width} height={height} />
      <Canvas ref={cAnimationRef} width={width} height={height} />
      <Canvas ref={cOverlayRef} width={width} height={height} />
    </section>
  );
}
