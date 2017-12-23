import {Circle as Touch} from './area.js';
import {circlesIntersect} from './geometry.js';

export function createTouchHandler(areas, callback) {
  return function handleTouch(event) {
    event.preventDefault();

    const touches = [...event.touches].map(touch => {
      return new Touch(touch.pageX, touch.pageY, 12);
    });

    handleTouches(areas, touches, callback);
  }
}

function handleTouches(areas, touches, callback) {
  areas.forEach(area => {
    for (const touch of touches) {
      const intersects = circlesIntersect(
        area.radius, touch.radius,
        area.pos.x, area.pos.y,
        touch.pos.x, touch.pos.y);

      if (intersects) {
        callback(area.id, true);
        return;
      }
    }

    callback(area.id, false);
  });
}

export function createMouseHandler(areas, callback) {
  let mouseState = false;

  return function handleMouse(event) {
    event.preventDefault();

    if (event.type === 'mousedown') {
      mouseState = true;
    } else if (event.type === 'mouseup') {
      mouseState = false;
    }

    const touches = [];
    if (mouseState) {
      touches.push(new Touch(event.pageX, event.pageY, 0));
    }

    handleTouches(areas, touches, callback);
  }
}
