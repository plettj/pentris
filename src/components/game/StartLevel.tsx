import { useTheme } from "@/context/ThemeContext";
import { levelSpeeds } from "@/game/constants";
import { score } from "game/objects";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Input } from "../ui/input";

export default function StartLevel() {
  const { themeName } = useTheme();
  const [startLevel, setStartLevel] = useLocalStorage("startLevel", 1);
  const [inputValue, setInputValue] = useState(startLevel.toString());

  useEffect(() => {
    if (startLevel > 1 && startLevel <= levelSpeeds.length) {
      score.startLevel = startLevel - 1;
    } else {
      score.startLevel = 0;
    }
  }, [startLevel]);

  const handleLevelChange = (event: React.FormEvent<HTMLInputElement>) => {
    const text = event.currentTarget.value;
    setInputValue(text);

    const value = parseInt(text, 10);

    if (isNaN(value) || value < 1 || value > levelSpeeds.length) {
      return;
    }

    setStartLevel(value);
  };

  const isValid =
    parseInt(inputValue) > 0 && parseInt(inputValue) <= levelSpeeds.length;

  return (
    <div className="w-56 flex flex-col justify-center">
      <label htmlFor="startLevel" className="mb-2">
        Start Level
      </label>
      <Input
        className="w-full"
        type="number"
        id="startLevel"
        placeholder="1 to 26"
        value={inputValue}
        onChange={handleLevelChange}
        style={{
          borderColor: isValid
            ? undefined
            : themeName === "light"
            ? "#f2e2e1"
            : "#f01d16",
          backgroundColor: isValid ? undefined : "#2e0302",
        }}
      />
    </div>
  );
}
