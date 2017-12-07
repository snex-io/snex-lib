const expect = require('expect.js');
const sinon = require('sinon');
const {JSDOM} = require('jsdom');

global.window = new JSDOM().window;

const package = require('../package.json');
const snex = require('../' + package.main);

describe('SNEX Lib', () => {
    it('is a module', () => {
        expect(snex.createSession).to.be.ok();
    });
});
