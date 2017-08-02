import EventEmitter from 'events';

export default class Session extends EventEmitter
{
  constructor(channel) {
    super();
    this.channel = channel;
  }
}
