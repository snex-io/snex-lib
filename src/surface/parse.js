import {Axis, Button} from './area.js';
import {Circle} from './shape.js';

const truthy = v => !!v;

export function createAreas(touchables) {
  return touchables.map(parseTag).filter(truthy);
}

export function parseAreas(surface) {
  const idSource = surface.querySelectorAll('[id^=snex-]');
  const attributeSource = surface.querySelectorAll('[snex-name]');

  return createAreas([...idSource, ...attributeSource]);
}

function parseTag(tag) {
  const shape = parseShape(tag);
  if (shape) {
    const {type, name} = getAttr(tag);
    switch(type) {
      case 'button':
        return new Button(shape, name);
      case 'axis':
        return new Axis(shape, name);
    }

    console.error('Unrecognized type', type);
  }
}

function parseShape(tag) {
  switch(tag.tagName) {
    case 'circle':
      return parseCircle(tag);
  }

  console.error('Unrecognized tag', tag);
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
  const rect = tag.getBoundingClientRect();

  const shape = new Circle(
    rect.left + rect.width / 2,
    rect.top + rect.height / 2,
    rect.width * 0.5);

  return shape;
}


function parseRect(tag) {
  const {type, name} = getAttr(tag);
  const rect = tag.getBoundingClientRect();

  const shape = new Circle(
    rect.left + rect.width / 2,
    rect.top + rect.height / 2,
    rect.width * 0.5);

  const area = new Button(shape, name);

  return area;
}
