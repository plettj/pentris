const themes: Record<string, ThemeType> = {
  light: {
    background: "#ffffff",
    outline: "#000000",
    pieces: {
      placed: "#000000",
      ghost: "#bbbbbb",
    },
  },
  dark: {
    background: "#000000",
    outline: "#ffffff",
    pieces: {
      placed: "#ffffff",
      ghost: "#444444",
    },
  },
  "dark soft": {
    background: "#0a0a0a",
    outline: "#bbbbbb",
    pieces: {
      placed: "#bbbbbb",
      ghost: "#555555",
    },
  },
};

type ThemeName = keyof typeof themes;

export default class Theme {
  theme: ThemeName = "dark";

  private onChange: () => void = () => {};

  constructor() {}

  setTheme(theme: ThemeName) {
    if (this.theme === theme) {
      return;
    }

    this.theme = theme;
    this.onChange();
  }

  setOnChange(callback: () => void) {
    this.onChange = callback;
  }

  getTheme() {
    return themes[this.theme];
  }
}