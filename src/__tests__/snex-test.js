const EventEmitter = require('eventemitter3');

const expect = require('expect.js');
const sinon = require('sinon');
const {JSDOM} = require("jsdom");

global.window = new JSDOM().window;

const snex = require('../snex');
const Peer = require('peerjs');

describe('SNEX Lib', () => {
    class PeerMock extends EventEmitter {
        constructor() {
            super();

            setTimeout(() => {
                this.emit('open');
            }, 0);
        }
    }

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

    describe('#createSession', () => {
        let session, peerMock;

        beforeEach(() => {
            peerMock = new PeerMock();
            return snex.createSession(peerMock).then(s => session = s);
        });

        it('resolves a session', () => {
            expect(session).to.be.ok();
        });

        describe('#createURL', () => {
            it('returns rejected promise when id not set', () => {
                peerMock.id = undefined;
                return session.createURL().catch(error => {
                    expect(error).to.be.an(Error);
                    expect(error.message).to.equal('Session expired');
                });
            });
        });
    });
});
