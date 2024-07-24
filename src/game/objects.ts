import Board from "./logic/board";
import Graphics from "./logic/graphics";
import Score from "./logic/score";

const createGraphicsSingleton = () => {
  return new Graphics();
};

const createBoardSingleton = () => {
  return new Board();
};

const createScoreSingleton = () => {
  return new Score();
};

declare global {
  var graphics: Graphics | undefined;
  var board: Board | undefined;
  var score: Score | undefined;
}

const graphics = global.graphics ?? createGraphicsSingleton();
const board = global.board ?? createBoardSingleton();
const score = global.score ?? createScoreSingleton();

if (process.env.NODE_ENV !== "production") {
  global.graphics = graphics;
  global.board = board;
  global.score = score;
}

export { board, graphics, score };
