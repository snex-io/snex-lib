# SNEX

Library for using [SNEX.io](http://snex.io) gamepads built on [Peer.js](http://peerjs.com/).


## Usage

### Using Node environment

1) Install
```bash
yarn add snex
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

### In Browser

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
