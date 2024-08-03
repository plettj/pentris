"use client";

import { useTheme } from "@/context/ThemeContext";
import Manager from "@/game/logic/manager";
import { getUnitFromHeight } from "@/game/util";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { handleKey } from "game/logic/controls";
import { useCallback, useEffect, useRef, useState } from "react";
import Modal from "../general/Modal";
import Canvas from "./Canvas";
import Score from "./Score";

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

  const width = unit * Manager.board.size[0];
  const height = unit * (Manager.board.size[1] + Manager.board.topGap);

  const safeGraphicsPause = (pause: boolean) => {
    var intr = setInterval(function () {
      if (Manager.graphics) {
        Manager.graphics.pause(pause);
        clearInterval(intr);
      }
    }, 200);
  };

  const handleThresholdChange = useCallback(
    (change: { larger: boolean; width: number; height: number }) => {
      setResizeDetails(change);
      setOpen(true);
      safeGraphicsPause(true);
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

    Manager.graphics?.init(contexts as CanvasRenderingContext2D[]);

    if (!refreshing) {
      Manager.board.init(width / 13);
    } else {
      Manager.board.refreshSize(width / 13);
    }
  };

  const handleSubmitAction = (success: boolean) => {
    if (success) {
      // Update the screen unit size.
      setUnit(getUnitFromHeight(height));

      initializeCanvases(true);
    }

    safeGraphicsPause(false);
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

        Manager.graphics?.render();
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
      <Score width={width} />
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
