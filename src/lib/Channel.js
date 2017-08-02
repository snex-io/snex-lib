function handleError(error) {
    console.error(error);
}

export default class Channel
{
  constructor(peerConnectionConfig, signalingServer) {
    this.conn = new RTCPeerConnection(peerConnectionConfig);
    this.signalingServer = signalingServer;

    this.conn.onicecandidate = (event) => {
        console.log('onicecandidate', event);
        this.signalingServer.send({
          type: 'ice-candidate',
          candidate: event.candidate,
        });
    };

    this.conn.ondatachannel = (...args) => {
        console.log('ondatachannel', args);
    };

    this.sendChannel = this.conn.createDataChannel('data-channel');

    signalingServer.on('message', data => {
      const {type} = data;
      console.log('Received from signalingServer', data);
    });
  }

  create() {
    this.conn.createOffer()
    .then(desc => {

      this.signalingServer.send({
        type: 'create',
        desc,
      });
      return this.setLocalDescription(desc);
    })
    .catch(handleError);
  }

  send(data) {
    this.sendChannel.send(data);
  }

  setLocalDescription(desc) {
    return Promise.all([
        this.conn.setLocalDescription(desc),
    ]);
  }
}
