import Board from "./logic/board";
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

declare global {
  // `var` instead of `let` intentionally. https://stackoverflow.com/a/69429093/8360465
  var graphics: Graphics | undefined;
  var board: Board | undefined;
  var score: Score | undefined;
  var theme: Theme | undefined;
}

if (!globalThis.graphics) globalThis.graphics = createGraphicsSingleton();
if (!globalThis.board) globalThis.board = createBoardSingleton();
if (!globalThis.score) globalThis.score = createScoreSingleton();
if (!globalThis.theme) globalThis.theme = createThemeSingleton();

const graphics = globalThis.graphics as Graphics;
const board = globalThis.board as Board;
const score = globalThis.score as Score;
const theme = globalThis.theme as Theme;

export { board, graphics, score, theme };
