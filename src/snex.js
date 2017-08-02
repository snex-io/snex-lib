const EventEmitter = require('eventemitter3');
const Peer = require('peerjs');
const util = require('peerjs/lib/util');

const API_URL = 'http://snex.io';
const SIGNALING_SERVER = 'snex.io:9000';

class Session extends EventEmitter
{
  constructor(peer) {
    super();

    this.id = peer.id;
    this.peer = peer;

    peer.on('connection', conn => {
      this.emit('connection', conn);
    });
  }

  createURL(pad = 'nes', apiURL = API_URL) {
    const request = new Request(apiURL + '/api/v1/session', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        id: this.peer.id,
        type: pad,
        key: 'deprecated',
      }),
    });

    return fetch(request).then(r => r.json());
  }
}

function createPeer(server = SIGNALING_SERVER, path = '/') {
  const [host, port] = server.split(':');
  return new Peer({host, port, path});
}

function createSession(peer = createPeer()) {
  return new Promise((resolve, reject) => {
    peer.on('open', id => {
      resolve(new Session(peer));
    });

    peer.on('error', reject);
  });
}

function joinSession(id, peer = createPeer()) {
  return new Promise((resolve, reject) => {
    peer.on('error', reject);

    const conn = peer.connect(id)
    conn.on('open', () => {
      resolve(conn);
    });
  });
}

function isSupported() {
  return util.supports.data;
}

module.exports = {
  createPeer,
  createSession,
  joinSession,
  isSupported,
  Peer,
  API_URL,
  SIGNALING_SERVER,
};
