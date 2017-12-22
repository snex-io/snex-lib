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
