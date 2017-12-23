import {Vec2} from './math.js';
import {circlesIntersect, circleIntersectsRectangle} from './geometry.js';

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

export class Rect {
  constructor(x, y, w, h) {
    this.pos = new Vec2(x, y);
    this.size = new Vec2(w, h);
  }

  intersects (touch) {
    return circleIntersectsRectangle(touch, this);
  }
}
