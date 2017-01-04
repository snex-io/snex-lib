const Peer = require('peerjs');

function createURL(key, id, type = 'nes') {
  return 'http://snex.pomle.com'
    + '/' + type + '/'
    + '?key=' + key
    + '&id=' + id;
}

function open(key) {
  return new Promise(res => {
    const peer = new Peer({ key });
    peer.on('open', id => res({peer, id}));
  });
}

function connect(key, type = 'nes') {
  return open(key)
    .then(channel => Promise.all([
      channel,
      fetch(createURL(key, channel.id, type)).then(res => res.json()),
    ])
    .then(([channel, data]) => {
       return {
        channel,
        url: data.url,
      };
    });
}

module.exports = {
  connect,
  createURL,
  open,
};
