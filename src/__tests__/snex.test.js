const EventEmitter = require('eventemitter3');

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
        expect(snex.Peer).toBe(Peer);
    });

    it('does not expose API URL', () => {
        expect(snex.API_URL).toBe(undefined);
    });

    it('exposes controller index', () => {
        expect(snex.Controllers).toBeInstanceOf(Object);
    });

    it('exposes createSensor', () => {
        expect(snex.createSensor).toBeInstanceOf(Function);
    });

    describe('Controller Index', () => {
        it('has NES', () => {
            expect(snex.Controllers.nes.title).toBe('Nintendo 8-bit');
        });

        it('has SNES', () => {
            expect(snex.Controllers.snes.title).toBe('Super Famicom');
        });

        it('has US SNES', () => {
            expect(snex.Controllers['snes-us'].title).toBe('Super Nintendo');
        });

        it('has Genesis', () => {
            expect(snex.Controllers['genesis'].title).toBe('Sega Genesis');
        });
    });

    it('does not expose SIGNALING_HOST', () => {
        expect(snex.SIGNALING_SERVER).toBe(undefined);
    });

    describe('#buildURL', () => {
        it('returns a URL given a controller type and id', () => {
            expect(snex.buildURL('nes', '1r91j2/1125')).toBe('https://snex.pomle.com/nes?id=1r91j2%2F1125');
        });
    });

    describe('#createPeer', () => {
        it('returns instance of Peer with expected peer exchange url', () => {
            const peer = snex.createPeer();
            expect(peer.options.host).toBe('snex-peer.pomle.com');
            expect(peer.options.port).toBe('443');
            expect(peer.options.secure).toBe(true);
            expect(peer.options.path).toBe('/');
        });
    });

    describe('#createSession', () => {
        let session, peerMock;

        beforeEach(() => {
            peerMock = new PeerMock();
            return snex.createSession(peerMock).then(s => session = s);
        });

        it('resolves a session', () => {
            expect(session).toBeTruthy();
        });
    });

    describe('#joinSession', () => {
        let peerMock, connMock, promise;

        beforeEach(() => {
            connMock = new EventEmitter();

            peerMock = new PeerMock();
            peerMock.connect = sinon.spy(() => connMock);
            promise = snex.joinSession('my-id', peerMock);
        });

        it('returns a promise', () => {
            expect(promise).toBeInstanceOf(Promise);
        })

        it('calls Peer.connect with serialization set to json', () => {
            expect(peerMock.connect.callCount).toBe(1);
            expect(peerMock.connect.lastCall.args[0]).toEqual('my-id');
            expect(peerMock.connect.lastCall.args[1]).toEqual({
                serialization: 'json',
            });
        });

        it('resolves a connection', () => {
            connMock.emit('open');
            return promise.then(conn => {
                expect(conn).toBe(connMock);
            });
        });
    });

    describe('Session', () => {
        let session, peerMock;

        beforeEach(() => {
            peerMock = new PeerMock();
            return snex.createSession(peerMock).then(s => session = s);
        });

        it(`emits "connection" event when Peer emits`, () => {
            const spy = sinon.spy();
            session.on('connection', spy);
            peerMock.emit('connection', 'apa');
            expect(spy.callCount).toBe(1);
            expect(spy.lastCall.args).toEqual(['apa']);
        });

        it(`emits "disconnected" event when Peer disconnects`, () => {
            const spy = sinon.spy();
            session.on('disconnected', spy);
            peerMock.emit('disconnected');
            expect(spy.callCount).toBe(1);
        });

        describe('#createURL', () => {
            it('returns rejected promise when id not set', () => {
                peerMock.id = undefined;
                return session.createURL().catch(error => {
                    expect(error).toBeInstanceOf(Error);
                    expect(error.message).toEqual('Session expired');
                });
            });
        });
    });
});
