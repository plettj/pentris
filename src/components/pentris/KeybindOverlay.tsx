import { useTheme } from "@/context/ThemeContext";
import { useEffect } from "react";

interface KeybindOverlayProps {
  onClose: () => void;
  onKeyPress: (key: string) => void;
}

export default function KeybindOverlay({
  onClose,
  onKeyPress,
}: KeybindOverlayProps) {
  const { themeName, theme } = useTheme();
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log(event);
      onKeyPress(event.code);
      onClose();
    };

    const handleClick = (event: MouseEvent) => {
      event.stopPropagation();
      onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClick);
    };
  }, [onClose, onKeyPress]);

  return (
    <div
      className="absolute -inset-2 flex flex-col justify-center items-center"
      style={{
        backgroundColor:
          themeName === "light"
            ? "rgba(255, 255, 255, 0.93)"
            : "rgba(0, 0, 0, 0.85)",
        color: theme.outline,
      }}
    >
      <p className="text-center text-lg mb-2">Press any key</p>
      <p className="text-center text-sm">or click to cancel</p>
    </div>
  );
}
