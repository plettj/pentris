"use client";

import { useTheme } from "@/context/ThemeContext";
import { board, graphics } from "@/game/objects";
import { getUnitFromHeight } from "@/game/util";
import { handleKey } from "game/logic/controls";
import { useEffect, useRef } from "react";
import Canvas from "./Canvas";
import Score from "./Score";

export default function Game() {
  const cStaticRef = useRef<HTMLCanvasElement | null>(null);
  const cActionRef = useRef<HTMLCanvasElement | null>(null);
  const cAnimationRef = useRef<HTMLCanvasElement | null>(null);
  const cGhostRef = useRef<HTMLCanvasElement | null>(null);
  const cExternalRef = useRef<HTMLCanvasElement | null>(null);

  const { theme } = useTheme();

  const unit = getUnitFromHeight(740);
  const width = unit * board.size[0];
  const height = unit * (board.size[1] + board.topGap);

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

    graphics?.init(contexts as CanvasRenderingContext2D[]);

    if (!refreshing) {
      board.init(width / 13);
    } else {
      board.refreshSize(width / 13);
    }
  };

  useEffect(() => {
    initializeCanvases();

    window.addEventListener("keydown", handleKey("down"));
    window.addEventListener("keyup", handleKey("up"));

    return () => {
      window.removeEventListener("keydown", handleKey("down"));
      window.removeEventListener("keyup", handleKey("up"));
      window.cancelAnimationFrame(graphics.animationFrameId);
    };
    // Empty dependency array to run once on mount.
    // All dependencies eslint finds are constants, so we can ignore them.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative">
      <section
        className={`relative border-x-2 pb-1`}
        style={{
          borderColor: theme.outline,
          width: `${width + 4}px`,
          height: `${height + 4}px`,
        }}
      >
        <Canvas ref={cStaticRef} width={width} height={height} />
        <Canvas ref={cActionRef} width={width} height={height} />
        <Canvas ref={cGhostRef} width={width} height={height} />
        <Canvas ref={cAnimationRef} width={width} height={height} />
        <div
          className="relative border-2"
          style={{
            marginLeft: `-${width / 2 - 2}px`,
            marginTop: "-2px",
            borderColor: theme.outline,
            width: `${width * 2}px`,
            height: `${height + 4}px`,
          }}
        >
          <Canvas ref={cExternalRef} width={width * 2} height={height} />
        </div>
      </section>
      <Score width={width} />
    </div>
  );
}
