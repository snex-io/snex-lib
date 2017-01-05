(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
      define(['Peer'], factory);
  } else if (typeof module === 'object' && module.exports) {
      module.exports = factory(require('Peer'));
  } else {
      root.snex = factory(root.b);
  }
}(this, function(Peer) {
  const SNEX_URL = 'http://snex.io';

  function session(key, pad) {
    return open(key).then(({ peer, id }) => {
      const body = new FormData();
      body.append('key', key);
      body.append('id', id);
      body.append('type', pad);

      return fetch(SNEX_URL + '/api/v1/session', {
        body,
        method: 'POST',
      })
      .then(r => r.json())
      .then(({id}) => {
        return {
          session: peer,
          snexId: id,
          snexURL: SNEX_URL + '/' + id,
        }
      });
    });
  }

  function open(key) {
    return new Promise(res => {
      const peer = new Peer({ key });
      peer.on('open', id => res({peer, id}));
    });
  }

  return {
    session,
  };
}));
