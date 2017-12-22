import {createSensor} from './sensor.js';

window.addEventListener('load', function() {
  function abort(error) {
    document.body.className = 'error';
    document.getElementById(error).style.display = 'block';
  }

  if (!snex.isSupported()) {
    abort('webrtc-support');
    return;
  }

  const controller = document.getElementById('controller');
  const sensor = createSensor(controller);
  sensor.listen(data => {
    console.log(data);
  });
});


