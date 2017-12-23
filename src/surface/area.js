import {Vec2} from './math.js';

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
  }
}
