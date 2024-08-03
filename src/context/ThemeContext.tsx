"use client";

import Manager from "@/game/logic/manager";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

type ThemeContextType = {
  themeName: string;
  theme: ThemeType;
  setTheme: (themeName: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeName] = useState<string>(Manager.theme.theme);
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(
    Manager.theme.getTheme()
  );

  const handleChangeTheme = useCallback((themeName: string) => {
    setThemeName(themeName);
    Manager.theme.setTheme(themeName);
    setCurrentTheme(Manager.theme.getTheme());
  }, []);

  Manager.theme.setOnChange(() => {
    handleChangeTheme(Manager.theme.theme);
  });

  return (
    <ThemeContext.Provider
      value={{ themeName, theme: currentTheme, setTheme: handleChangeTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
