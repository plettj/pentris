/* eslint-disable no-var */
import { defaultKeybinds } from "./constants";
import Board from "./logic/board";
import Controls from "./logic/controls";
import Graphics from "./logic/graphics";
import Score from "./logic/score";
import Theme from "./logic/theme";

const createGraphicsSingleton = () => {
  return new Graphics();
};

const createBoardSingleton = () => {
  return new Board();
};

const createScoreSingleton = () => {
  return new Score();
};

const createThemeSingleton = () => {
  return new Theme();
};

const createControlsSingleton = () => {
  return new Controls(defaultKeybinds);
};

declare global {
  // `var` instead of `let` intentionally. https://stackoverflow.com/a/69429093/8360465
  var graphics: Graphics | undefined;
  var board: Board | undefined;
  var score: Score | undefined;
  var theme: Theme | undefined;
  var controls: Controls | undefined;
}

if (!globalThis.graphics) globalThis.graphics = createGraphicsSingleton();
if (!globalThis.board) globalThis.board = createBoardSingleton();
if (!globalThis.score) globalThis.score = createScoreSingleton();
if (!globalThis.theme) globalThis.theme = createThemeSingleton();
if (!globalThis.controls) globalThis.controls = createControlsSingleton();

const graphics = globalThis.graphics as Graphics;
const board = globalThis.board as Board;
const score = globalThis.score as Score;
const theme = globalThis.theme as Theme;
const controls = globalThis.controls as Controls;

export { board, controls, graphics, score, theme };
