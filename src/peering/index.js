import Peer from 'peerjs';
import util from 'peerjs/lib/util';
import {Session} from './session.js';

export const API_URL = 'https://snex.io';
export const SIGNALING_SERVER = 'peer-secure.snex.io:443';

export function buildURL(type, id) {
  return `${API_URL}/${type}?id=${encodeURIComponent(id)}`;
}

export function createPeer(id) {
  const [host, port] = SIGNALING_SERVER.split(':');
  const path = '/';
  return new Peer(id, {host, port, path, secure: true});
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

    const conn = peer.connect(id, {
      serialization: 'json',
    });

    conn.on('open', () => {
      resolve(conn);
    });
  });
}

export function isSupported() {
  return util.supports.data;
}
