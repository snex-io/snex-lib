import {Circle as Touch} from './area.js';
import {circlesIntersect} from './geometry.js';

const TOUCH_RADIUS = 12;

export function createEventHandler(areas, callback) {
  const detect = createDetector(areas);
  const route = createEventRouter();

  return function handleEvent(event) {
    route(event, touches => detect(touches, callback));
  }
}

function createEventRouter() {
  const onTouch = createTouchListener();
  const onMouse = createMouseListener();

  return function routeEvent(event, callback) {
    if (event.touches) {
      callback(onTouch(event));
    } else {
      callback(onMouse(event));
    }
  };
}

function createTouchListener() {
  return function convertTouchEventToTouches(event) {
    return [...event.touches].map(touch => {
      return new Touch(touch.pageX, touch.pageY, TOUCH_RADIUS);
    });
  }
}

function createDetector(areas) {
  const states = Object.create(null);

  for (const area of areas) {
    states[area.id] = false;
  }

  return function handleTouches(touches, callback) {
    areas.forEach(area => {
      let state = false;

      for (const touch of touches) {
        const intersects = circlesIntersect(
          area.radius, touch.radius,
          area.pos.x, area.pos.y,
          touch.pos.x, touch.pos.y);

        if (intersects) {
          state = true;
          break;
        }
      }

      if (states[area.id] !== state) {
        states[area.id] = state;
        callback(area.id, state);
      }
    });
  }
}

function createMouseListener(areas, callback) {
  let mouseState = false;

  return function convertMouseEventToTouches(event) {
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

    return touches;
  }
}
