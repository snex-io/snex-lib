const EventEmitter = require('eventemitter3');
const Peer = require('peerjs');
const util = require('peerjs/lib/util');

const API_URL = 'https://snex.io';
const SIGNALING_SERVER = 'peer-secure.snex.io:443';

const Controllers = require('./controllers');

class Session extends EventEmitter
{
  constructor(peer) {
    super();

    this.id = peer.id;
    this.peer = peer;

    peer.on('connection', conn => {
      this.emit('connection', conn);
    });

    peer.on('disconnected', () => {
      this.emit('disconnected');
    });
  }

  createURL(pad = 'nes', apiURL = API_URL) {
    if (!this.peer.id) {
      return Promise.reject(new Error('Session expired'));
    }

    const request = new Request(apiURL + '/api/v1/session', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        id: this.id,
        type: pad,
        key: 'deprecated',
      }),
    });

    return fetch(request).then(r => r.json());
  }
}

function buildURL(type, id) {
  return `${API_URL}/${type}?id=${encodeURIComponent(id)}`;
}

function createPeer(server = SIGNALING_SERVER, path = '/') {
  const [host, port] = server.split(':');
  return new Peer({host, port, path, secure: true});
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
  buildURL,
  createPeer,
  createSession,
  joinSession,
  isSupported,
  Controllers,
  Peer,
  API_URL,
  SIGNALING_SERVER,
};
