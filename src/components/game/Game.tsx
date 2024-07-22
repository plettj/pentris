"use client";

import { board, graphics } from "@/game/objects";
import useWindowDimensions from "@/hooks/useWindowDimensions";
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
    width: number;
    height: number;
  } | null>(null);

  // TODO: Move the calculation of width and height into a game state
  //       logic object that handles all game state variables.
  const width = 286; // 22 * 13
  const height = 682; // 22 * (26 + 5)

  const handleThresholdChange = useCallback(
    (change: { larger: boolean; width: number; height: number }) => {
      setResizeDetails(change);
      setOpen(true);
      graphics.pause(true);
    },
    []
  );

  useWindowDimensions(handleThresholdChange);

  const initializeCanvases = () => {
    const canvases = [cStaticRef, cActionRef, cAnimationRef, cOverlayRef];

    const contexts = canvases.map((canvasRef) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return undefined;
      }

      const context = canvas.getContext("2d")!;

      // Prevent anti-aliasing on high-DPI displays.
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
    board.init(width / 13);
  };

  const handleSubmitAction = (success: boolean) => {
    if (success) {
      initializeCanvases();
    }

    graphics.pause(false);
    setOpen(false);
  };

  useEffect(() => {
    initializeCanvases();

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

        graphics.render();
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
    // Empty dependency array to run once on mount.
    // All dependencies eslint finds are constants, so we can ignore them.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className="relative border border-white w-[300px] h-[650px]">
        <Canvas ref={cStaticRef} width={width} height={height} />
        <Canvas ref={cActionRef} width={width} height={height} />
        <Canvas ref={cAnimationRef} width={width} height={height} />
        <Canvas ref={cOverlayRef} width={width} height={height} />
      </section>
      <Modal
        title="Screen Resized"
        description={`The screen has ${
          resizeDetails?.larger ? "grown larger" : "shrunk smaller"
        }. Would you like to update the game to fit the screen?`}
        action="Update"
        open={open}
        setOpen={setOpen}
        submitAction={handleSubmitAction}
      />
    </>
  );
}