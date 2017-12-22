const sinon = require('sinon');
const {JSDOM} = require('jsdom');

global.window = new JSDOM().window;

const pkg = require('../../package.json');
const snex = require('../../' + pkg.main);

describe('SNEX Lib', () => {
    it('is a module', () => {
        expect(snex).toBeTruthy();
    });

    describe('module', () => {
        it('exports API_URL', () => {
            expect(snex.API_URL).toBe('https://snex.io');
        });

        it('exports SIGNALING_SERVER', () => {
            expect(snex.SIGNALING_SERVER).toBe('peer-secure.snex.io:443');
        });

        it('exports Controllers', () => {
            expect(snex.Controllers).toBeInstanceOf(Object);
        });

        it('exports createPeer', () => {
            expect(snex.createPeer).toBeInstanceOf(Function);
        });

        it('exports createSession()', () => {
            expect(snex.createSession).toBeInstanceOf(Function);
        });

        it('exports joinSession()', () => {
            expect(snex.joinSession).toBeInstanceOf(Function);
        });

        it('exports isSupported()', () => {
            expect(snex.isSupported).toBeInstanceOf(Function);
        });

        it('exports Peer', () => {
            expect(snex.Peer).toBeInstanceOf(Function);
            expect(new snex.Peer()).toBeInstanceOf(Object);
        });
    });
});
