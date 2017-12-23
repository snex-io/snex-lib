import {Vec2} from './math.js';
import {circlesIntersect} from './geometry.js';

export function createAreas(touchables) {
  return [...touchables].map(parseTag);
}

function parseTag(tag) {
  switch(tag.tagName) {
    case 'circle':
      return parseCircle(tag);
  }

  console.error('Unrecognized tag', tag);
  throw new TypeError('Can not parse tag');
}

function parseCircle(tag) {
  const [, type, name] = tag.id.split('-');
  const rect = tag.getBoundingClientRect();

  const area = new Circle(
    rect.left + rect.width / 2,
    rect.top + rect.height / 2,
    rect.width * 0.5,
    name);

  return area;
}

export class Circle {
  constructor(x, y, r, id = null) {
    this.id = id;
    this.pos = new Vec2(x, y);
    this.radius = r;

    this.state = false;
  }

  onTouches (touches, callback) {
    let state = false;

    for (const touch of touches) {
      const intersects = circlesIntersect(
        this.radius, touch.radius,
        this.pos.x, this.pos.y,
        touch.pos.x, touch.pos.y);

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
