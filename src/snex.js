import EventEmitter from 'eventemitter3';
import Peer from 'peerjs';
import util from 'peerjs/lib/util';

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

export function createPeer(server = SIGNALING_SERVER, path = '/') {
  const [host, port] = server.split(':');
  return new Peer({host, port, path});
}

export function createSession(peer = createPeer()) {
  return new Promise((resolve, reject) => {
    peer.on('open', id => {
      resolve(new Session(peer));
    });

    peer.on('error', reject);
  });
}

export function joinSession(id, peer = createPeer()) {
  return new Promise((resolve, reject) => {
    peer.on('error', reject);

    const conn = peer.connect(id)
    conn.on('open', () => {
      resolve(conn);
    });
  });
}

export function isSupported() {
  return util.supports.data;
}

export {
  Peer,
  API_URL,
  SIGNALING_SERVER,
}
