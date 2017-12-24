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

      callback(state ? 1 : 0);
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

export class Map extends Area {
  onTouches (touches, callback) {
    for (const touch of touches) {
      if (this.shape.intersects(touch)) {
        const pos = new Vec2(0, 0);
        pos.x = touch.pos.x - this.shape.pos.x;
        pos.y = touch.pos.y - this.shape.pos.y;
        if (this.shape.radius) {
          const size = this.shape.radius * 2;
          pos.x = (pos.x + size / 2) / size;
          pos.y = (pos.y + size / 2) / size;
        } else if (this.shape.size) {
          const w = this.shape.size.x;
          const h = this.shape.size.y;
          pos.x = (pos.x + w / 2) / w;
          pos.y = (pos.y + h / 2) / h;
        }
        callback(pos);
      }
    }
  }
}
