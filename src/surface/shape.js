import {Vec2} from './math.js';
import {circlesIntersect} from './geometry.js';

export class Circle {
  constructor(x, y, r) {
    this.pos = new Vec2(x, y);
    this.radius = r;
  }

  intersects (touch) {
    return circlesIntersect(
        this.radius, touch.radius,
        this.pos.x, this.pos.y,
        touch.pos.x, touch.pos.y);
  }
}
