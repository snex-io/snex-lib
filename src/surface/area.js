import {Circle} from './shape.js';

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
      this.state = state;
      callback(state);
    }
  }
}
