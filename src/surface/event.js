export function createEventEmitter() {
  const listeners = new Set();

  function listen(callback) {
    listeners.add(callback);
  }

  function emit(data) {
    listeners.forEach(callback => callback(data));
  }

  return {
    listen,
    emit,
  };
}
