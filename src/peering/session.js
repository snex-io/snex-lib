import EventEmitter from 'eventemitter3';
import {API_URL} from '../snex.js';

export class Session extends EventEmitter
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
        id: this.peer.id,
        type: pad,
        key: 'deprecated',
      }),
    });

    return fetch(request).then(r => r.json());
  }
}
