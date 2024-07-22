import { useState, useEffect, useCallback } from "react";

export const displaySizes = [
  [640, 480],
  [1024, 768],
  [1280, 800],
  [1536, 864],
];

export default function useWindowDimensions(
  onThresholdChange: (change: {
    larger: boolean;
    width: number;
    height: number;
  }) => void
) {
  const [windowDimensions, setWindowDimensions] = useState(
    getInitialWindowDimensions()
  );

  const handleResize = useCallback(() => {
    const { width, height } = getWindowDimensions();

    const thresholdChange = calculateThresholdChange(
      width,
      height,
      windowDimensions
    );

    if (thresholdChange) {
      const larger = height > windowDimensions.height;
      onThresholdChange({ larger, width, height });
    }

    setWindowDimensions({ width, height });
  }, [windowDimensions, onThresholdChange]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [handleResize]);

  return windowDimensions;
}

function getInitialWindowDimensions() {
  if (typeof window !== "undefined") {
    return getWindowDimensions();
  }
  return { width: 0, height: 0 }; // Default values for SSR
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
  const crossedThreshold = (
    current: number,
    newValue: number,
    threshold: number
  ) =>
    (current < threshold && newValue >= threshold) ||
    (current >= threshold && newValue < threshold);

  return displaySizes.some(
    ([thresholdWidth, thresholdHeight]) =>
      crossedThreshold(currentDimensions.width, width, thresholdWidth) ||
      crossedThreshold(currentDimensions.height, height, thresholdHeight)
  );
}
