"use client";

import { forwardRef } from "react";

// We are using forwardRef so that our parent component can manage this canvas.
// Helpful link: https://www.dhiwise.com/post/react-workflow-how-to-pass-ref-to-child-effectively
const Canvas = forwardRef<HTMLCanvasElement, { width: number; height: number }>(
  (props, ref) => {
    return <canvas ref={ref} className="absolute left-0 top-0" {...props} />;
  }
);

Canvas.displayName = "Canvas";

export default Canvas;
