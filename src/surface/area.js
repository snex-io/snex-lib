import {Circle} from './shape.js';
import {Vec2} from './math.js';
import {vibe} from './vibrate.js';

export class Button {
  constructor(shape, id = null) {
    this.shape = shape;
    this.id = id;
    this.state = false;
  }

  onTouches (touches, callback) {
    let state = false;

    for (const touch of touches) {
      const intersects = this.shape.intersects(touch);

      if (intersects) {
        state = true;
        break;
      }
    }

    if (this.state !== state) {
      if (state) {
        vibe(20);
      }

      this.state = state;

      callback(state);
    }
  }
}

export class Coord {
  constructor(shape, id = null) {
    this.shape = shape;
    this.id = id;
  }

  onTouches (touches, callback) {
    for (const touch of touches) {
      if (!this.shape.intersects(touch)) {
        continue;
      }

      if (this.shape.radius) {
        const size = this.shape.radius;
        const pos = new Vec2(
          (touch.pos.x - this.shape.pos.x) / size,
          (touch.pos.y - this.shape.pos.y) / size);
        callback(pos);
      }
    }
  }
}
