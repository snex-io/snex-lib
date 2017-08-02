const snex = require('../snex');

describe('SNEX Client API', () => {
  describe('#createSession', () => {
    it('returns a Promise', () => {
      expect(snex.createSession()).to.be.a(Promise);
    });
  });
});
