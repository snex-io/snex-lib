import Peer from 'peerjs';

import Controllers from './controllers.js';

import {
  buildURL,
  createPeer,
  createSession,
  joinSession,
  isSupported,
} from './peering';

import {
  createSensor,
} from './surface/sensor';

export const API_URL = 'https://snex.io';
export const SIGNALING_SERVER = 'peer-secure.snex.io:443';

export {
  buildURL,
  createPeer,
  createSession,
  joinSession,
  isSupported,
  Controllers,
  Peer,

  createSensor,
};
