"use client";

import useWindowDimensions from "@/hooks/useWindowDimensions";
import { graphics } from "game/graphics";
import { handleKey } from "game/logic/controls";
import { useCallback, useEffect, useRef, useState } from "react";
import Modal from "../general/Modal";
import Canvas from "./Canvas";

export default function Game() {
  const cStaticRef = useRef<HTMLCanvasElement | null>(null);
  const cActionRef = useRef<HTMLCanvasElement | null>(null);
  const cAnimationRef = useRef<HTMLCanvasElement | null>(null);
  const cOverlayRef = useRef<HTMLCanvasElement | null>(null);

  const [open, setOpen] = useState(false);
  const [resizeDetails, setResizeDetails] = useState<{
    larger: boolean;
  } | null>(null);

  const width = 250;
  const height = 500;

  const handleThresholdChange = useCallback((change: { larger: boolean }) => {
    setResizeDetails(change);
    setOpen(true);
    graphics.pause(true);
  }, []);

  useWindowDimensions(handleThresholdChange);

  const handleSubmitAction = (success: boolean) => {
    if (success) {
      const canvases = [cStaticRef, cActionRef, cAnimationRef, cOverlayRef];

      const contexts = canvases.map((canvasRef) => {
        const canvas = canvasRef.current;
        if (!canvas) {
          return undefined;
        }

        const context = canvas.getContext("2d")!;

        // Set up the canvas for high-DPI displays.
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
      graphics.pause(false);
    }

    setOpen(false);
  };

  useEffect(() => {
    const canvases = [cStaticRef, cActionRef, cAnimationRef, cOverlayRef];

    const contexts = canvases.map((canvasRef) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return undefined;
      }

      const context = canvas.getContext("2d")!;

      // Set up the canvas for high-DPI displays.
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
    <>
      <section
        className={`relative bg-red-200 border border-white border-s-2 border-solid w-[${width}px] h-[${height}px]`}
      >
        <Canvas ref={cStaticRef} width={width} height={height} />
        <Canvas ref={cActionRef} width={width} height={height} />
        <Canvas ref={cAnimationRef} width={width} height={height} />
        <Canvas ref={cOverlayRef} width={width} height={height} />
      </section>
      {open && (
        <Modal
          title="Screen Resized"
          description={`The screen has ${
            resizeDetails?.larger ? "grown larger" : "shrunk smaller"
          }. Would you like to reload the game to fit the screen?`}
          action="Reload"
          open={open}
          setOpen={setOpen}
          submitAction={handleSubmitAction}
        />
      )}
    </>
  );
}
