import { useEffect } from "react";

interface KeybindOverlayProps {
  onClose: () => void;
  onKeyPress: (key: string) => void;
}

export default function KeybindOverlay({
  onClose,
  onKeyPress,
}: KeybindOverlayProps) {
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
    <div className="absolute inset-0 bg-black bg-opacity-90 flex justify-center items-center">
      <div className="p-8 rounded-lg shadow-lg flex flex-col justify-center items-center">
        <p className="text-center text-lg text-white mb-2">Press any key</p>
        <p className="text-center text-white text-sm">or click to cancel</p>
      </div>
    </div>
  );
}
