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
  constructor(shape, id) {
    super(shape, id);
    this.last = new Vec2(0, 0);
  }

  onTouches (touches, callback) {
    const pos = new Vec2(0, 0);
    for (const touch of touches) {
      if (this.shape.intersects(touch)) {
        if (this.shape.radius) {
          const size = this.shape.radius;
          pos.x = (touch.pos.x - this.shape.pos.x) / size;
          pos.y = (touch.pos.y - this.shape.pos.y) / size;
        } else if (this.shape.size) {
          pos.x = (touch.pos.x - this.shape.pos.x) / this.shape.size.x / 0.5;
          pos.y = (touch.pos.y - this.shape.pos.y) / this.shape.size.y / -0.5;
        }
        break;
      }
    }

    if (!this.last.equals(pos)) {
      this.last.copy(pos);
      callback(pos);
    }
  }
}
