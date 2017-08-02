import EventEmitter from 'events';

export default class PeerServer extends EventEmitter
{
  constructor(socket) {
    super();

    this.messageBuffer = [];

    this.socket = socket;
    this.socket.addEventListener('message', event => {
        console.log('Message form Server', event);
        this.receive(event.data);
    });
    this.socket.addEventListener('open', event => {
      while (this.messageBuffer.length > 0) {
        this.send(this.messageBuffer.shift());
      }
    });
  }

  receive(message) {
    this.emit('message', JSON.parse(message));
  }

  send(message) {
    const {readyState} = this.socket;
    if (readyState < 1) {
      this.messageBuffer.push(message);
    } else if (readyState > 1) {
      console.error(new Error('Socket is closed.'));
    } else {
      this.socket.send(JSON.stringify(message));
    }
  }
}
