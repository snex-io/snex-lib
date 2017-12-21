const expect = require('expect.js');
const sinon = require('sinon');
const {JSDOM} = require('jsdom');

global.window = new JSDOM().window;

const package = require('../../package.json');
const snex = require('../../' + package.main);

describe('SNEX Lib', () => {
    it('is a module', () => {
        expect(snex).to.be.ok();
    });

    describe('module', () => {
        it('exports API_URL', () => {
            expect(snex.API_URL).to.be('https://snex.io');
        });

        it('exports SIGNALING_SERVER', () => {
            expect(snex.SIGNALING_SERVER).to.be('peer-secure.snex.io:443');
        });

        it('exports Controllers', () => {
            expect(snex.Controllers).to.be.an(Object);
        });

        it('exports createPeer', () => {
            expect(snex.createPeer).to.be.a(Function);
        });

        it('exports createSession()', () => {
            expect(snex.createSession).to.be.a(Function);
        });

        it('exports joinSession()', () => {
            expect(snex.joinSession).to.be.a(Function);
        });

        it('exports isSupported()', () => {
            expect(snex.isSupported).to.be.a(Function);
        });

        it('exports Peer', () => {
            expect(snex.Peer).to.be.a(Function);
            expect(new snex.Peer()).to.be.an(Object);
        });
    });
});
