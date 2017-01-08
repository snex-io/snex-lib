(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
      define([], factory);
  } else if (typeof module === 'object' && module.exports) {
      module.exports = factory();
  } else {
      root.snex = factory();
  }
}(this, function() {
  const snex = {
    URL: 'http://snex.io',

    createURL: function createURL(key, id, pad = 'nes') {
      const body = new FormData();
      body.append('key', key);
      body.append('id', id);
      body.append('type', pad);

      return fetch(snex.URL + '/api/v1/session', {
        body,
        method: 'POST',
      })
      .then(r => r.json())
      .then(({url}) => url);
    }
  };

  return snex;
}));
