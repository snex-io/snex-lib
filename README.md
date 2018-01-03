# SNEX Virtual Gamepad API SDK

Library for using [SNEX.io](https://snex.io) virtual gamepads providing SVG surface interaction, peering, and message sending.

## What is it?

SNEX provides on-screen virtual gamepads that can connect to any web application using WebRTC. Just create a session, share the session token, and start receiving signals right away.


## Usage

### Node environment

1) Install
```bash
npm install snex
```

2) Implement
```js
const snex = require('snex');

snex.createSession()
.then(session => {

    session.on('connection', conn => {
        console.log('Player joined!');

        conn.on('data', data => {
            if (data.state && data.key === 'A') {
                console.log('User pressed "A"');
            }
        });
    });

    return session.createURL('nes');
})
.then(desc => {
    console.log('Go to url to play', desc.url);
});
```

### Browser

1) Add the following snippet to your site.
```html
<script src="https://cdn.snex.io/snex.latest.min.js"></script>
```

2) Implement.

```js
window.snex.createSession()
.then(session => {

    session.on('connection', conn => {
        console.log('Player joined!');

        conn.on('data', data => {
            if (data.state && data.key === 'A') {
                console.log('Player pressed "A"');
            }
        });
    });

    return session.createURL('nes');
})
.then(desc => {
    console.log('Go to url to play', desc.url);
});
```
