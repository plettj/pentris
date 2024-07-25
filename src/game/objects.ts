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
  var graphics: Graphics | undefined;
  var board: Board | undefined;
  var score: Score | undefined;
  var theme: Theme | undefined;
}

const graphics = global.graphics ?? createGraphicsSingleton();
const board = global.board ?? createBoardSingleton();
const score = global.score ?? createScoreSingleton();
const theme = global.theme ?? createThemeSingleton();

if (process.env.NODE_ENV !== "production") {
  global.graphics = graphics;
  global.board = board;
  global.score = score;
  global.theme = theme;
}

export { board, graphics, score, theme };
