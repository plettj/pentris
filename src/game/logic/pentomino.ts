/**
 * Pentomino piece class.
 */
class Pent {
  readonly name: PentName;
  readonly shape: Grid;

  constructor(name: PentName) {
    this.name = name;
    this.shape = pentominoes[name].grid;
  }
}
