const expect = require('expect.js');
const sinon = require('sinon');
const {JSDOM} = require("jsdom");

global.window = new JSDOM().window;

const snex = require('../snex');
const Peer = require('peerjs');

describe('SNEX Lib', () => {
    it('exposes Peer.js', () => {
        expect(snex.Peer).to.be(Peer);
    });

    it('has expected API URL', () => {
        expect(snex.API_URL).to.be('http://snex.io');
    });

    it('has expected SIGNALING_HOST', () => {
        expect(snex.SIGNALING_SERVER).to.be('snex.io:9000');
    });

    describe.skip('#createSession', () => {
        beforeEach(() => {
            sinon.stub(snex, 'createPeer');
        });

        afterEach(() => {
            snex.createPeer.restore();
        });

        it('uses expected default API_URL', () => {
            snex.createSession();
        });
    });
});
