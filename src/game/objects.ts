import Graphics from "./logic/graphics";
import Board from "./logic/board";

const createGraphicsSingleton = () => {
  return new Graphics();
};

const createBoardSingleton = () => {
  return new Board();
};

declare global {
  var graphics: Graphics | undefined;
  var board: Board | undefined;
}

const graphics = global.graphics ?? createGraphicsSingleton();
const board = global.board ?? createBoardSingleton();

if (process.env.NODE_ENV !== "production") {
  global.graphics = graphics;
  global.board = board;
}

export { graphics, board };
