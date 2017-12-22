import {Circle} from './area.js';
import {createEventEmitter} from './event.js';
import {createTouchHandler, createMouseHandler} from './handler.js';
import {vibe} from './vibrate.js';


function createAreas(touchables) {
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

export function createSensor(svg) {
  let useTouch = null;

  const surface = svg.contentDocument;

  let areas, keys, handleMouse, handleTouch;
  const states = Object.create(null);

  const {listen, emit} = createEventEmitter();

  function mapKeys() {
    const touchables = surface.querySelectorAll('[id^=snex-]');
    areas = createAreas(touchables);

    handleMouse = createMouseHandler(areas, handleKey);
    handleTouch = createTouchHandler(areas, handleKey);

    keys = areas.map(area => area.id);
  }

  function handleKey(key, state) {
    if (states[key] === state) {
      return;
    }

    if (state) {
      vibe(20);
    }

    states[key] = state;

    const payload = {
      key,
      state: state ? 1 : 0,
    };

    emit(payload);
  }

  function onMouse(event) {
    if (!useTouch) {
      handleMouse(event);
    }
  }

  function onTouch(event) {
    useTouch = true;
    handleTouch(event);
  }

  const options = {passive: false};
  surface.addEventListener('touchstart', onTouch, options);
  surface.addEventListener('touchend', onTouch, options);
  surface.addEventListener('touchmove', onTouch, options);

  surface.addEventListener('mousedown', onMouse);
  surface.addEventListener('mouseup', onMouse);
  surface.addEventListener('mousemove', onMouse);

  mapKeys();

  window.addEventListener('resize', mapKeys)

  return {
    listen,
  };
}
