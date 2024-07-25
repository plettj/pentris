"use client";

import { useTheme } from "@/context/ThemeContext";
import { board, graphics } from "@/game/objects";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { handleKey } from "game/logic/controls";
import { useCallback, useEffect, useRef, useState } from "react";
import Modal from "../general/Modal";
import Canvas from "./Canvas";
import Score from "./Score";
import { getUnitFromHeight } from "@/game/util";

export default function Game() {
  const cStaticRef = useRef<HTMLCanvasElement | null>(null);
  const cActionRef = useRef<HTMLCanvasElement | null>(null);
  const cAnimationRef = useRef<HTMLCanvasElement | null>(null);
  const cGhostRef = useRef<HTMLCanvasElement | null>(null);
  const cExternalRef = useRef<HTMLCanvasElement | null>(null);

  const { theme } = useTheme();

  const [open, setOpen] = useState(false);
  const [resizeDetails, setResizeDetails] = useState<{
    larger: boolean;
    width: number;
    height: number;
  } | null>(null);

  const [unit, setUnit] = useState(getUnitFromHeight(740));

  const width = unit * board.size[0];
  const height = unit * (board.size[1] + board.topGap);

  const handleThresholdChange = useCallback(
    (change: { larger: boolean; width: number; height: number }) => {
      setResizeDetails(change);
      setOpen(true);
      graphics.pause(true);
    },
    []
  );

  useWindowDimensions(handleThresholdChange);

  const initializeCanvases = (refreshing?: boolean) => {
    const canvases = [
      cStaticRef,
      cActionRef,
      cAnimationRef,
      cGhostRef,
      cExternalRef,
    ];

    const contexts = canvases.map((canvasRef) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return undefined;
      }

      const context = canvas.getContext("2d")!;

      return context;
    });

    if (!contexts.every((context) => context !== undefined)) {
      console.error("Game context setup failed.");
      return;
    }

    graphics.init(contexts as CanvasRenderingContext2D[]);

    if (!refreshing) {
      board.init(width / 13);
    } else {
      board.refreshSize(width / 13);
    }
  };

  const handleSubmitAction = (success: boolean) => {
    if (success) {
      // Update the screen unit size.
      setUnit(getUnitFromHeight(height));

      initializeCanvases(true);
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
    <div className="relative">
      <section
        className={`relative border-2`}
        style={{
          borderColor: theme.outline,
          width: `${width + 3}px`,
          height: `${height + 4}px`,
        }}
      >
        <Canvas ref={cStaticRef} width={width} height={height} />
        <Canvas ref={cActionRef} width={width} height={height} />
        <Canvas ref={cGhostRef} width={width} height={height} />
        <Canvas ref={cAnimationRef} width={width} height={height} />
        <div className="relative" style={{ marginLeft: `-${width / 2}px` }}>
          <Canvas ref={cExternalRef} width={width * 2} height={height} />
        </div>
      </section>
      <Score />
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
    </div>
  );
}
