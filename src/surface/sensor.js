import {createAreas} from './area.js';
import {createEventEmitter} from './event.js';
import {createEventHandler} from './handler.js';
import {vibe} from './vibrate.js';


export function createSensor(svg) {
  let preferTouch = false;

  const surface = svg.contentDocument;

  let areas, handleEvent;
  const states = Object.create(null);

  const {listen, emit} = createEventEmitter();

  function mapKeys() {
    const touchables = surface.querySelectorAll('[id^=snex-]');
    areas = createAreas(touchables);

    for (const area of areas) {
      states[area.id] = false;
    }

    handleEvent = createEventHandler(areas, handleKey);
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
    if (preferTouch) {
      return;
    }

    handleEvent(event);
  }

  function onTouch(event) {
    preferTouch = true;
    handleEvent(event);
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
