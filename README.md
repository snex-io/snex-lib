# SNEX

Library for using SNEX.io gamepads. Requires [Peer.js](http://peerjs.com/) and a Peer.js API key.

## Usage

### createSession(`peerJSApiKey`, `peerJSChannelId`, [`gamepadType`])

Returns a Promise that resolves to a session object containing session Id, gamepad URL and expire date for URL.
```json
{
  "id": "XSBJ",
  "url": "http://snex.io/XSBJ",
  "expiresAt": "2017-01-08T04:54:38.476Z"
}
```

Example
```js
const Peer = require('Peer');
const snex = require('snex');

const PEER_API_KEY = 'lwjd5qra8257b9';

const peer = new Peer({key: PEER_API_KEY});

peer.on('open', function(id) {
  snex.createSession(PEER_API_KEY, id, 'nes')
    .then(session => {
      console.log(session);
    });
});
```
