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
        expect(snex.API_URL).to.be('https://snex.io');
    });

    it('exposes controller index', () => {
        expect(snex.Controllers).to.be.an(Object);
    });

    describe('Controller Index', () => {
        it('has NES', () => {
            expect(snex.Controllers.nes.title).to.be('Nintendo 8-bit');
        });

        it('has SNES', () => {
            expect(snex.Controllers.snes.title).to.be('Super Famicom');
        });

        it('has US SNES', () => {
            expect(snex.Controllers['snes-us'].title).to.be('Super Nintendo');
        });

        it('has Genesis', () => {
            expect(snex.Controllers['genesis'].title).to.be('Sega Genesis');
        });
    });

    it('has expected SIGNALING_HOST', () => {
        expect(snex.SIGNALING_SERVER).to.be('peer-secure.snex.io:443');
    });

    describe('#buildURL', () => {
        it('returns a URL given a controller type and id', () => {
            expect(snex.buildURL('nes', '1r91j2/1125')).to.be('https://snex.io/nes?id=1r91j2%2F1125');
        });
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
