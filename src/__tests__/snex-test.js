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
    });

    describe('#joinSession', () => {
        let peerMock, connMock;

        beforeEach(() => {
            connMock = new EventEmitter();

            peerMock = new PeerMock();
            peerMock.connect = sinon.spy(() => connMock);
            promise = snex.joinSession('my-id', peerMock);
        });

        it('returns a promise', () => {
            expect(promise).to.be.a(Promise);
        })

        it('calls Peer.connect with serialization set to json', () => {
            expect(peerMock.connect.callCount).to.be(1);
            expect(peerMock.connect.lastCall.args[0]).to.eql('my-id');
            expect(peerMock.connect.lastCall.args[1]).to.eql({
                serialization: 'json',
            });
        });

        it('resolves a connection', () => {
            connMock.emit('open');
            return promise.then(conn => {
                expect(conn).to.be(connMock);
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
            expect(spy.callCount).to.be(1);
            expect(spy.lastCall.args).to.eql(['apa']);
        });

        it(`emits "disconnected" event when Peer disconnects`, () => {
            const spy = sinon.spy();
            session.on('disconnected', spy);
            peerMock.emit('disconnected');
            expect(spy.callCount).to.be(1);
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
