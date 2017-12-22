import {Vec2} from './math.js';

export function createAreas(touchables) {
  const areas = [];

  return [...touchables].map(touchable => {
    const [, type, name] = touchable.id.split('-');
    const rect = touchable.getBoundingClientRect();

    const area = new Circle(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2,
      rect.width * 0.5,
      name);

    return area;
  });
}

export class Circle {
  constructor(x, y, r, id = null) {
    this.id = id;
    this.pos = new Vec2(x, y);
    this.radius = r;
  }
}
