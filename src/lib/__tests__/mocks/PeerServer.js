import EventEmitter from 'events';

let counter = 0;

class Client extends EventEmitter
{
  constructor(server) {
    super();
    this.server = server;
    this.id = ++counter;
  }

  send(data) {
    this.emit('message', JSON.stringify(data));
  }
}

export default class PeerServerMock extends EventEmitter
{
  constructor() {
    super();
    this.clients = new Set();
  }

  createClient() {
    const client = new Client(this);
    this.clients.add(client);

    client.on('message', message => {
      const data = JSON.parse(message);
      console.log('Received from %s', client.id, data);
    });

    return client;
  }
}
