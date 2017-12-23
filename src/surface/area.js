import {Circle} from './shape.js';
import {Vec2} from './math.js';
import {vibe} from './vibrate.js';

class Area {
  constructor(shape, id = null) {
    this.shape = shape;
    this.id = id;
  }
}

export class Button extends Area{
  constructor(shape, id) {
    super(shape, id);
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

export class Axis extends Area {
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
      } else if (this.shape.size) {
        const pos = new Vec2(
          (touch.pos.x - this.shape.pos.x) / this.shape.size.x / 0.5,
          (touch.pos.y - this.shape.pos.y) / this.shape.size.y / -0.5);
        callback(pos);
      }
    }
  }
}
