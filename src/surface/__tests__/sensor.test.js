const EventEmitter = require('eventemitter3');

const sinon = require('sinon');
const {JSDOM} = require("jsdom");

const {createSensor} = require('../sensor.js');

describe('Surface', () => {
    let svg;

    beforeEach(() => {
        const dom = new JSDOM(`
            <?xml version="1.0" encoding="UTF-8" standalone="no"?>
            <svg width="1600px" height="900px" viewBox="0 0 1600 900" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="touch-action: none;">
                <rect snex-name="draw" snex-type="map" fill="#fff" x="0" y="0" width="100%" height="100%"></rect>
            </svg>`, {
                contentType: "text/xml",
            });

        svg = {
            contentDocument: dom.window.document,
        };
    });

    describe('listeners', () => {
        beforeEach(() => {
            svg.contentDocument.addEventListener = sinon.spy();
            svg.contentDocument.removeEventListener = sinon.spy();
        });

        it('are set up and torn down', () => {
            const sensor = createSensor(svg);
            const ael = svg.contentDocument.addEventListener;
            const rel = svg.contentDocument.removeEventListener;
            expect(ael.callCount).toBe(6);

            const listeners = new Map();

            const events = [
                'touchstart', 'touchend', 'touchmove',
                'mousedown', 'mouseup', 'mousemove',
            ];

            events.forEach((event, index) => {
                const call = ael.getCall(index);
                expect(call.args[0]).toEqual(event);
                listeners.set(event, call.args[1]);
            });

            sensor.destroy();

            expect(rel.callCount).toBe(6);
            events.forEach((event, index) => {
                const call = ael.getCall(index);
                expect(call.args[0]).toEqual(event);
                expect(listeners.get(event)).toBe(call.args[1]);
            });
        });
    });
});
