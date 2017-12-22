import {Vec2} from './math.js';

export class Circle {
  constructor(x, y, r, id = null) {
    this.id = id;
    this.pos = new Vec2(x, y);
    this.radius = r;
  }
}
