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

```js
const snex = require('snex');

snex.createSession(PEER_JS_API_KEY, peerJSChannelId, gamepadType)
.then(session => {
  console.log(session);
});
```
