import Board from "./board";
import Graphics from "./graphics";
import Score from "./score";
import Theme from "./theme";

export default class Manager {
  static graphics = new Graphics();
  static board = new Board();
  static score = new Score();
  static theme = new Theme();
}
