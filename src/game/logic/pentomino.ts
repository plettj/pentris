/**
 * Pentomino piece class.
 */
class Pent {
  readonly self: Pentomino;

  constructor(name: PentName) {
    this.self = pentominoes[name];
  }
}
