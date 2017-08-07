const expect = require('expect.js');
const sinon = require('sinon');
const {JSDOM} = require('jsdom');

global.window = new JSDOM().window;

const snex = require('../dist/snex');

describe('SNEX Lib', () => {
    it('is a module', () => {
        expect(snex.createSession).to.be.ok();
    });
});
