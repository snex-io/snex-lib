import PeerServer from './lib/PeerServer';
import Channel from './lib/Channel';
import Session from './lib/Session';

const peerConnectionConfig = {
    'iceServers': [
        {'urls': 'stun:stun.services.mozilla.com'},
        {'urls': 'stun:stun.l.google.com:19302'},
    ]
};

function createChannel() {
    const socket = new WebSocket('ws://localhost:8080');
    const server = new PeerServer(socket);
    const channel = new Channel(peerConnectionConfig, server);
    return channel;
}

function setupSession() {

    return session;
}

export function createSession() {
    const channel = createChannel();
    channel.create();
    const session = new Session(channel);
    return session;
}
