import Board from "./board";
import Graphics from "./graphics";
import ControlMapping from "./controls";
import { controlMapping } from "../constants";

// TODO: Make the Manager the main class,
//       that initializes and manages the game.
export default class Manager {
  paused: boolean = false;
  graphics: Graphics;
  board: Board;
  controls: ControlMapping;

  constructor() {
    this.graphics = new Graphics();
    this.board = new Board();
    this.controls = controlMapping;
  }
}
