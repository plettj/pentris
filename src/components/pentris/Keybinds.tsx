import { useTheme } from "@/context/ThemeContext";
import { newbieControlMapping } from "@/game/constants";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import KeybindOverlay from "./KeybindOverlay";

export default function Keybinds() {
  const { theme } = useTheme();
  const [keybinds, setKeybinds] = useState<Keybinds>(new Map());
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [currentAction, setCurrentAction] = useState<GameAction | null>(null);

  function getKeybindsFromAction(action: GameAction): string[] {
    return Array.from(keybinds.entries())
      .filter(([_, value]) => value === action)
      .map(([key, _]) => key);
  }

  useEffect(() => {
    setKeybinds(newbieControlMapping.getMapping());
  }, []);

  const handleButtonClick = (action: GameAction) => {
    setShowOverlay(true);
    setCurrentAction(action);
  };

  const handleOverlayClose = () => {
    setShowOverlay(false);
    setCurrentAction(null);
  };

  const handleKeyPress = (code: string) => {
    console.log("key:" + code);
    if (!code) return;
    const newKeybinds = new Map(keybinds);
    const oldAction = newKeybinds.get(code);
    if (oldAction) {
      newKeybinds.delete(code);
    }
    // Remove all other keybinds for the current action
    Array.from(newKeybinds.entries())
      .filter(([_, value]) => value === currentAction)
      .forEach(([key, _]) => newKeybinds.delete(key));
    newKeybinds.set(code, currentAction!);
    setKeybinds(newKeybinds);
  };

  return (
    <div className="relative w-full flex flex-col gap-2 items-center">
      {actions.map(({ label, action }) => (
        <div key={action} className="w-full grid grid-cols-2 gap-1">
          <p>{label}</p>
          <Button
            className="text-base"
            size="sm"
            style={{
              color: theme.outline,
              backgroundColor:
                keyToDisplayText(getKeybindsFromAction(action)[0]) === "---"
                  ? "#7d1c13"
                  : "#1f1f1f",
            }}
            onClick={(event) => {
              event.stopPropagation();
              handleButtonClick(action);
            }}
          >
            {keyToDisplayText(getKeybindsFromAction(action)[0])}
          </Button>
        </div>
      ))}

      {showOverlay && (
        <KeybindOverlay
          onClose={handleOverlayClose}
          onKeyPress={handleKeyPress}
        />
      )}
    </div>
  );
}

const actions: { label: string; action: GameAction }[] = [
  { label: "Move Left", action: "left" },
  { label: "Move Right", action: "right" },
  { label: "Soft Drop", action: "down" },
  { label: "Sonic Drop", action: "drop" },
  { label: "Rotate CW", action: "rotateCw" },
  { label: "Rotate CCW", action: "rotateCcw" },
  { label: "Reflect", action: "reflect" },
  { label: "Hold", action: "bank" },
];

const keyToDisplayText = (code: string) => {
  if (!code) return "---";

  switch (code) {
    case "ArrowLeft":
      return "left arrow";
    case "ArrowRight":
      return "right arrow";
    case "ArrowDown":
      return "down arrow";
    case "ArrowUp":
      return "up arrow";
    default:
      if (code.startsWith("Key")) {
        return code.slice(3);
      }
      if (code.startsWith("Digit")) {
        return code.slice(5);
      }
      return code;
  }
};
