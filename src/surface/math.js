export class Vec2 {
  constructor(x, y) {
    this.set(x, y);
  }

  copy(vec2) {
    this.set(vec2.x, vec2.y);
  }

  equals(vec2) {
    return this.x === vec2.x && this.y === vec2.y;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }
}
