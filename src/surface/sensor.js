import {parseAreas} from './parse.js';
import {createEventEmitter} from './event.js';
import {createEventHandler} from './handler.js';

export function createSensor(svg) {
  let preferTouch = false;

  const surface = svg.contentDocument;

  let areas, handleEvent;

  const {listen, emit} = createEventEmitter();

  function mapKeys() {
    areas = parseAreas(surface);

    handleEvent = createEventHandler(areas, handleKey);
  }

  function handleKey(key, state) {
    const payload = {
      key,
      state,
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

  function destroy() {
    surface.removeEventListener('touchstart', onTouch);
    surface.removeEventListener('touchend', onTouch);
    surface.removeEventListener('touchmove', onTouch);

    surface.removeEventListener('mousedown', onMouse);
    surface.removeEventListener('mouseup', onMouse);
    surface.removeEventListener('mousemove', onMouse);
  }

  mapKeys();

  window.addEventListener('resize', mapKeys)

  return {
    listen,
    destroy,
  };
}
