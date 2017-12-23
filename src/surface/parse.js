import {Button} from './area.js';
import {Circle} from './shape.js';

export function createAreas(touchables) {
  return touchables.map(parseTag);
}

export function parseAreas(surface) {
  const idSource = surface.querySelectorAll('[id^=snex-]');
  const attributeSource = surface.querySelectorAll('[snex-name]');

  return createAreas([...idSource, ...attributeSource]);
}

function parseTag(tag) {
  switch(tag.tagName) {
    case 'circle':
      return parseCircle(tag);
  }

  console.error('Unrecognized tag', tag);
  throw new TypeError('Can not parse tag');
}

function getAttr(tag) {
  const name = tag.getAttribute('snex-name');
  const type = tag.getAttribute('snex-type');

  if (!name) {
    const [, type, name] = tag.id.split('-');
    return {type, name};
  }

  return {
    name,
    type: type || "button",
  };
}

function parseCircle(tag) {
  const {type, name} = getAttr(tag);
  const rect = tag.getBoundingClientRect();

  const shape = new Circle(
    rect.left + rect.width / 2,
    rect.top + rect.height / 2,
    rect.width * 0.5);

  const area = new Button(shape, name);

  return area;
}
