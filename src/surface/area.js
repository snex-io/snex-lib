import {Circle} from './shape.js';

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

  const shape = new Circle(
    rect.left + rect.width / 2,
    rect.top + rect.height / 2,
    rect.width * 0.5);

  const area = new Button(shape, name);

  return area;
}

class Button {
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
