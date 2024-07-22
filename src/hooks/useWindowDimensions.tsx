import { useState, useEffect, useCallback } from "react";

const displaySizes = [
  [640, 480],
  [1024, 768],
  [1280, 800],
  [1536, 864],
];

export default function useWindowDimensions(
  onThresholdChange: (change: { larger: boolean }) => void
) {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const handleResize = useCallback(() => {
    const { width, height } = getWindowDimensions();
    const thresholdChange = calculateThresholdChange(
      width,
      height,
      windowDimensions
    );

    if (thresholdChange) {
      const larger =
        width > windowDimensions.width || height > windowDimensions.height;
      onThresholdChange({ larger });
    }

    setWindowDimensions({ width, height });
  }, [windowDimensions, onThresholdChange]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return windowDimensions;
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}

function calculateThresholdChange(
  width: number,
  height: number,
  currentDimensions: { width: number; height: number }
) {
  for (const [thresholdWidth, thresholdHeight] of displaySizes) {
    const widthChange =
      Math.abs(width - currentDimensions.width) > thresholdWidth;
    const heightChange =
      Math.abs(height - currentDimensions.height) > thresholdHeight;

    if (widthChange || heightChange) {
      return true;
    }
  }
  return false;
}
